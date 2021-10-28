/**
 * Network configurations 
 */
const NETWORK_CONFIGURATIONS = {
    /**
     * Configurations for XinFin Apothem Network (TestNet)
     * 
     * Chain Id for Apothem Network is 51. Refer https://howto.xinfin.org/general/networks/#specifications_1 for more information
     */
    51: {
        /**
         * Contract addres of LINK token. https://github.com/XinFinOrg/XinFin-ChainLink/blob/master/contracts/LinkToken.sol
         */
        LINK_TOKEN_CONTRACT_ADDR: '0x499F9320079C3a5Dd30AF691ea1a88e8c75FDA17',
        /**
         * ABI of LINK token contract
         */
        LINK_TOKEN_ABI: [ { "constant": false, "inputs": [ { "name": "spender", "type": "address" }, { "name": "value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function", "stateMutability": "nonpayable" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function", "stateMutability": "view" }, { "constant": false, "inputs": [ { "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function", "stateMutability": "nonpayable" }, { "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "value", "type": "uint256" }, { "name": "data", "type": "bytes" } ], "name": "transferAndCall", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "type": "function", "stateMutability": "nonpayable" }, { "constant": true, "inputs": [ { "name": "who", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function", "stateMutability": "view" }, { "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function", "stateMutability": "nonpayable" }, { "constant": true, "inputs": [ { "name": "owner", "type": "address" }, { "name": "spender", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function", "stateMutability": "view" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }, { "indexed": false, "name": "data", "type": "bytes" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" } ],
        /**
         * Contract addres of Oracle contract. Refer contracts/Oracle.sol for more info
         */
        ORACLE_CONTRACT_ADDR: '0x84f64c5ac6ebb7b2caaaa479050139650b922453',
        /**
         * Job Id created in Chainlink node. Job definition available at chainlink/alarm-job.json
         */
        CHAIN_LINK_JOB_ID: 'b166b3027fd742e6be9fe203fb58f571',
        /**
         * Fee charged by Oracle contract to trigger the Chainlink job. Value is 0.1 LINK 
         */
        CHAIN_LINK_FEE: 0.1 * 10 ** 18,
        /**
         * XDC Smart Lock factory contract address. Contract reference contracts/XDCSmartLockFactory.sol
         */
        TLW_FACTORY_CONTRACT_ADDR: '0xd15dffC9c0C3441756467E7F96b0CEdE2eDff34E',
        /**
         * XDC Smart Lock factory contract ABI
         */
        // TLW_FACTORY_CONTRACT_ABI: [ { "constant": false, "inputs": [ { "name": "receivers", "type": "address[]" }, { "name": "funds", "type": "uint256[]" }, { "name": "oracleContractAddr", "type": "address" }, { "name": "jobId", "type": "bytes32" }, { "name": "link", "type": "address" } ], "name": "newTimeLockedContract", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "payable": false, "stateMutability": "nonpayable", "type": "fallback" }, { "constant": true, "inputs": [ { "name": "user", "type": "address" } ], "name": "getWallets", "outputs": [ { "name": "", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" } ],
        TLW_FACTORY_CONTRACT_ABI: [ { "constant": false, "inputs": [ { "name": "receivers", "type": "address[]" }, { "name": "funds", "type": "uint256[]" }, { "name": "oracleContractAddr", "type": "address" }, { "name": "jobId", "type": "bytes32" }, { "name": "link", "type": "address" }, { "name": "linkFee", "type": "uint256" }, { "name": "durationInSeconds", "type": "uint256" } ], "name": "newTimeLockedContract", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "payable": false, "stateMutability": "nonpayable", "type": "fallback" }, { "constant": true, "inputs": [ { "name": "user", "type": "address" } ], "name": "getWallets", "outputs": [ { "name": "", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" } ],
        /**
         * XDC Smart Lock contract ABI
         */
        // TLW_CONTRACT_ABI: [ { "constant": true, "inputs": [], "name": "info", "outputs": [ { "name": "", "type": "address" }, { "name": "", "type": "address[]" }, { "name": "", "type": "uint256[]" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "durationInSeconds", "type": "uint256" }, { "name": "fee", "type": "uint256" } ], "name": "initiateAlarm", "outputs": [ { "name": "requestId", "type": "bytes32" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_requestId", "type": "bytes32" } ], "name": "releaseFunds", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "name": "sender", "type": "address" }, { "name": "receivers", "type": "address[]" }, { "name": "funds", "type": "uint256[]" }, { "name": "oracleContractAddr", "type": "address" }, { "name": "jobId", "type": "bytes32" }, { "name": "link", "type": "address" }, { "name": "totalXDC", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "from", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "Received", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "receiver", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "Released", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "id", "type": "bytes32" } ], "name": "ChainlinkRequested", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "id", "type": "bytes32" } ], "name": "ChainlinkFulfilled", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "id", "type": "bytes32" } ], "name": "ChainlinkCancelled", "type": "event" } ]
        TLW_CONTRACT_ABI: [ { "constant": true, "inputs": [], "name": "info", "outputs": [ { "name": "", "type": "address" }, { "name": "", "type": "address[]" }, { "name": "", "type": "uint256[]" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "bool" }, { "name": "", "type": "bool" }, { "name": "", "type": "uint256" }, { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "sender", "type": "address" }, { "name": "value", "type": "uint256" }, { "name": "data", "type": "bytes" } ], "name": "onTokenTransfer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_requestId", "type": "bytes32" } ], "name": "releaseFunds", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "initiateAlarm", "outputs": [ { "name": "requestId", "type": "bytes32" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "name": "sender", "type": "address" }, { "name": "receivers", "type": "address[]" }, { "name": "funds", "type": "uint256[]" }, { "name": "oracleContractAddr", "type": "address" }, { "name": "jobId", "type": "bytes32" }, { "name": "link", "type": "address" }, { "name": "totalXDC", "type": "uint256" }, { "name": "linkFee", "type": "uint256" }, { "name": "durationInSeconds", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "from", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "Received", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "receiver", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "Released", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "id", "type": "bytes32" } ], "name": "ChainlinkRequested", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "id", "type": "bytes32" } ], "name": "ChainlinkFulfilled", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "id", "type": "bytes32" } ], "name": "ChainlinkCancelled", "type": "event" } ]
    },
    /**
     * Configurations for XinFin MainNet Network
     * 
     * Chain Id for XinFin MainNet Network is 50. Refer https://howto.xinfin.org/general/networks/#specifications for more information
     * 
     * NOTE: Replace appropriate values below as per XinFin Main network
     */
    50: {
        /**
         * Contract addres of LINK token. https://github.com/XinFinOrg/XinFin-ChainLink/blob/master/contracts/LinkToken.sol
         */
         LINK_TOKEN_CONTRACT_ADDR: '',
         /**
          * ABI of LINK token contract
          */
         LINK_TOKEN_ABI: [ { "constant": false, "inputs": [ { "name": "spender", "type": "address" }, { "name": "value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function", "stateMutability": "nonpayable" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function", "stateMutability": "view" }, { "constant": false, "inputs": [ { "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function", "stateMutability": "nonpayable" }, { "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "value", "type": "uint256" }, { "name": "data", "type": "bytes" } ], "name": "transferAndCall", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "type": "function", "stateMutability": "nonpayable" }, { "constant": true, "inputs": [ { "name": "who", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function", "stateMutability": "view" }, { "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function", "stateMutability": "nonpayable" }, { "constant": true, "inputs": [ { "name": "owner", "type": "address" }, { "name": "spender", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function", "stateMutability": "view" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }, { "indexed": false, "name": "data", "type": "bytes" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" } ],
         /**
          * Contract addres of Oracle contract. Refer contracts/Oracle.sol for more info
          */
         ORACLE_CONTRACT_ADDR: '',
         /**
          * Job Id created in Chainlink node. Job definition available at chainlink/alarm-job.json
          */
         CHAIN_LINK_JOB_ID: '',
         /**
          * Fee charged by Oracle contract to trigger the Chainlink job. Value is 0.1 LINK 
          */
         CHAIN_LINK_FEE: 0.1 * 10 ** 18,
         /**
          * XDC Smart Lock factory contract address. Contract reference contracts/XDCSmartLockFactory.sol
          */
         TLW_FACTORY_CONTRACT_ADDR: '',
         /**
          * XDC Smart Lock factory contract ABI
          */
         TLW_FACTORY_CONTRACT_ABI: [ { "constant": false, "inputs": [ { "name": "receivers", "type": "address[]" }, { "name": "funds", "type": "uint256[]" }, { "name": "oracleContractAddr", "type": "address" }, { "name": "jobId", "type": "bytes32" }, { "name": "link", "type": "address" } ], "name": "newTimeLockedContract", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "payable": false, "stateMutability": "nonpayable", "type": "fallback" }, { "constant": true, "inputs": [ { "name": "user", "type": "address" } ], "name": "getWallets", "outputs": [ { "name": "", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" } ],
         /**
          * XDC Smart Lock contract ABI
          */
         TLW_CONTRACT_ABI: [ { "constant": true, "inputs": [], "name": "info", "outputs": [ { "name": "", "type": "address" }, { "name": "", "type": "address[]" }, { "name": "", "type": "uint256[]" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "durationInSeconds", "type": "uint256" }, { "name": "fee", "type": "uint256" } ], "name": "initiateAlarm", "outputs": [ { "name": "requestId", "type": "bytes32" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_requestId", "type": "bytes32" } ], "name": "releaseFunds", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "name": "sender", "type": "address" }, { "name": "receivers", "type": "address[]" }, { "name": "funds", "type": "uint256[]" }, { "name": "oracleContractAddr", "type": "address" }, { "name": "jobId", "type": "bytes32" }, { "name": "link", "type": "address" }, { "name": "totalXDC", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "from", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "Received", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "receiver", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "Released", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "id", "type": "bytes32" } ], "name": "ChainlinkRequested", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "id", "type": "bytes32" } ], "name": "ChainlinkFulfilled", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "id", "type": "bytes32" } ], "name": "ChainlinkCancelled", "type": "event" } ]
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
export function getNetworkConfig(vm) {
    return NETWORK_CONFIGURATIONS[vm.networkId]
}

export const LOADER_COLOR = '#21325b';