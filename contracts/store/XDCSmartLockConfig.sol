// SPDX-License-Identifier: MIT

pragma solidity ^0.4.24;

/**
 * 
 * Configuration store to store all configuration required the XDC Smartlock application.
 * 
 * To be implemented by required node clients Eg: Chainlink or Go Plugin clients
 * 
 **/
contract XDCSmartLockConfig {
    
    /**
     * Owner of the configuration instance. Only will be able to update the configurations
     * 
     **/ 
    address private _owner;
    
    /**
     * XDC Smartlock factory addres 
     **/ 
    address private _smartLockFactoryAddress;
    
    /**
     * List of node types
     **/ 
    string[] private _nodeTypes;
    
    /**
     * 
     * configuration for each nodeType. 
     * NodeTypes :- Chainlink, Plugin
     * 
     **/ 
    mapping(string => NodeTypeConfig) private _nodeTypeConfigs;
    
    /**
     * Struct to store the node type configurations. Eg: configurations for Chainlink and Plugin
     **/ 
    struct NodeTypeConfig { 
       address tokenAddress;
       address oracleContractAddr;
       bytes32 jobId;
       address factoryContractAddress;
       uint256 fee;
       bool isSet;
    }
    
    modifier onlyOwner {
        require(msg.sender == _owner);
        _;
    }
    
    function setOwner() public {
        require(_owner == address(0), "Owner is already set. Use transferOwnership to change the admin");
        _owner = msg.sender;     
    }
    
    function getOwner() public view returns (address) {
        return _owner;
    }
    
    function transferOwnership(address owner) public onlyOwner {
        _owner = owner;
    }
    
    function setSmartLockFactoryAddress(address smartLockFactoryAddress) public onlyOwner {
        _smartLockFactoryAddress = smartLockFactoryAddress;
    }
    
    function getSmartLockFactoryAddress() public view returns (address) {
        return _smartLockFactoryAddress;
    }
    
    function setConfig(string nodeType, address tokenAddress, address oracleContractAddr, string jobId, address factoryContractAddress, uint256 fee) public onlyOwner {
        if(!_nodeTypeConfigs[nodeType].isSet) {
            _nodeTypes.push(nodeType);
        }
        _nodeTypeConfigs[nodeType] = NodeTypeConfig(tokenAddress, oracleContractAddr, stringToBytes32(jobId), factoryContractAddress, fee, true);
    }
    
    function getConfig(string nodeType) public view returns (bool, address, address, bytes32, address, uint256) {
        return (_nodeTypeConfigs[nodeType].isSet, _nodeTypeConfigs[nodeType].tokenAddress, _nodeTypeConfigs[nodeType].oracleContractAddr, _nodeTypeConfigs[nodeType].jobId, _nodeTypeConfigs[nodeType].factoryContractAddress, _nodeTypeConfigs[nodeType].fee);
    }
    
    function getFactoryContractAddr(string nodeType) public view returns (bool, address) {
        return (_nodeTypeConfigs[nodeType].isSet, _nodeTypeConfigs[nodeType].factoryContractAddress);
    }
    
    function getNodeTypeConfig(string nodeType) public view returns (address, address, bytes32, uint256 fee) {
        return (_nodeTypeConfigs[nodeType].tokenAddress, _nodeTypeConfigs[nodeType].oracleContractAddr, _nodeTypeConfigs[nodeType].jobId, _nodeTypeConfigs[nodeType].fee);
    }
    
    function getNodeTypes(uint index) public view returns (string) {
        return _nodeTypes[index];
    }
    
    function getTotalNodes() public view returns (uint) {
        return _nodeTypes.length;
    }
        
    function stringToBytes32(string memory source) private pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
    
        assembly {
            result := mload(add(source, 32))
        }
    }    
    
}