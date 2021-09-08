<template>
<div>
<div class="">
   <figure>
  <blockquote class="blockquote">
     <h6 class="display-7">Recent Contracts</h6>
  </blockquote>
  <figcaption class="blockquote-footer">
     Most recent time locked contracts created from your address <b>{{address}}</b>
  </figcaption>
</figure>
</div>
    <table id="contracts" class="table table-striped dt-responsive ">
        <thead>
            <tr>
                <th>Contract Address</th>
                <th>XDC</th>
                <th>Created Date</th>
                <th>Unlock Date</th>
                <th>Receivers</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(contract, index)  in contracts"  :key="contract.walletAddress">
                <td>{{contract.walletAddress}}</td>
                <td>{{contract.xdc}}</td>
                <td>{{contract.createdDate}}</td>
                <td>{{contract.unlockDate}}</td>
                <td>
                    <button type="button" class="btn btn-sm btn-primary position-relative" @click="showReceivers(contract.receivers, contract.funds, contract.isReleased)">
                        View
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {{contract.receivers.length}}
                        </span>
                    </button>
                </td>
                <td>
                     <ContractStatus :contractDetails="contract"></ContractStatus>
                </td>
                <td>
                    <template v-if="!contract.isLinkTransferred && !contract.isWithdrawn">
                        <a :href="'/contract/'+contract.walletAddress" class="btn btn-sm" role="button" title="Transfer Link Token" style="font-size: 20px;"><i class="bi bi-folder-symlink"></i></a>
                        <a href="javascript:;" class="btn btn-sm" title="Withdraw XDC"  role="button" style="font-size: 18px;" @click="withdrawContract(contract, index)"><i class="bi bi-x-square"></i></a>
                    </template>
                    <span v-else>-</span>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="text-center mt-2">
        <button v-if="(this.size < this.wallets.length)" @click="loadMore" class="btn btn-sm btn-primary">Load More >></button>
        <span v-else class="fs-6">All contracts loaded</span>
    </div>    
    <loading v-model:active="rpcInProgress" :color="$loaderColor"/>

    <Receivers :receivers="receivers" :funds="funds" :key="receiversKey" :isReleased="isReleased"></Receivers>
    <WithdrawContract :contractDetails="contractDetails" :networkId="networkId" :address="address" @withdrawn="updateContract"></WithdrawContract>
</div>
</template>

<script>

import $ from 'jquery'
import web3Util from '@/assets/js/web3-utility'
import Loading from 'vue-loading-overlay';

import Receivers from './Receivers';
import ContractStatus from './ContractStatus'
import WithdrawContract from './WithdrawContract'

import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min.js'

export default {
    name: 'ContractsList',
    data() {
        return {
            wallets: [],
            rpcInProgress: false,
            contracts: [],
            records: 5,
            size: 0,
            datatable: {},
            receivers: [],
            funds: [],
            isReleased: false,
            receiversKey: 0,
            index: 0,
            contractDetails: {}
        }
    },
    mounted() {
        this.load()    
    },
    props: {
        address: String,
        networkId: Number
    },
    components: {
        Loading,
        Receivers,
        ContractStatus,
        WithdrawContract
    },
    methods: {
        initDataTable() {
            this.datatable = $('#contracts').DataTable({
                "aoColumns": [
                    null,
                    null,
                    { "sType": "date-tlc" },
                    null,
                    null,
                    null,
                    null
                ],
                "bLengthChange": false,
                "bInfo": false,
                "bPaginate": true,
                "destroy": true,
                responsive: true,
                "order": [[ 2, "desc" ]]
         });
        },
        updateContract() {
            this.$emit('recordUpdated')
        },
        async load() {
            this.initDataTable()
            await this.getContracts()
            this.getContractDetails()
        },
        async getContracts() {
            this.wallets = await web3Util.getWallets(this, this.address)
        },
        async getContractDetails() {
            this.rpcInProgress = true
            let contractDetails = []

            let start = this.wallets.length - this.size
            let end = start - this.records

            if(end > this.wallets.length) {
                end = this.size = this.wallets.length
            }

            if(end < 0) {
                end = 0
            }

            for(let i=(start-1); i >= end ;i--) {
                let contractDetail = await web3Util.getContractDetails(this, this.address, this.wallets[i])
                contractDetail.walletAddress = this.wallets[i]
                contractDetails.push(contractDetail)
            }

            $('#contracts').DataTable().destroy()
            this.contracts.push(...contractDetails)
            let vm = this
            setTimeout(function() {
                vm.initDataTable()
            }, 1000)
            this.rpcInProgress = false
        },
        async loadMore() {
            this.size += this.records
            this.getContractDetails()
        },
        withdrawContract(contractDetail, index) {
            this.contractDetails = contractDetail
            this.index = index
            setTimeout(function() {
                var myModal = new Modal(document.getElementById('withdraw_contract_modal'), {})
                myModal.show()
            }, 500)
        },
        showReceivers(receivers, funds, isReleased) {
            this.receivers = receivers
            this.funds = funds
            this.receiversKey+=1
            this.isReleased = isReleased
            setTimeout(function() {
                var myModal = new Modal(document.getElementById('receivers_modal'), {})
                myModal.show()
            }, 500)
            
        }
    }
}
</script>
