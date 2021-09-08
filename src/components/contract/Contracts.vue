<template>

    <SubHeader @searchAddress="searchAddress"></SubHeader>

    <div class="container bg-white mt-4 pt-4 mb-3 pb-4" v-if="contractAddress">
        <div class="">
            <figure>
            <blockquote class="blockquote">
                <h6 class="display-8">Contract <b>{{contractAddress}}</b></h6>
            </blockquote>
            </figure>
        </div>

        <ContractInfo :key="contractInfoKey" :walletContractAddress="contractAddress" :address="address" :networkId="networkId"></ContractInfo>
    </div>
    
    <div class="container bg-white mt-5 mb-5 pb-4">
        <ContractsList v-if="address" :address="address" :networkId="networkId" @recordUpdated="reloadTable" :key="listKey"></ContractsList>
    </div>
    <loading v-model:active="rpcInProgress" :color="$loaderColor"/>
</template>


<script>

import Loading from 'vue-loading-overlay';

import SubHeader from './SubHeader.vue';
import ContractsList from './ContractsList';
import ContractInfo from './ContractInfo';
import Base from '@/components/common/Base'

export default {
    name: 'Contracts',
    extends: Base,
    data() {
        return {
            contractAddress: '',
            contractInfoKey: 0,
            listKey: 0
        }
    },
    components: {
        SubHeader,
        ContractsList,
        Loading,
        ContractInfo
    },
    methods: {
      reloadTable() {
          this.listKey +=1 
      },
      async searchAddress(contractAddr) {
          this.contractAddress = contractAddr
          this.contractInfoKey+=1
      }
    }
}
</script>
