// SPDX-License-Identifier: MIT

pragma solidity ^0.4.24;

import "../interface/XDCSmartLockClient.sol";
import "../smartlock/XDCSmartLock.sol";
import "https://github.com/GoPlugin/contracts/blob/main/src/v0.4/PluginClient.sol";


/**
 * 
 * Implementation of XDCSmartLockClient and Plugin Client
 * Responsible for creation of Alarm Job in Plugin node
 * 
 **/
contract GoPluginSmartLock is XDCSmartLockClient, PluginClient {
    
    address private _oracleContractAddr;
    address private _pliTokenAddr;
    bytes32 private _jobId;
    uint private _totalPli;
    uint256 private _pliFee;
    address private _xdcSmartLockAddr;
    string private _nodeType = "Plugin";
    
    
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
     *  pli - PLI Token contract address
     *  oracleContractAddr - Chainlink Oracle contract address
     *  jobId - Id of the Alarm job created in Plugin node
     *  pliFee - PLI token Fee to be charged
     *  xdcSmartLockAddr - Address of the XDCSmartLock instance
     * 
     **/
    constructor(address pli, address oracleContractAddr, bytes32 jobId, uint256 pliFee, address xdcSmartLockAddr) public { 
        /**
         * Set the PLI Token contract address in Plugin Client
         **/
        setPluginToken(pli);
            
        _oracleContractAddr = oracleContractAddr;
        _jobId = jobId;
        _totalPli = 0;
        _pliFee = pliFee;
        _xdcSmartLockAddr = xdcSmartLockAddr;
        
        _pliTokenAddr = pli;
    }
    
    
    /**
     * Function to return the node / implementation type
     **/ 
    function getNodeType() public view returns (string) {
         return _nodeType;
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
         TokenInterface tokenInterface = TokenInterface(_pliTokenAddr);
         return (_nodeType, tokenInterface.symbol(), tokenInterface.decimals());
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
         * Build the Plugin request by specifying the jobId, current contract addrees and callback function  
         **/
        Plugin.Request memory request = buildPluginRequest(_jobId, address(this), this.onJobComplete.selector);
        
        /**
         * "until" parameter will be read by alarm/sleep task in the Chainlink job 
         **/
        request.addUint("until", unlockDate);
        
        /**
         * Send the request to Plugin node. Appropriate PLI token will be charged to execute this request  
         **/
        sendPluginRequestTo(_oracleContractAddr, request, _pliFee);
    }
    
    /**
     * 
     * Callback function to be invoked once the timer / duration is elapsed.
     * Plugin node creates a transaction on XDC network to invoke the callback function
     * 
     * params -
     * 
     * -: _requestId - Request Id of the transaction from Plugin node 
     * 
     * modifier - 
     * 
     * :- onlyOracle - Restrict any random user from calling the callback function. 
     * 
     */ 
    function onJobComplete(bytes32 _requestId) onlyOracle public recordPluginFulfillment(_requestId) {
        XDCSmartLock xdcSmartLock = XDCSmartLock(_xdcSmartLockAddr);
        xdcSmartLock.releaseFunds();
    }
    
}