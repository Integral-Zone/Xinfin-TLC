// SPDX-License-Identifier: MIT

pragma solidity ^0.4.24;

/**
 * 
 * Contract to store the XDC Smart Lock contract address against the funders / owners
 * 
 **/
contract XDCSmartLockStore {

    /**
     * 
     * Mapping to store smart locks againt the funders / owners 
     **/
    mapping(address => address[]) private _smartLocks;
    
    /**
     * 
     * Mapping to store smart locks summary. These fields will be used for filtering
     **/
    mapping(address => SmartLockSummary) private _smartLockSummary;
    
    /**
     * Smartlock config address
     **/ 
    address private _smartLockConfig;
    
    /**
     * List of all funders
     **/ 
    address[] private _funders;
    
    /**
     * 
     * Struct to store the contract summary fields
     **/ 
    struct SmartLockSummary {
        uint256 status;
        uint256 createdDt;
        uint256 unlockDt;
    }
    
    /**
     * Function to store smart lock contract address againt the user / owner
     **/
    function addSmartLocks(address user, address smartLock, uint256 status, uint256 createdDt, uint256 unlockDt) public {
        
        if(_smartLocks[user].length == 0) {
            _funders.push(user);   
        }
        
        _smartLocks[user].push(smartLock);
        setSmartLockSummary(smartLock, status, createdDt, unlockDt);
    }
    
    function setSmartLockConfigAddr(address smartLockConfig) public {
        _smartLockConfig = smartLockConfig;
    }
    
    function getSmartLockConfigAddr() public view returns (address) {
        return _smartLockConfig;
    }
    
    function getTotalSmartLocks(address user) public view returns (uint256) {
        return _smartLocks[user].length;
    }
    
    function getUserRecentSmartLock(address user) public view returns (address) {
        return _smartLocks[user][getTotalSmartLocks(user)-1];
    }
    
    function updateSmartLockSummary(address smartLockAddress, uint256 status) public {
        _smartLockSummary[smartLockAddress].status = status;
    }
        
    function setSmartLockSummary(address smartLockAddress, uint256 status, uint256 createdDt, uint256 unlockDt) internal {
        _smartLockSummary[smartLockAddress] = SmartLockSummary(status, createdDt, unlockDt);
    }
    
    function getContractSummary(address smartLockAddress) public view returns (uint256, uint256, uint256) {
        return (_smartLockSummary[smartLockAddress].status, _smartLockSummary[smartLockAddress].createdDt, _smartLockSummary[smartLockAddress].unlockDt);
    }
    
    /**
     * Function to retrieve the smart lock contracts created by the funders in a paginated fashion
     **/
    function getUserSmartLocks(address user, uint256 from, uint256 to) public view returns(address[] memory) {
        
        address[] memory contracts = new address[](from - to);
        
        uint256 counter = 0;
        for(uint256 i = from ; i > to ; i--) {
            contracts[counter] = _smartLocks[user][i-1];
            counter+=1;
        }
        return contracts;   
    }
    
    /**
     * Function to retrieve the the funders in a paginated fashion
     **/
    function getFunders(uint256 from, uint256 to) public view returns (address[]) {
        address[] memory list = new address[](to-from+1);
        
        uint256 counter = 0;
        for(uint256 i = from ; i <= to ; i++) {
            list[counter] = _funders[i];
            counter+=1;
        }
        
        return list;
    }
    
    
    /**
     * Retrieves total number of funders
     **/
    function getTotalFunders() public view returns (uint256) {
        return _funders.length;
    }
    
}