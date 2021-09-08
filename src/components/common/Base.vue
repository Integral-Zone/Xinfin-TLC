<template>
     <loading v-model:active="rpcInProgress" :color="$loaderColor"/>
</template>

<script>

import web3Util from '@/assets/js/web3-utility'

export default {
    name: 'Base',
    data() {
        return {
            xdc: 0,
            link: 0,
            address: '',
            rpcInProgress: false,
            networkId: 0,
            isInitialized: false
        }
    },
    async mounted() {
        this.rpcInProgress = true
        this.networkId = await this.$web3js.eth.net.getId() 
        this.address = await web3Util.getAddress(this)
        this.xdc = await web3Util.getBalance(this, this.address)
        this.link = await web3Util.getLINKBalance(this, this.address) 
        this.isInitialized = true
        this.rpcInProgress = false
        
    }
}
</script>
