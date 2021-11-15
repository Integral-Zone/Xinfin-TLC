// SPDX-License-Identifier: MIT

pragma solidity ^0.4.24;

import "../interface/XDCSmartLockClient.sol";
import "../smartlock/XDCSmartLock.sol";
import "https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.4/ChainlinkClient.sol";


/**
 * 
 * Implementation of XDCSmartLockClient and Chainlink Client
 * Responsible for creation of Alarm Job in Chainlink node
 * 
 **/
contract ChainlinkSmartLock is XDCSmartLockClient, ChainlinkClient {
    
    address private _oracleContractAddr;
    address private _linkTokenAddr;
    bytes32 private _jobId;
    uint private _totalLink;
    uint256 private _linkFee;
    address private _xdcSmartLockAddr;
    string private _nodeType = "Chainlink";
    
    /**
     * Modifier to validate of message sender is Oracle contract 
     **/
    modifier onlyOracle {
        require(msg.sender == _oracleContractAddr);
        _;
    }

     /**
     * Constructor to initiate the required values of XDCSmartLock and ChainlinkClient
     * 
     * params -
     * 
     *  link - LINK Token contract address
     *  oracleContractAddr - Chainlink Oracle contract address
     *  jobId - Id of the Alarm job created in Chainlink node
     *  linkFee - LINK token Fee to be charged
     *  xdcSmartLockAddr - Address of the XDCSmartLock instance
     * 
     **/
    constructor(address link, address oracleContractAddr, bytes32 jobId, uint256 linkFee, address xdcSmartLockAddr) public { 
        /**
         * Set the LINK Token contract address in ChainlinkClient
         **/
        setChainlinkToken(link);
        
        _oracleContractAddr = oracleContractAddr;
        _jobId = jobId;
        _totalLink = 0;
        _linkFee = linkFee;
        _xdcSmartLockAddr = xdcSmartLockAddr;
        _linkTokenAddr = link;
     }
     
     
     /**
      *
      * Get details of Chainlink smartlock client
      * 
      * @returns
      * 
      *  _nodeType - Node type "Chainlink" or "Plugin"
      *  _symbol - Symbol of the token
      *  _decimals - Decimals of the token 
      * 
      **/
     function info() external view returns (string, string, uint8) {
         TokenInterface tokenInterface = TokenInterface(_linkTokenAddr);
         return (_nodeType, tokenInterface.symbol(), tokenInterface.decimals());
     }
    
    
    /**
     * Function to return the node / implementation type
     **/ 
     function getNodeType() public view returns (string) {
         return _nodeType;
     }
    
    
     /**
     * 
     * Create request to initiate the alarm job 
     * 
     * @params
     * 
     * unlockDate - Date on which the XDC should be released to receivers
     * 
     */
    function initiateJob(uint256 unlockDate) public {
        /**
         * Build the Chainlink request by specifying the jobId, current contract addrees and callback function  
         **/
        Chainlink.Request memory request = buildChainlinkRequest(_jobId, address(this), this.onJobComplete.selector);
        
        /**
         * "until" parameter will be read by alarm/sleep task in the Chainlink job 
         **/
        request.addUint("until", unlockDate);
        
        /**
         * Send the request to Chainlink node. Appropriate LINK token will be charged to execute this request  
         **/
        sendChainlinkRequestTo(_oracleContractAddr, request, _linkFee);
    }
    
    /**
     * 
     * Callback function to be invoked once the timer / duration is elapsed.
     * Chainlink node creates a transaction on XDC network to invoke the callback function
     * 
     * Releases funds to recipients
     * 
     * params -
     * 
     * -: _requestId - Request Id of the transaction from Chainlink node 
     * 
     * modifier - 
     * 
     * :- onlyOracle - Restrict any random user from calling the callback function. 
     * 
     */ 
    function onJobComplete(bytes32 _requestId) onlyOracle public recordChainlinkFulfillment(_requestId) {
        XDCSmartLock xdcSmartLock = XDCSmartLock(_xdcSmartLockAddr);
        xdcSmartLock.releaseFunds();
    }
    
    
}