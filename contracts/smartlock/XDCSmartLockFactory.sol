// SPDX-License-Identifier: MIT

pragma solidity ^0.4.24;

import "./XDCSmartLock.sol";
import "../store/XDCSmartLockStore.sol";

/**
 *
 * Creates a new instance of XDCSmartLock and stores the contract details in store
 * 
 **/
contract XDCSmartLockFactory {
    
    
    /**
     * 
     * Create a new instance of XDCSmartLock.
     * Transfers the XDC to the new XDCSmartLock instance
     * 
     * @params
     *   receivers - List of receivers to whom the XDC will be transferrd to
     *   funds -  Amount of XDC to be sent to each recipient. receivers[] and funds[] follows one to one mapping. Eg: receivers[1] maps to funds[1]
     *   durationInSeconds - Duration to lockup the XDC
     *   smartLockStoreAddr - SmartLock store address
     * 
     * @returns
     *   xdcSmartLock - Address of the new XDCSmartLock instance
     * 
     **/ 
    function createSmartLock(address[] receivers, uint256[] funds, uint256 durationInSeconds, address smartLockStoreAddr) payable public returns (address) {
        XDCSmartLock xdcSmartLock = new XDCSmartLock(msg.sender, msg.value, receivers, funds, durationInSeconds, smartLockStoreAddr);
        addContractToStore(smartLockStoreAddr, xdcSmartLock);
        
        address(xdcSmartLock).transfer(msg.value);
        
        return address(xdcSmartLock);
    }
 
    /**
     *
     * Adds the XDCSmartLock contract details to store which includes status, created date and unlock date
     * 
     * @params
     *   smartLockStoreAddr - SmartLock store address
     *   xdcSmartLock - Instance of the new XDCSmartLock 
     * 
     **/
    function addContractToStore(address smartLockStoreAddr, XDCSmartLock xdcSmartLock) private {
        XDCSmartLockStore xdcSmartLockStore = XDCSmartLockStore(smartLockStoreAddr);
        (XDCSmartLock.SmartLockStatus status, uint256 unlockDt, uint256 createdDt) = xdcSmartLock.getFilterParams();
        xdcSmartLockStore.addSmartLocks(msg.sender, address(xdcSmartLock), uint256(status), createdDt, unlockDt);
    }   
}