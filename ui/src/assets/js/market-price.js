import {getNetworkConfig} from '@/assets/js/config'
import axios from 'axios'

/**
 * Get token market price from exchange (CoinGecko) and calculate the appropriate price
 */
async function getTokenPriceDetails(vm, config) {
    let tokenBalances = await getTokenBalances(vm, config)
    
    try {

        /**
         * 
         * For development, proxy Coinmarket Cap API https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?slug=chainlink,plugin
         * and use the appropriate proxy URL below.
         * Vist https://coinmarketcap.com/api/ for more information on generating and using the API key
         * 
         */
        let resp = await axios.get('/crypto/price')
        resp = resp.data.data

        Object.keys(resp).forEach(function(key) {
            let details = resp[key]
            tokenBalances[details.name].usdValue = details.quote.USD.price
            tokenBalances[details.name].usdFee = (details.quote.USD.price * tokenBalances[details.name].fee).toFixed(2)
        })
    }catch(err) {
        console.log(err)
    }
    
    return tokenBalances
}

/**
 * Get the token balance of the user for each of the supported token types
 */
async function getTokenBalances(vm, config) {
    const networkConfig = getNetworkConfig(vm.networkId)
    const smartLockConfig = await getSmartLockConfig(vm, networkConfig)

    const totalNodes = await smartLockConfig.methods.getTotalNodes().call({from: config.address})

    let resp = {}
    for(let i=0; i< totalNodes; i++) {
        let nodeType = await smartLockConfig.methods.getNodeTypes(i).call({from: config.address})
        let nodeTypeConfig = await smartLockConfig.methods.getNodeTypeConfig(nodeType).call({from: config.address})

        resp[nodeType] = {}
        let tokenContract = await new vm.$web3js.eth.Contract(networkConfig.TOKEN_ABI, nodeTypeConfig[0])
        resp[nodeType].balance = await tokenContract.methods.balanceOf(config.address).call()
        resp[nodeType].symbol = await tokenContract.methods.symbol().call()
        resp[nodeType].decimals = await tokenContract.methods.decimals().call()
        resp[nodeType].fee = nodeTypeConfig[3] / (10**resp[nodeType].decimals)
        resp[nodeType].feeInt = nodeTypeConfig[3]
        resp[nodeType].address = nodeTypeConfig[0]
        resp[nodeType].balance = (resp[nodeType].balance / (10**resp[nodeType].decimals)).toFixed(2)
    }    
    return resp
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

export default {
    getTokenBalances,
    getTokenPriceDetails
  }