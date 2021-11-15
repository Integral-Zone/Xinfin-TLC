<template>
<div>
<div class="">
   <figure>
  <blockquote class="blockquote">
     <h6 class="display-7">Recent Contracts</h6>
  </blockquote>
  <figcaption class="blockquote-footer">
     Most recent Smart Locks created from your address <b>{{address}}</b>
  </figcaption>
</figure>
</div>
    <table id="contracts" class="table table-striped dt-responsive ">
        <!-- <thead>
            <tr>
                <th>Smart Lock Address</th>
                <th>XDC</th>
                <th>Created Date</th>
                <th>Unlock Date</th>
                <th>Node</th>
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
                <td>{{contract.nodeType}}</td>
                <td>
                    <button type="button" class="btn btn-sm btn-primary position-relative" @click="showReceivers(contract)">
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
                    <template v-if="contract.statusInt == 0">
                        <a :href="'/contract/'+contract.walletAddress" class="btn btn-sm" role="button" title="Transfer Link Token" style="font-size: 20px;"><i class="bi bi-folder-symlink"></i></a>
                        <a href="javascript:;" class="btn btn-sm" title="Withdraw XDC"  role="button" style="font-size: 18px;" @click="withdrawContract(contract, index)"><i class="bi bi-x-square"></i></a>
                    </template>
                    <span v-else>-</span>
                </td>
            </tr> 
        </tbody> -->
    </table>
    <!-- <div class="text-center mt-2">
        <button v-if="(this.size < this.wallets.length)" @click="loadMore" class="btn btn-sm btn-primary">Load More >></button>
        <span v-else class="fs-6">All contracts loaded</span>
    </div>     -->
    <loading v-model:active="rpcInProgress" :color="$loaderColor"/>

    <Receivers :contractDetails="contractDetails" :key="receiversKey" ></Receivers>
    <WithdrawContract :contractDetails="contractDetails" :networkId="networkId" :address="address" @withdrawn="updateContract"></WithdrawContract>
</div>
</template>

<script>

/**
 * Component to display the list of contracts created by the logged in user. Provides following actions for each contract only if LINK token is not transferred - 
 * 
 * 1. Transfer LINK token 
 * 2. Withdraw Contract or XDC from contract
 * 
 */
import $ from 'jquery'
import web3Util from '@/assets/js/web3-utility'
import pagination from '@/assets/js/pagination'
import Loading from 'vue-loading-overlay';

import Receivers from './Receivers';
// import ContractStatus from './ContractStatus'
import WithdrawContract from './WithdrawContract'

import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min.js'

export default {
    name: 'ContractsList',
     /**
     * Required data parameters to display list of contracts
     */
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
            status: '',
            receiversKey: 0,
            tableConfig: {
                displayStart: 0,
                pageLength: 5,
            },
            index: 0,
            totalSmartLocks: 0,
            contractDetails: {}
        }
    },
    /**
     * Action to be performed on compoment load -
     * 
     * 1. Retrieves the contracts created by logged in user
     */
    mounted() {
        this.load()    
    },
    /**
     * Properties to be sent by the importing contract 
     * 
     * address - Address of the user
     * networkId - Current network id selected in XDCPay
     */
    props: {
        address: String,
        networkId: Number
    },
     /**
     * Required components -
     * 
     * 1. Ajax loader with gif
     * 2. Receivers modal component - to display the list of receivers and corresponding XDC
     * 3. Contract status component - displays the status of contract 
     * 4. Withdraw component modal - a confirmation modal 
     */
    components: {
        Loading,
        Receivers,
        // ContractStatus,
        WithdrawContract
    },
    methods: {
        /**
         * Function to initialize the datable with appropriate sort, search and pagination settings
         */
        initDataTable() {
            let vm = this
            this.datatable = $('#contracts').DataTable({
                columns: [
                    {
                        title: 'Address',
                        data: 'walletAddress',
                        render: function(cell, type, data) {
                            return `<a href="/contracts/${data.walletAddress}">${data.walletAddress}</a>`
                        }
                    },
                    {
                        title: 'XDC',
                        data: 'xdc',
                    },
                    {
                        title: 'Created Date',
                        data: 'createdDate',
                        render: function(cell, type, data) {
                            return ` <span title="${data.createdDateFrmt}">${data.createdDate}</span>`
                        }
                    },
                    {
                        title: 'Unlock Date',
                        data: 'unlockDate',
                        render: function(cell, type, data) {
                            return ` <span title="${data.unlockDateFrmt}">${data.unlockDate}</span>`
                        }
                    },
                    {
                        title: 'Node',
                        data: 'createdDate',
                        render: function(cell, type, data) {
                            return `${data.nodeType ? data.nodeType : '-'}`
                        }
                    },
                    {
                        title: 'Receivers',
                        data: 'walletAddress',
                        render: function(cell, type, data) {
                            return ` <h6><span class="badge badge-blue">${data.receivers.length}</span></h6></span>`
                        }
                    },
                    {
                        title: 'Status',
                        data: 'status',
                        render: function(cell, type,data) {
                            return `<h6><span class="badge status-${data.statusInt}">${data.status}</span></h6> `
                        }
                    }
                ],
                "bLengthChange": false,
                serverSide: true,
                "bInfo": true,
                searching: false,
                "bPaginate": true,
                "destroy": true,
                pageLength: vm.tableConfig.pageLength,
                displayStart: vm.tableConfig.displayStart,
                responsive: true,
                "ordering": false,
                "order": [[ 2, "desc" ]],
                ajax: vm.paginate
         });
        },
        paginate(data, callback, settings) {
            pagination.paginate(data, callback, settings, this, this.totalSmartLocks)

            if(this.totalSmartLocks > 0) {
                let newUrl = `${window.location.pathname}?s=${data.start}`
                window.history.pushState(null,'', newUrl)
            }
        },
        updateContract() {
            this.$emit('recordUpdated')
        },
        /**
         * 1. Load the list of contracts created by logged in user 
         * 2. For each contract address retrieve the contract details (i.e. receivers and corresponding XDC, total LINK tokens etc)
         */
        async load() {
            this.totalSmartLocks = await web3Util.getTotalSmartLocks(this, this.address)
            this.tableConfig.displayStart = this.$route.query.s ? parseInt(this.$route.query.s) : 0 
            this.initDataTable()
            // await this.getContracts()
            // this.getContractDetails()
        },
        /**
         * Function to withdraw XDC from contract to user's wallet.
         * This option will be applicable only if LINK token is not transferred to the contract
         */
        withdrawContract(contractDetail, index) {
            this.contractDetails = contractDetail
            this.index = index
            setTimeout(function() {
                var myModal = new Modal(document.getElementById('withdraw_contract_modal'), {})
                myModal.show()
            }, 500)
        },
        /**
         * Display the list of receivers and corresponding XDC.
         * The results will be displayed in a modal as it would be cleaner to display it in a modal rather than in the data table
         */
        showReceivers(contractDetail) {
            this.contractDetails = contractDetail
            this.receiversKey+=1
            setTimeout(function() {
                var myModal = new Modal(document.getElementById('receivers_modal'), {})
                myModal.show()
            }, 500)
            
        }
    }
}
</script>
