/**
 * Network configurations 
 */
const NETWORK_CONFIGURATIONS = {
    /**
     * Network Id 51 is XinFin Apothem Test Network.
     * Configurations for Apothem Test Network.
     */
    51: {
        TOKEN_ABI: [ { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "tokenName", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "spender", "type": "address" }, { "name": "value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "totalTokensIssued", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "decimalPlaces", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "value", "type": "uint256" }, { "name": "data", "type": "bytes" } ], "name": "transferAndCall", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "spender", "type": "address" }, { "name": "addedValue", "type": "uint256" } ], "name": "decreaseApproval", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "tokenSymbol", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "spender", "type": "address" }, { "name": "subtractedValue", "type": "uint256" } ], "name": "increaseApproval", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "owner", "type": "address" }, { "name": "spender", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "remaining", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ],
        SMARTLOCK_CONFIG_ABI: [ { "constant": true, "inputs": [ { "name": "nodeType", "type": "string" } ], "name": "getNodeTypeConfig", "outputs": [ { "name": "", "type": "address" }, { "name": "", "type": "address" }, { "name": "", "type": "bytes32" }, { "name": "fee", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "smartLockFactoryAddress", "type": "address" } ], "name": "setSmartLockFactoryAddress", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "setOwner", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getTotalNodes", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getOwner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "index", "type": "uint256" } ], "name": "getNodeTypes", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "nodeType", "type": "string" } ], "name": "getFactoryContractAddr", "outputs": [ { "name": "", "type": "bool" }, { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "nodeType", "type": "string" }, { "name": "tokenAddress", "type": "address" }, { "name": "oracleContractAddr", "type": "address" }, { "name": "jobId", "type": "string" }, { "name": "factoryContractAddress", "type": "address" }, { "name": "fee", "type": "uint256" } ], "name": "setConfig", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "nodeType", "type": "string" } ], "name": "getConfig", "outputs": [ { "name": "", "type": "bool" }, { "name": "", "type": "address" }, { "name": "", "type": "address" }, { "name": "", "type": "bytes32" }, { "name": "", "type": "address" }, { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getSmartLockFactoryAddress", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "owner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" } ],
        SMARTLOCK_STORE_ADDR: '0x15e79f9e4e45dC2eF382C84055388241d8BA5C09',
        SMARTLOCK_STORE_ABI: [ { "constant": true, "inputs": [ { "name": "user", "type": "address" } ], "name": "getUserRecentSmartLock", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "smartLockAddress", "type": "address" }, { "name": "status", "type": "uint256" } ], "name": "updateSmartLockSummary", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "smartLockConfig", "type": "address" } ], "name": "setSmartLockConfigAddr", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getSmartLockConfigAddr", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "user", "type": "address" }, { "name": "smartLock", "type": "address" }, { "name": "status", "type": "uint256" }, { "name": "createdDt", "type": "uint256" }, { "name": "unlockDt", "type": "uint256" } ], "name": "addSmartLocks", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "user", "type": "address" } ], "name": "getTotalSmartLocks", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "from", "type": "uint256" }, { "name": "to", "type": "uint256" } ], "name": "getFunders", "outputs": [ { "name": "", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "smartLockAddress", "type": "address" } ], "name": "getContractSummary", "outputs": [ { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "user", "type": "address" }, { "name": "from", "type": "uint256" }, { "name": "to", "type": "uint256" } ], "name": "getUserSmartLocks", "outputs": [ { "name": "", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getTotalFunders", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ],
        SMARTLOCK_FACTORY_ABI: [ { "constant": false, "inputs": [ { "name": "receivers", "type": "address[]" }, { "name": "funds", "type": "uint256[]" }, { "name": "durationInSeconds", "type": "uint256" }, { "name": "smartLockStoreAddr", "type": "address" } ], "name": "createSmartLock", "outputs": [ { "name": "", "type": "address" } ], "payable": true, "stateMutability": "payable", "type": "function" } ],
        SMARTLOCK_ABI: [ { "constant": true, "inputs": [], "name": "getVersion", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "info", "outputs": [ { "name": "", "type": "address" }, { "name": "", "type": "address[]" }, { "name": "", "type": "uint256[]" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getFilterParams", "outputs": [ { "name": "", "type": "uint8" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "releaseFunds", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "clientInfo", "outputs": [ { "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "data", "type": "bytes" }, { "name": "smartLockStoreAddr", "type": "address" }, { "name": "smartLockAddr", "type": "address" } ], "name": "createInstance", "outputs": [ { "name": "", "type": "address" }, { "name": "", "type": "address" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "sender", "type": "address" }, { "name": "value", "type": "uint256" }, { "name": "data", "type": "bytes" } ], "name": "onTokenTransfer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "name": "sender", "type": "address" }, { "name": "totalXDC", "type": "uint256" }, { "name": "receivers", "type": "address[]" }, { "name": "funds", "type": "uint256[]" }, { "name": "durationInSeconds", "type": "uint256" }, { "name": "smartLockStoreAddr", "type": "address" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" } ]
    },
    /**
     * Network Id 50 is XinFin Main Network
     * Configurations for Main Network.
     */
    50: {
        TOKEN_ABI: [ { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "tokenName", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "spender", "type": "address" }, { "name": "value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "totalTokensIssued", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "decimalPlaces", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "value", "type": "uint256" }, { "name": "data", "type": "bytes" } ], "name": "transferAndCall", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "spender", "type": "address" }, { "name": "addedValue", "type": "uint256" } ], "name": "decreaseApproval", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "tokenSymbol", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "spender", "type": "address" }, { "name": "subtractedValue", "type": "uint256" } ], "name": "increaseApproval", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "owner", "type": "address" }, { "name": "spender", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "remaining", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ],
        SMARTLOCK_CONFIG_ABI: [ { "constant": true, "inputs": [ { "name": "nodeType", "type": "string" } ], "name": "getNodeTypeConfig", "outputs": [ { "name": "", "type": "address" }, { "name": "", "type": "address" }, { "name": "", "type": "bytes32" }, { "name": "fee", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "smartLockFactoryAddress", "type": "address" } ], "name": "setSmartLockFactoryAddress", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "setOwner", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getTotalNodes", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getOwner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "index", "type": "uint256" } ], "name": "getNodeTypes", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "nodeType", "type": "string" } ], "name": "getFactoryContractAddr", "outputs": [ { "name": "", "type": "bool" }, { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "nodeType", "type": "string" }, { "name": "tokenAddress", "type": "address" }, { "name": "oracleContractAddr", "type": "address" }, { "name": "jobId", "type": "string" }, { "name": "factoryContractAddress", "type": "address" }, { "name": "fee", "type": "uint256" } ], "name": "setConfig", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "nodeType", "type": "string" } ], "name": "getConfig", "outputs": [ { "name": "", "type": "bool" }, { "name": "", "type": "address" }, { "name": "", "type": "address" }, { "name": "", "type": "bytes32" }, { "name": "", "type": "address" }, { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getSmartLockFactoryAddress", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "owner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" } ],
        SMARTLOCK_STORE_ADDR: '0x15e79f9e4e45dC2eF382C84055388241d8BA5C09',
        SMARTLOCK_STORE_ABI: [ { "constant": true, "inputs": [ { "name": "user", "type": "address" } ], "name": "getUserRecentSmartLock", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "smartLockAddress", "type": "address" }, { "name": "status", "type": "uint256" } ], "name": "updateSmartLockSummary", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "smartLockConfig", "type": "address" } ], "name": "setSmartLockConfigAddr", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getSmartLockConfigAddr", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "user", "type": "address" }, { "name": "smartLock", "type": "address" }, { "name": "status", "type": "uint256" }, { "name": "createdDt", "type": "uint256" }, { "name": "unlockDt", "type": "uint256" } ], "name": "addSmartLocks", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "user", "type": "address" } ], "name": "getTotalSmartLocks", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "from", "type": "uint256" }, { "name": "to", "type": "uint256" } ], "name": "getFunders", "outputs": [ { "name": "", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "smartLockAddress", "type": "address" } ], "name": "getContractSummary", "outputs": [ { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "user", "type": "address" }, { "name": "from", "type": "uint256" }, { "name": "to", "type": "uint256" } ], "name": "getUserSmartLocks", "outputs": [ { "name": "", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getTotalFunders", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ],
        SMARTLOCK_FACTORY_ABI: [ { "constant": false, "inputs": [ { "name": "receivers", "type": "address[]" }, { "name": "funds", "type": "uint256[]" }, { "name": "durationInSeconds", "type": "uint256" }, { "name": "smartLockStoreAddr", "type": "address" } ], "name": "createSmartLock", "outputs": [ { "name": "", "type": "address" } ], "payable": true, "stateMutability": "payable", "type": "function" } ],
        SMARTLOCK_ABI: [ { "constant": true, "inputs": [], "name": "getVersion", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "info", "outputs": [ { "name": "", "type": "address" }, { "name": "", "type": "address[]" }, { "name": "", "type": "uint256[]" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getFilterParams", "outputs": [ { "name": "", "type": "uint8" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "releaseFunds", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "clientInfo", "outputs": [ { "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "data", "type": "bytes" }, { "name": "smartLockStoreAddr", "type": "address" }, { "name": "smartLockAddr", "type": "address" } ], "name": "createInstance", "outputs": [ { "name": "", "type": "address" }, { "name": "", "type": "address" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "sender", "type": "address" }, { "name": "value", "type": "uint256" }, { "name": "data", "type": "bytes" } ], "name": "onTokenTransfer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "name": "sender", "type": "address" }, { "name": "totalXDC", "type": "uint256" }, { "name": "receivers", "type": "address[]" }, { "name": "funds", "type": "uint256[]" }, { "name": "durationInSeconds", "type": "uint256" }, { "name": "smartLockStoreAddr", "type": "address" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" } ]
    }
}

/**
 * Function to get the configurations based on network id
 * 
 * 50 - XinFin Main Network
 * 51 - XinFin Apothem Test Network
 * 
 * @param {*} vm - Config instance
 * @returns 
 */
export function getNetworkConfig(networkId) {
    return NETWORK_CONFIGURATIONS[networkId]
}

export const LOADER_COLOR = '#21325b';