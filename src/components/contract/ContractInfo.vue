<template>
     <div class="row bg-white">
              <div class="col">
                <div class="d-flex border p-2  border-start-0 border-end-0">
                    <i class="bi bi-ui-radios info-icon"></i>
                    <div class="info-text-area">
                        <p class="mb-0 info-header"><strong>TIME LOCKED CONTRACT ADDR</strong></p>
                        <p class="mb-0 info-value"><strong>{{contractDetails.unlockDate ? (walletContractAddress || '--') : 'NOT FOUND'}} </strong></p>
                    </div>
                </div>
              </div>
              <div class="col">
                <div class="d-flex border p-2 border-start-0 border-end-0">
                    <i class="bi bi-bank info-icon"></i>
                    <div class="info-text-area">
                        <p class="mb-0 info-header"><strong>XDC AMOUNT LOCKED UP </strong></p>
                        <p class="mb-0 info-value"><strong>{{contractDetails.xdc || '0'}} XDC</strong></p>
                    </div>
                </div>
              </div>
              <div class="col">
                <div class="d-flex border p-2 border-start-0 border-end-0">
                    <i class="bi bi-cash-coin info-icon" style="font-size: 2.3rem; color: cornflowerblue;"></i>
                    <div class="info-text-area">
                        <p class="mb-0 info-header"><strong>LINK TOKEN TRANSFERRED</strong></p>
                        <p class="mb-0 info-value"><strong>{{contractDetails.link || '0'}} LINK</strong></p>
                    </div>
                </div>
              </div>
          </div>
          <div class="row bg-white pb-4">
              
              <div class="col">
                <div class="d-flex border p-2 border-start-0 border-0">
                    <i class="bi bi-person-check-fill info-icon"></i>
                    <div class="info-text-area">
                        <p class="mb-0 info-header"><strong>RECEIVERS & XDC ALLOTED </strong></p>
                        <p class="mb-0 info-value" v-for="(receiver, index) in contractDetails.receivers" :key="index">
                            <i @click="copyToClipboard(receiver)" style="font-size: 18px; margin-right:5px; cursor: pointer" title="Copy receiver's address to clipboard" class="bi bi-clipboard-check"></i> <strong>{{shortenReceiver(receiver) || '--' }} </strong>  <strong style="padding-left:14px; padding-right:10px">-></strong> <strong> {{contractDetails.funds[index]}} XDC</strong>
                        </p>
                    </div>
                </div>
              </div>
              <div class="col">
                <div class="d-flex border p-2 border-start-0 border-0">
                    <i class="bi bi-clock-history info-icon"></i>
                    <div class="info-text-area">
                        <p class="mb-0 info-header"><strong>XDC UNLOCK DATE</strong></p>
                        <p class="mb-0 info-value"><strong>{{contractDetails.unlockDate || '--'}}</strong></p>

                        <ContractStatus :contractDetails="contractDetails"></ContractStatus>
                    </div>
                </div>
              </div>
              <div class="col">
                <div class="d-flex border p-2 border-start-0 border-0">
                    <i class="bi bi-calendar4-week info-icon"></i>
                    <div class="info-text-area">
                        <p class="mb-0 info-header"><strong>CONTRACT CREATION DATE</strong></p>
                        <p class="mb-0 info-value"><strong>{{contractDetails.createdDate || '--'}}</strong></p>
                    </div>
                </div>
              </div>
          </div>
          <loading v-model:active="rpcInProgress" :color="$loaderColor"/>
</template>

<script>

import web3Util from '@/assets/js/web3-utility'
import Loading from 'vue-loading-overlay';

import useClipboard from 'vue-clipboard3'

import ContractStatus from './ContractStatus'

export default {
    
    name: 'ContractInfo',
    data() {
        return {
            rpcInProgress: false,
            contractDetails: {}
        }
    },
    props: {
        walletContractAddress: String,
        address: String,
        networkId: Number
    },
    components: {
        Loading,
        ContractStatus
    },
    mounted() {
        if(this.walletContractAddress && this.address) {
            this.showContractDetails()
        }
    },
    methods: {
        async showContractDetails() {
            this.rpcInProgress = true
            let details = await web3Util.getContractDetails(this, this.address, this.walletContractAddress)
            this.contractDetails = details
            this.rpcInProgress = false
      },
      shortenReceiver(addr) {
          if(!addr) {
              return
          }
          return `${addr.substring(0,5)}....${addr.substring(addr.length-7,addr.length)}`
      },
      async copyToClipboard(text) {
            const { toClipboard } = useClipboard()
            await toClipboard(text)
      }
    }
}

</script>
