// SPDX-License-Identifier: MIT

pragma solidity ^0.4.24;

import "./GoPluginSmartLock.sol";
import "../interface/XDCSmartLockClientFactory.sol";

/**
 * 
 * Implementation of XDCSmartLockClientFactory.
 * Factory contract to create new instance of Plugin XDCSmartLock client
 * 
 **/
contract GoPluginSmartLockFactory is XDCSmartLockClientFactory {
    
     /**
     * Creates an instance of Plugin Smart Lock client and stores the contract address in the store
     * 
     * @params 
     * 
     *  tokenAddress - Address of Plugin token
     *  oracleContractAddr - Address of the Oracle contract
     *  jobId - Duration to lockup the XDC
     *  tokenFee - LINK fee to be paid to the node operator
     *  smartLockAddress - Address of the XDCSmartLock instance
     * 
     **/
    function createInstance(address tokenAddress, address oracleContractAddr, bytes32 jobId, uint256 tokenFee, address smartLockAddress) public returns (address) {
        GoPluginSmartLock goPluginSmartLock = new GoPluginSmartLock(tokenAddress, oracleContractAddr, jobId, tokenFee, smartLockAddress);
        address instanceAddress = address(goPluginSmartLock);
        return instanceAddress;
    }
    
}