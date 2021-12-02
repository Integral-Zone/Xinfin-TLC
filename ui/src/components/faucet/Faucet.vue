<template>
 <div class="container text-center header-ov pt-4 pb-3">
    <figure>
      <blockquote class="blockquote">
        <h6 class="display-7">Smart Lock Faucet</h6>
      </blockquote>
      <figcaption class="blockquote-footer">
        Get test LINK or PLI tokens for XDC Apothem network (Testnet)
      </figcaption>
    </figure>
  </div>

  <div class="sub-header pb-5 pt-5">
    <div class="container">

        <div class="row mt-4">
            <div class="col text-center">
                <h6 class="text-white">
                    <b>{{tokenType}}</b> tokens will be sent to your address <b>{{address}}</b>
                </h6>
            </div>
        </div> 

        <div class="row mt-3">
            <div class="col"></div>
            <div class="col-2">
                <select class="form-select" aria-label="Token Selection" v-model="tokenType">
                    <option value="Chainlink">LINK Token</option>
                    <option value="Plugin">PLI Token</option>
                </select>
            </div>
            <div class="col-2">
                <button :class="networkId == 51 ? '' : 'disabled'" class="btn xdc-btn-primary" v-if="tokenDetails[tokenType]" @click="transfer">Get 1 {{tokenDetails[tokenType].symbol}} token</button>
                <button :class="networkId != 51 ? 'disabled' : ''" class="btn xdc-btn-secondary" v-if="networkId != 51">Choose Apothem</button>
            </div>
            <div class="col"></div>
        </div>

        <div class="row mt-3">
            <div class="col text-center">
                <h6 class="text-white" v-if="tokenDetails[tokenType]">
                    Your current {{tokenType}} balance is <b>{{tokenDetails[tokenType].balance}} {{tokenDetails[tokenType].symbol}}</b>
                </h6>
            </div>
        </div> 

        <div class="row mt-4">
            <div class="col-3"></div>
            <div class="col text-white text-center1">
                    Steps to view test token balance in <b>XDCPay</b> wallet -
                    <ol class="list-group-numbered mt-2 display-10">
                        <li>Open XDCPay wallet, and click on <b>Tokens</b> tab </li>
                        <li>Click on <b>Add Token</b> </li>
                        <li v-for="nodeType in nodeTypes" v-bind:key="nodeType">
                            For {{nodeType}} token, token address is <b>{{tokenDetails[nodeType].address}}</b> symbol is <b>{{tokenDetails[nodeType].symbol}}</b> and decimals is <b>{{tokenDetails[nodeType].decimals}}</b> 
                        </li> 
                    </ol>
            </div>
        </div>    

    </div>
  </div>

    <loading v-model:active="rpcInProgress" :color="$loaderColor" />
</template>

<script>

import Base from '@/components/common/Base'

import web3Util from "@/assets/js/web3-utility";
import marketPrice from "@/assets/js/market-price";
import Loading from "vue-loading-overlay";
import common from "@/assets/js/common";

export default {
    name: 'Faucet',
    /**
   * Extend the base component to inherit following parameters - 
   * 
   * NetworkId - Network selected by the user in XDCPay
   * Address - Address of the user in XDC network 
   * XDC Balance - Total XDC balance
   * LINK token Balance - Total LINK token balance 
   * 
   */
    extends: Base,
    data() {
        return {
            tokenType: 'Chainlink',
            tokenDetails: {},
            nodeTypes: []
        }
    },
    components: {
        Loading
    },
    created() {
        this.$watch("isInitialized", () => {
            this.init()
        });
    },
    methods: {
        async init() {
             if(this.networkId != 51) {
                 return
             }

             this.rpcInProgress = true
             this.tokenDetails = await marketPrice.getTokenBalances(this, { address: this.address})
             this.rpcInProgress = false
             this.nodeTypes = Object.keys(this.tokenDetails) 
        },
        async transfer() {
            let vm = this
            this.rpcInProgress = true
            
            let faucet = await web3Util.transferTestTokens(this, this.tokenType)
            faucet.send({ from: this.address }, function (error, transactionHash) {
                if (error) {
                    vm.rpcInProgress = false;
                    return;
                }
                /**
                 * Wait till the block is created in Block Chain 
                 */
                web3Util.waitForReceipt(vm, transactionHash, async function (result) {
                if (result.error) {
                    /**
                     * In case of any error display the appropriate error
                     */
                    common.notifyError("Error transferring test tokens");
                    vm.rpcInProgress = false;
                    return;
                }
                /**
                 * Notify user with success message and progress the wizard to next step
                 */
                common.notifySuccess("Tokens transferred");
                    vm.init()
                });
            });
        }
    }
}

</script>

