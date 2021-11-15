// SPDX-License-Identifier: MIT

pragma solidity ^0.4.24;

/**
 * Interface to be implemented by required node client factories Eg: Chainlink or GoPlugin Factories
 **/
interface XDCSmartLockClientFactory {
    
     function createInstance(address tokenAddress, address oracleContractAddr, bytes32 jobId, uint256 tokenFee, address smartLockAddress) external returns (address) ;
     
}