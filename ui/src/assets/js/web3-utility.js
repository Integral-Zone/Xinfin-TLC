import moment from 'moment';
import common from '@/assets/js/common'

import {getNetworkConfig} from '@/assets/js/config'

/**
 * Get the address from XDCPay wallet
 * 
 * @param {*} vm - Component with web3 instance
 * @returns - Address from XDCPay wallet
 */
async function getAddress(vm) {
    const accounts = await vm.$web3js.eth.getAccounts();
    return accounts[0]
}

/**
 * Retrieves the balance of the given address
 * 
 * @param {*} vm - Component with web3 instance
 * @param {*} addr - Address to get the XDC balance 
 * 
 * @returns - Balance converted XDC
 */
async function getBalance(vm, addr, format) {
  try {
    let balance = await vm.$web3js.eth.getBalance(addr);
    balance = vm.$web3js.utils.fromWei(balance, 'ether');
    if(format) {
      balance = parseFloat(balance).toFixed(3) 
    }
    return balance
  }catch(err) {
    console.log(err)
    vm.rpcInProgress = false
    common.notifyError('Error processing request')
  }
}


/**
 * Retrieves the token balances for the supported node types. Refer assests/js/common.js -> SUPPORTED_NODE_TYPES for more info
 * 
 * @param {*} vm - Component with web3 instance
 * @param {*} addr - Address to get the token balances
 * 
 * @returns - Token Balance and corresponding symbols 
 */
async function getTokenBalance(vm, addr) {
  let tokenBalances = {}
  try {
    for(const nodeType of common.SUPPORTED_NODE_TYPES) {
        let config = getNetworkConfig(nodeType, vm.networkId)
        let tokenContract = await new vm.$web3js.eth.Contract(config.TOKEN_ABI, config.TOKEN_CONTRACT_ADDR)
        let balance = await tokenContract.methods.balanceOf(addr).call()
        balance = balance / (10**config.DECIMALS)
        tokenBalances[nodeType] = {
          balance: balance,
          symbol: config.SYMBOL
        }
    }
  }
  catch(err) {
    console.log(err)
    vm.rpcInProgress = false
    common.notifyError('Error fetching token balances')
  }
  return tokenBalances
}

/**
 * Method to prepare and retrieve XDC Smart Lock factory's newTimeLockedContract method instance
 * 
 * @param {*} vm - Component with web3 instance
 * @param {*} config - Receivers and corresponding funds
 * 
 * @returns - XDC Smart Lock factory's createInstance method instance, which will be used to create a new contract/wallet and transfer XDC
 */
async function createSmartLock(vm, config) {
  try {
    const networkConfig = getNetworkConfig(vm.networkId)
    const smartLockConfig = await getSmartLockConfig(vm)
    const factoryAddress = await smartLockConfig.methods.getSmartLockFactoryAddress().call({from: config.address})

    const smartLockContract = await new vm.$web3js.eth.Contract(networkConfig.SMARTLOCK_FACTORY_ABI, factoryAddress)
    let receivers = []
    let funds = []
    for(let target of config.targets) {
       receivers.push(target.receiver)
       /**
        * Convert the value in XDC to wei
        */
       funds.push(vm.$web3js.utils.toWei(target.xdc+'', 'ether'))
    }
    return await smartLockContract.methods.createSmartLock(receivers, funds, config.duration, networkConfig.SMARTLOCK_STORE_ADDR)
  }catch(err) {
    console.log(err)
    vm.rpcInProgress = false
    common.notifyError('Error processing request')
  }
}

/**
 * 
 */
async function withdrawConract(vm, contractDetails) {
  try {
    console.log(contractDetails)
    const tlwContract = await new vm.$web3js.eth.Contract(getNetworkConfig(vm.networkId).SMARTLOCK_ABI, contractDetails.walletAddress);
    return await tlwContract.methods.withdraw();
  }catch(err) {
    console.log(err)
    vm.rpcInProgress = false
    common.notifyError('Error processing request')
  }
}

/**
 * 
 * Method to transfer LINK token to the contract. LINK token is required for Chainlink oracle node to execute the configured job.
 * Once the link token is transferred,  
 * 
 * @param {*} vm - Component with web3 instance
 * @param {*} config - XDC Smart Lock contract address, LINK token value
 * 
 * @returns - Execution status 
 */
async function transferToken(vm, config, tokenDetails) {
  try {
    const networkConfig = getNetworkConfig(vm.networkId)
    const smartLockConfig = await getSmartLockConfig(vm)
    const conf = await smartLockConfig.methods.getConfig(config.nodeType).call()
    const tokenContract = await new vm.$web3js.eth.Contract(networkConfig.TOKEN_ABI, conf[1]);
    return await tokenContract.methods.transferAndCall(config.smartLockAddress, tokenDetails[config.nodeType].feeInt+'', vm.$web3js.utils.asciiToHex(config.nodeType));
  }catch(err) {
    console.log(err)
    vm.rpcInProgress = false
    common.notifyError('Error processing request')
  }
}

/**
 * Get the smart lock config instance based on the config address stored in SmartLock Store
 */
async function getSmartLockConfig(vm) {
  const networkConfig = getNetworkConfig(vm.networkId)
  const smartLockStore = await new vm.$web3js.eth.Contract(networkConfig.SMARTLOCK_STORE_ABI, networkConfig.SMARTLOCK_STORE_ADDR);
  const configAddress = await smartLockStore.methods.getSmartLockConfigAddr().call();
  const smartLockConfig = await new vm.$web3js.eth.Contract(networkConfig.SMARTLOCK_CONFIG_ABI, configAddress);
  return smartLockConfig;
}

/**
 * Retrieve all the XDC Smart Lock contracts created by the specified address
 * 
 * @param {*} vm - Component with web3 instance
 * @param {*} addr - Address of the contract creator
 * 
 * @returns - List of XDC Smart Lock contracts created by the specified address
 */
async function getSmartLocks(vm, addr, limit, offset) {
  try{
    const networkConfig = getNetworkConfig(vm.networkId)
    const storeAddress = networkConfig.SMARTLOCK_STORE_ADDR;

    const smartLockStore = await new vm.$web3js.eth.Contract(networkConfig.SMARTLOCK_STORE_ABI, storeAddress);
    return await smartLockStore.methods.getUserSmartLocks(addr, limit , offset).call({from: addr});

  }catch(err) {
    console.log(err)
    vm.rpcInProgress = false
    common.notifyError('Error processing request')
  }
}


/**
 * 
 * Get total count of smart lock instances created by the user
 * 
 * @param {*} vm 
 * @param {*} addr 
 * @returns 
 */
async function getTotalSmartLocks(vm, addr) {
  try{
    const networkConfig = getNetworkConfig(vm.networkId)
    const storeAddress = networkConfig.SMARTLOCK_STORE_ADDR;

    const smartLockStore = await new vm.$web3js.eth.Contract(networkConfig.SMARTLOCK_STORE_ABI, storeAddress);
    let total = await smartLockStore.methods.getTotalSmartLocks(addr).call({from: addr});
    return parseInt(total)

  }catch(err) {
    console.log(err)
    vm.rpcInProgress = false
    common.notifyError('Error processing request')
  }
}

/**
 * 
 * Get the most recent smartlock instance address created by the user 
 * 
 * @param {*} vm 
 * @param {*} addr 
 * @returns 
 */
async function getUserRecentSmartLock(vm, addr) {
  try{
    const networkConfig = getNetworkConfig(vm.networkId)
    const storeAddress = networkConfig.SMARTLOCK_STORE_ADDR;

    const smartLockStore = await new vm.$web3js.eth.Contract(networkConfig.SMARTLOCK_STORE_ABI, storeAddress);
    return await smartLockStore.methods.getUserRecentSmartLock(addr).call({from: addr})

  }catch(err) {
    console.log(err)
    vm.rpcInProgress = false
    common.notifyError('Error processing request')
  }
}

/**
 * Function to wait till the block is created in the chain and retrieves the receipt 
 * 
 * @param {*} vm - Component with web3 instance
 * @param {*} hash - Transaction hash
 * @param {*} cb - Callback function to be called once the block is created 
 */
async function waitForReceipt(vm, hash, cb) {
    vm.$web3js.eth.getTransactionReceipt(hash, function (err, receipt) {
      if (err) {
        cb({
            error: err
        });
      }

      if (receipt !== null) {
        // Transaction went through
        if (cb) {
          cb(receipt);
        }
      } else {
        // Try again in 1 second
        window.setTimeout(function () {
          waitForReceipt(vm, hash, cb);
        }, 1000);
      }
    });
}

/**
 * Retrieves the XDC Smart Lock Contract details for the specified contract address
 * 
 * @param {*} vm - Component with web3 instance
 * @param {*} address - Address from which the call is being made
 * @param {*} walletAddress - XDC Smart Lock contract address
 * 
 * @returns -
 * - Receivers 
 * - Alloted XDC against each receiver
 * - Sender / Creator of XDC Smart Lock contract
 * - Contract creation date
 * - XDC release date
 * - Total XDC alloted to transfer
 * - Available LINK token balance
 * - Statis of contract. i.e. Indicating if the funds are released 
 */
async function getContractDetails(vm, address, smartLockAddress) {
  try {
    const networkConfig = getNetworkConfig(vm.networkId)
    const smartLockContract = await new vm.$web3js.eth.Contract(networkConfig.SMARTLOCK_ABI, smartLockAddress);
    let info = await smartLockContract.methods.info().call({from: address})

    let funds = []
    for(let fund of info[2]) {
        funds.push(vm.$web3js.utils.fromWei(fund, 'ether'))
    }

    let resp = {
      sender: info[0],
      receivers: info[1],
      funds: funds,
      unlockDateTS: ((info[3] && info[3] != '0') ? parseInt(info[3]) : 0) * 1000,
      unlockDateFrmt: ((info[3] && info[3] != '0') ? moment(info[3]*1000).format("DD-MMM-YYYY HH:mm:ss") : '-'),
      unlockDate: ((info[3] && info[3] != '0') ? moment(info[3]*1000).fromNow() : '-'),
      createdDateFrmt: moment(info[4]*1000).format("DD-MMM-YYYY HH:mm:ss"),
      createdDate: moment(info[4]*1000).fromNow(),
      xdc: vm.$web3js.utils.fromWei(info[5], 'ether'),
      status: common.SMARTLOCK_STATUS[info[6]],
      statusInt: parseInt(info[6]),
      walletAddress: smartLockAddress
    }
    
    if([1,2].includes(resp.statusInt)) {
      let clientInfo = await smartLockContract.methods.clientInfo().call({from: address})  
      resp.tokenSymbol = clientInfo[1]
      resp.nodeType = clientInfo[0]
    }
    return resp
  }catch(err) {
    console.log(err)
    vm.rpcInProgress = false
    common.notifyError('Invalid XDC Smart Lock contract')
  }
}

export default {
  getAddress,
  getBalance,
  createSmartLock,
  transferToken,
  getSmartLocks,
  waitForReceipt,
  getContractDetails,
  withdrawConract,
  getTokenBalance,
  getUserRecentSmartLock,
  getTotalSmartLocks
}