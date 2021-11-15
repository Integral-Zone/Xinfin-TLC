// SPDX-License-Identifier: MIT

pragma solidity ^0.4.24;

/**
 * Interface to be implemented by required node clients Eg: Chainlink or GoPlugin clients
 **/
interface XDCSmartLockClient {
    
     function initiateJob(uint256 unlockDate) external;
     
     function onJobComplete(bytes32 requestId) external;
     
     function getNodeType() external view returns (string);
     
     function info() external view returns (string, string, uint8);
    
    
}