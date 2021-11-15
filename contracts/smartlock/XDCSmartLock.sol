// SPDX-License-Identifier: MIT

pragma solidity ^0.4.24;

import "../interface/TokenInterface.sol";
import "../interface/XDCSmartLockClient.sol";
import "./XDCSmartLockNodeSelector.sol";
import "../store/XDCSmartLockStore.sol";

/**
 * 
 * Base / Abstract contract to handle all the XDCSmartLock core logic. 
 * Create XDC Smart Lock where the time is sourced from a either a Chainlink or Go Plugin oracle. 
 * Funder would specify an amount of XDC to be locked up, a date and time at which the locked XDC will be released,
 * and an address for the released XDC to be sent to.
 * 
 **/
contract XDCSmartLock is XDCSmartLockNodeSelector {
    
    /**
     * Enum values to denote the status of the contract 
     **/
    enum SmartLockStatus{ CREATED, INITIATED, RELEASED, WITHDRAWN }
    
    /**
     * Modifer to check if sender of the message is owner  
     **/
    modifier onlyOwner {
        require(msg.sender == _sender);
        _;
    }
    
    /**
     * Private variables - cannot be accessed from external calls 
    **/
    address[] private _receivers;
    uint256[] private _funds;
    address private _sender;
    uint256 private _createdDate;
    address private _smartLockStoreAddr;
    uint256 private _totalXDC;
    uint256 private _durationInSeconds;
    uint256 private _unlockDate;
    address private _nodeClientAddr;
    SmartLockStatus private _smartLockStatus;
    uint256 private _version = 100;
    
     /**
      * Constructor to set the initial values of the contract. Constructor will be invoked by XDCSmartLockFactory
      * 
      *  @params 
      * 
      *  sender - Address of the user who is creating the contract and locking up XDC to be transferred to recipients
      *  totalXDC - Total XDC allocated across all rceivers
      *  receivers - List of receivers to whom the XDC will be transferrd to
      *  funds - Amount of XDC to be sent to each recipient. receivers[] and funds[] follows one to one mapping. Eg: receivers[1] maps to funds[1]
      *  durationInSeconds - Duration to lockup the XDC
      *  smartLockStoreAddr - SmartLock store address
      * 
      **/
    constructor(address sender, uint256 totalXDC, address[] receivers, uint256[] funds, uint256 durationInSeconds, address smartLockStoreAddr) public {
        
        /**
         * Set all the values in XDC Smart Lock
         **/
        _sender = sender;
        _createdDate = now;
        _funds = funds;
        _receivers = receivers;
        _totalXDC = totalXDC;
        _durationInSeconds = durationInSeconds;
        _smartLockStatus = SmartLockStatus.CREATED;
        _smartLockStoreAddr = smartLockStoreAddr;
        
        /**
         * Add received seconds to current timestamp
         **/
        _unlockDate = block.timestamp + _durationInSeconds;

    }
    
    
    /**
     * Function to be implemented by node clients to perform appropriate logic when the tokens are transferred 
     * 
     * @params 
     *   sender - User address from which tokens are transferred 
     *   value - Token value
     *   data - node type "Chainlink" or "Plugin"
     * 
     **/
    function onTokenTransfer(address sender, uint value, bytes data) public {
        
        require (_sender == sender && value > 0);
        
        address xdcSmartLockAddr = address(this);
        (address nodeClientAddr, address tokenAddress) = createInstance(data, _smartLockStoreAddr, xdcSmartLockAddr);
        
        _nodeClientAddr = nodeClientAddr;
        
        XDCSmartLockClient xdcSmartLockClient = XDCSmartLockClient(nodeClientAddr);
        
        TokenInterface tokenInterface = TokenInterface(tokenAddress);
        tokenInterface.transfer(nodeClientAddr, tokenInterface.balanceOf(xdcSmartLockAddr));
        
        xdcSmartLockClient.initiateJob(_unlockDate);
        updateStatus(SmartLockStatus.INITIATED);
    }
    
    
    /**
     *
     *  Update the status of the XDCSmartLock contract status.
     *  Update the status in XDCSmartLockStore
     * 
     *  @params
     * 
     *  smartLockStatus - Status of the contract
     * 
     **/
    function updateStatus(SmartLockStatus smartLockStatus) private {
        _smartLockStatus = smartLockStatus;
        XDCSmartLockStore xdcSmartLockStore = XDCSmartLockStore(_smartLockStoreAddr);
        xdcSmartLockStore.updateSmartLockSummary(address(this), uint256(_smartLockStatus));
    }
    
    /**
     * Get the current version of contract.
     * 
     **/
    function getVersion() public view returns (uint256) {
        return _version;
    }
    
    /**
     * Deposit all the XDC received as part of the message to current contrat's wallet  
     **/
    function() payable public { 
        /**
         * Log XDC received from sender 
         **/
    }
    
    /**
    * Function to withdraw XDC back to sender. 
    * This option will be available only when the LINK token is not transferred and Chainlink job is not initiated
    *
    * modifier - 
    * 
    * :- onlyOwner - Restrict any random user from calling the withdraw function. This is to make sure that only the sender of the  
    *
    **/
    function withdraw() onlyOwner public {
        require(_smartLockStatus == SmartLockStatus.CREATED, "Cannot withdraw from SmartLock as job is initiated");
        _sender.transfer(address(this).balance);
        updateStatus(SmartLockStatus.WITHDRAWN);
    }
    
    /**
     *
     * Retrieve info about the contract
     * 
     *  @returns 
     * 
     *  _sender - Address of the contract creator
     *  _receivers - List of receivers
     *  _funds - Funds alloted to each receiver
     *  _unlockDate - Unlock date i.e. when the funds will be transferred to receipients
     *  _createdDate - Contract creation date
     *  _totalXDC - Total XDC allocated in XDC Smart lock
     *  _smartLockStatus - Status of the smart lock
     *
     **/
    function info() public view returns(address, address[], uint256[], uint256, uint256, uint256, SmartLockStatus) {
        return (_sender, _receivers, _funds, _unlockDate, _createdDate, _totalXDC, _smartLockStatus);
    }
    
    /**
     *
     * Get the filter parameters of the contract 
     * 
     * @returns
     * 
     * SmartLockStatus - Status of the smart lock
     * _unlockDate - XDC smart lock unlock date
     * _createdDate - XDC smart lock creation date 
     * 
     **/
    function getFilterParams() public view returns (SmartLockStatus, uint256, uint256) {
        return (_smartLockStatus, _unlockDate, _createdDate);
    }
    
    
    /**
     *
     * Get the node type client info
     * 
     * @returns
     * 
     *  _nodeType - Node type "Chainlink" or "Plugin"
     *  _symbol - Symbol of the token
     *  _decimals - Decimals of the token 
     * 
     **/
    function clientInfo() public view returns (string, string, uint8) {
        XDCSmartLockClient xdcSmartLockClient = XDCSmartLockClient(_nodeClientAddr);
        return xdcSmartLockClient.info();
    }
     
    /**
     * 
     * Function to be invoked once the timer / duration is elapsed.
     * Transfer's the allocated XDC to receivers
     * 
     */ 
    function releaseFunds() public {
        
        /**
         * Validate if the specified duration elapsed before the logic is executed. This is a check to prevent 
         * XDC being released before the unlock date.
         * 
         **/
        require(now >= _unlockDate);
        
        /**
         * 
         * Transfer the allocated XDC to receivers. _receivers[] has a one-on-one mapping to _funds[]
         * Eg: 
         * receivers = [receiver-1, receiver-2] 
         * funds = [100, 200]
         * 
         * The logic is to transfer 100 XDC to receiver-1 and 200 XDC to receiver-2
         *
         **/
        for(uint i =0; i < _receivers.length; i++) {
            address(_receivers[i]).transfer(_funds[i]);   
        }
        
        updateStatus(SmartLockStatus.RELEASED);
    }
}