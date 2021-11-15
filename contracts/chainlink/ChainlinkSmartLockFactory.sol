// SPDX-License-Identifier: MIT

pragma solidity ^0.4.24;

import "./ChainlinkSmartLock.sol";
import "../interface/XDCSmartLockClientFactory.sol";

/**
 * 
 * Implementation of XDCSmartLockClientFactory.
 * Factory contract to create new instance of Chailink XDCSmartLock client
 * 
 **/
contract ChainlinkSmartLockFactory is XDCSmartLockClientFactory {
    
     /**
     * Creates an instance of Chainlink Smart Lock client and stores the contract address in the store
     * 
     * @params 
     * 
     *  tokenAddress - Address of Chainlink token
     *  oracleContractAddr - Address of the Oracle contract
     *  jobId - Duration to lockup the XDC
     *  tokenFee - LINK fee to be paid to the node operator
     *  smartLockAddress - Address of the XDCSmartLock instance
     * 
     **/
    function createInstance(address tokenAddress, address oracleContractAddr, bytes32 jobId, uint256 tokenFee, address smartLockAddress) external returns (address) {
        ChainlinkSmartLock chainlinkSmartLock = new ChainlinkSmartLock(tokenAddress, oracleContractAddr, jobId, tokenFee, smartLockAddress);
        address instanceAddress = address(chainlinkSmartLock);
        return instanceAddress;
    }
    
    
}