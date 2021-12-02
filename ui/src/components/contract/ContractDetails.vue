<template>
  <div class="sub-header">
    <div class="container text-center header-ov pt-4 pb-3 ">
        <figure class="text-white">
        <blockquote class="blockquote">
            XDC Smart Lock <h6 class="display-7"> <b>{{smartLockAddress}}</b> </h6>
        </blockquote>
        <figcaption class="blockquote-footer" style="color:#dfdfdf">
            Details of the funds locked up, receivers and status of the contract.
        </figcaption>
        </figure>
    </div>
  </div>
  <div class="sub-header1 pb-5 pt-3">
    <div class="container">
        <div class="row">
            <div class="col-9">
                <div class="card">
                <div class="card-body">
                        <div class="row bg-white">
                            <div class="col">
                                <div class="d-flex border p-2 border-start-0 border-end-0">
                                    <i class="bi bi-cash-coin info-icon"></i>
                                    <div class="info-text-area">
                                        <p class="mb-0 info-header"><strong>XDC AMOUNT LOCKED UP </strong></p>
                                        <p class="mb-0 info-value"><strong>{{contractDetails.xdc || '0'}} XDC</strong></p>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="d-flex border p-2 border-start-0 border-end-0">
                                    <i class="bi bi-diagram-3 info-icon" style="font-size: 2.3rem; color: cornflowerblue;"></i>
                                    <div class="info-text-area">
                                        <p class="mb-0 info-header"><strong>ORACLE NODE</strong></p>
                                        <p class="mb-0 info-value"><strong>{{contractDetails.nodeType ? contractDetails.nodeType : 'Not Initiated'}}</strong></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row bg-white pb-2">
                            <div class="col">
                                <div class="d-flex border p-2 border-start-0 border-0">
                                    <i class="bi bi-clock-history info-icon"></i>
                                    <div class="info-text-area">
                                        <p class="mb-0 info-header"><strong>XDC UNLOCK DATE</strong></p>
                                        <p class="mb-0 info-value"><strong>{{contractDetails.unlockDate || '--'}}</strong></p>
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
                </div>
                </div>
            </div>

            <div class="col">
                <div class="card text-white" style="background-color: #2196F3">
                    <div class="card-body">
                        <h5 class="card-title">Balance</h5>
                        <p class="card-text">{{xdcBalance}} XDC</p>
                    </div>
                </div>
                <div class="card mt-2">
                    <div class="card-body pb-2">
                        <h5 class="card-title">Status</h5>
                        <ContractStatus :contractDetails="contractDetails"></ContractStatus>
                    </div>
                </div>
            </div>
            
        </div>

        <div class="row mt-4">
            <div class="col">
                <h3 class="">Receivers</h3>
                <table class="xdc-table-light table table-borderless dt-responsive ">
                    <thead>
                        <tr>
                            <th>Receiver Address</th>
                            <th>XDC Alloted</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(receiver, index) in contractDetails.receivers" :key="index">
                            <td><strong><i class="bi bi-person-check-fill mr-3"></i> {{receiver || '--' }}</strong></td>
                            <td><strong> {{contractDetails.funds[index]}} XDC</strong></td>
                            <td>
                              <ContractStatus :contractDetails="contractDetails"></ContractStatus>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="row mt-4" v-if="contractDetails.statusInt == 0">
            <div class="col">
                <h3 class="mb-4">Actions</h3>
                <a v-if="contractDetails.unlockDateTS > now " :href="'/contract/'+contractDetails.walletAddress" type="button" class="btn btn-sm xdc-btn-primary" style="margin-right: 10px"> <i class="bi bi-folder-symlink"></i> Transfer Token</a>
                <button type="button" class="btn btn-sm xdc-btn-danger" @click="withdrawContract"><i class="bi bi-arrow-down-left-square-fill"></i> Withdraw</button>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col">
                <h3 class="">Clone</h3>
                <p>Clone this contract and create a new XDC Smart Lock with same set of receivers and locked up XDC </p>
                <a :href="'/contract/'+contractDetails.walletAddress+'/clone'" type="button" class="btn btn-sm xdc-btn-warning" style="margin-right: 10px"> <i class="bi bi-app-indicator"></i> Clone</a>
            </div>
        </div> 

        <div class="row mt-4">
            <div class="col text-center">
                <button type="button" class="btn btn-sm xdc-btn-secondary" @click="showContracts()"><i class="bi bi-x-circle"></i> Close</button>
            </div>
        </div>

    </div>      
  </div>
    <WithdrawContract :contractDetails="contractDetails" :networkId="networkId" :address="address" @withdrawn="updateContract"></WithdrawContract>
    <loading v-model:active="rpcInProgress" :color="$loaderColor"/>
</template>

<script>

/**
 * Component to display XDC Smart Lock information 
 */
import web3Util from '@/assets/js/web3-utility';
import Loading from 'vue-loading-overlay';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min.js'

import Base from "@/components/common/Base";
import ContractStatus from './ContractStatus';
import WithdrawContract from './WithdrawContract'

export default {
    
    name: 'ContractDetails',
    /**
     * Required data parameters to display the contract list
     */
    data() {
        return {
            rpcInProgress: false,
            contractDetails: {},
            smartLockAddress: '',
            xdcBalance: 0,
            now: new Date().getTime()
        }
    },

    extends: Base,
    /**
     * Properties to be sent by the importing contract 
     * 
     * smartLockAddress - Address of the smart contract contract 
     * address - Address of the user
     * networkId - Current network id selected in XDCPay
     */
    /**
    * Required components -
    * 
    * 1. Ajax loader with gif
    * 2. Contract status component, which displays the status of contract 
    */
    components: {
        Loading,
        ContractStatus,
        WithdrawContract
    },
     /**
     * Action to be performed on compoment load -
     * 
     * 1. Retrieves the contract details and displays the same
     */
    mounted() {
        this.smartLockAddress = this.$route.params.contract_address
        this.$watch("isInitialized", () => {
            this.init()
        })
    },
    methods: {
        /**
         * Retrieves the contract details and displays the same
         */
        async getContractDetails() {
            this.rpcInProgress = true
            let details = await web3Util.getContractDetails(this, this.address, this.smartLockAddress)
            this.contractDetails = details
            this.rpcInProgress = false
      },

    /**
     * Get the balance of the smart lock instance
     */
      async getBalance() {
          this.xdcBalance = await web3Util.getBalance(this, this.smartLockAddress)
      },

      /**
       * Initialize the contract details 
       **/  
      init() {
            this.getContractDetails()
            this.getBalance()
      },

      /**
       * Withdraw the XDC balance from contract to funder
       */
      withdrawContract() {        
            setTimeout(function() {
                var withdrwaModal = new Modal(document.getElementById('withdraw_contract_modal'), {})
                withdrwaModal.show()
            }, 500)
        },
      
      updateContract() {
          this.init()
      },

      showContracts() {
          window.history.back()
      }
    }
}

</script>
