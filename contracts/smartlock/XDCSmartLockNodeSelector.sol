// SPDX-License-Identifier: MIT

pragma solidity ^0.4.24;

import "../store/XDCSmartLockConfig.sol";
import "../store/XDCSmartLockStore.sol";
import "../interface/TokenInterface.sol";
import "../interface/XDCSmartLockClientFactory.sol";

/**
 * 
 * Contract to create an appropriate instance of either Chainlink or Plugin client.
 * Each of Chainlink or Plugin client will implement XDCSmartLockClientFactory. 
 * 
 * Factory contract address of appropriate client will be retrieved from XDCSmartLockStore and a  
 * new instance of Chainlink or Plugin client the will be create based on the provided nodetype 
 * 
 **/
contract XDCSmartLockNodeSelector {
    
    /**
     * 
     * Gets the configuration from store and retrieves the appropriate nodeType configuration
     * 
     * @params:
     * 
     *   data - Node type either "Chainlink" or "Plugin"
     *   smartLockStoreAddr - SmartLock store address
     *   smartLockAddr - SmatLock instance address
     * 
     * @returns:
     * 
     *   nodeClientAddress - Address of the nodeType instance
     *   tokenAddress - Address of the LINK or PLI token
     * 
     **/ 
    function createInstance(bytes data, address smartLockStoreAddr, address smartLockAddr) public returns (address, address) {
        
        XDCSmartLockConfig xdcSmartLockConfig = getSmartLockConfig(smartLockStoreAddr);
        
        XDCSmartLockClientFactory xdcSmartLockClientFactory = XDCSmartLockClientFactory(getFactoryContractAddr(data, xdcSmartLockConfig));
        
        (address tokenAddress, address oracleContractAddr, bytes32 jobId, uint256 tokenFee) = xdcSmartLockConfig.getNodeTypeConfig(string(data));
        
        address nodeClientAddress = xdcSmartLockClientFactory.createInstance(tokenAddress, oracleContractAddr, jobId, tokenFee, smartLockAddr);
        
        return (nodeClientAddress, tokenAddress);
    }

    
    /**
     * Retrieves the appropriate factory contract address based on the nodeType 
     * 
     * @params
     *   data - Node type either "Chainlink" or "Plugin"
     *   xdcSmartLockConfig - SmartLock config instance
     * 
     * @returns
     *   
     *   factoryContractAddress - Address of the NodeType factory contract instance
     * 
     **/
    function getFactoryContractAddr(bytes data, XDCSmartLockConfig xdcSmartLockConfig) private view returns (address) {
        
        (bool isSet, address factoryContractAddress) = xdcSmartLockConfig.getFactoryContractAddr(string(data));
        
        require (isSet == true);
        
        return factoryContractAddress;
    }  
    
    /**
     * Retrieve the smart lock config instance  
     * 
     * @params
     *   smartLockStoreAddr - SmartLock store address
     * 
     * @returns
     *   xdcSmartLockConfig - NodeType factory contract instance
     * 
     **/
    function getSmartLockConfig(address smartLockStoreAddr) private view returns (XDCSmartLockConfig) {
        XDCSmartLockStore xdcSmartLockStore = XDCSmartLockStore(smartLockStoreAddr);
        address configStoreAddress = xdcSmartLockStore.getSmartLockConfigAddr();
        
        XDCSmartLockConfig xdcSmartLockConfig = XDCSmartLockConfig(configStoreAddress);
        return xdcSmartLockConfig;
    }
    
    
    
}