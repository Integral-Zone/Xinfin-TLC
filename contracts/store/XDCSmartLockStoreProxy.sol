// SPDX-License-Identifier: MIT

pragma solidity ^0.4.24;

import "../proxy/AdminUpgradeabilityProxy.sol";


/**
 * Proxy contract implementing the OpenZeppelin Proxy Upgrade Pattern. 
 * Ref: https://docs.openzeppelin.com/learn/upgrading-smart-contracts
 * 
 **/
contract XDCSmartLockStoreProxy is AdminUpgradeabilityProxy {
    
    constructor(address implementation) public AdminUpgradeabilityProxy(implementation) { }
    
}