<template>
  <div class="container text-center header-ov pt-4 pb-3">
    <figure>
      <blockquote class="blockquote">
        <h6 class="display-7">Create Time Locked Smart Contract</h6>
      </blockquote>
      <figcaption class="blockquote-footer">
        Specify an amount of XDC to be locked up, a date and time at which the
        locked XDC will be released, and an address for the released XDC to be
        sent to.
      </figcaption>
    </figure>
  </div>
  <div class="sub-header pb-5 pt-5">
    <div class="container">
      <div id="create_contract" class="create-contract">
        <ul class="nav">
          <li>
            <a class="nav-link" href="#step-1"> Transfer XDC </a>
          </li>
          <li>
            <a class="nav-link" href="#step-2"> Initiate Chainlink Job </a>
          </li>
          <li>
            <a class="nav-link" href="#step-3"> Contract Details </a>
          </li>
        </ul>

        <div class="tab-content">
          <div id="step-1" class="tab-pane" role="tabpanel">
            <form id="step_form_0">
              <!-- <div class="row">
              <div class="col text-center text-white pb-4">
                <small> Amount of XDC to transfer to Time Locked Smart Contract from your account. Once the time is elapsed, XDC will be transferred back to receiver's address. </small>
              </div>
            </div> -->
              <div class="row">
                <div class=".d-none .d-md-block .d-lg-none col-md-2"></div>
                <div class="col-sm-12 col-md-8">
                  
                  <div class="row">
                      <div class="col-md-6 col-sm-12">
                          <DatePicker v-model="date" mode="date" :min-date='new Date()'>
                            <template v-slot="{ inputValue, inputEvents }">
                              <label class="form-label contract-inp-header">XDC Unlock Date</label
                            >
                            <div class="input-group">
                            <input
                              class="form-control"
                              :value="inputValue"
                              v-on="inputEvents"
                            />
                             <span class="input-group-text">
                               <i class="bi bi-calendar-check"></i>
                             </span>
                            </div>
                             <div
                              class="form-text mb-3 contract-inp-help"
                            >
                              Select XDC unlock date
                            </div>
                          </template>
                          </DatePicker>

                      </div>
                      <div class="col-md-6 col-sm-12">
                          <DatePicker v-model="date" mode="time" :min-date='new Date()'>
                            <template v-slot="{ inputValue, inputEvents }">
                              <label class="form-label contract-inp-header">XDC Unlock time</label>
                            <div class="input-group">
                            <input
                              class="form-control"
                              :value="inputValue"
                              v-on="inputEvents"
                            />
                             <span class="input-group-text">
                               <i class="bi bi-clock"></i>
                             </span>
                            </div>
                             <div
                              class="form-text mb-3 contract-inp-help"
                            >
                              Select XDC unlock time
                            </div>
                          </template>
                          </DatePicker>

                      </div>
                  </div>

                  <h6 class="text-white text-center mb-3 mt-4 fs-5">
                    Enter the amount of XDC to be allocated to each receiver. Your current balance is <b>{{ data.balance }}</b> XDC
                  </h6>
                  <div
                    class="row"
                    v-for="(target, index) in data.targets"
                    :key="index"
                  >
                    <div class="col-md-8 col-sm-12">
                      <label class="form-label contract-inp-header"
                        >Receiver</label
                      >
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="xdc29ac7...."
                          required
                          v-model="target.receiver"
                        />
                      </div>
                      <div
                        id="emailHelp"
                        class="form-text mb-3 contract-inp-help"
                      >
                        XDC address of the receiver
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-12">
                      <label class="form-label contract-inp-header"
                        >XDC to transfer</label
                      >
                      <div class="input-group">
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Enter XDC value"
                          required
                          v-model="target.xdc"
                          min="0"
                          step="0.00000001"
                        />
                        <span v-if="data.targets.length != index + 1" class="input-group-text">XDC</span>
                        <button
                          v-if="data.targets.length > 1"
                          type="button"
                          class="btn btn-danger"
                          @click.stop="removeReceiver(index)"
                          style="margin-left: 5px"
                        >
                          <i class="bi bi-dash-lg"></i>
                        </button>
                        <button
                          v-if="data.targets.length == index + 1"
                          type="button"
                          class="btn btn-success"
                          @click.stop="addReceiver"
                          style="margin-left: 5px"
                        >
                          <i class="bi bi-plus-lg"></i>
                        </button>
                      </div>
                      <div
                        id="emailHelp"
                        class="form-text mb-3 contract-inp-help"
                      >
                        Amount of XDC to transfer to the receiver
                      </div>
                    </div>
                  </div>
                  <h6 class="text-white text-center mt-3 fs-6">
                    ** Total of <b>{{ lockedupXDC }}</b> XDC will be locked up
                    in time locked smart contract. Click on proceed to transfer
                    XDC
                  </h6>
                </div>
                <div class=".d-none .d-md-block .d-lg-none col-md-2"></div>
              </div>
            </form>
          </div>
          <div id="step-2" class="tab-pane" role="tabpanel">
            <form id="step_form_1">
              <div class="row">
                <div class=".d-none .d-md-block .d-lg-none col-md-2"></div>
                <div class="col-sm-12 col-md-8 text-center">
                  <label class="form-label contract-inp-header">Transfer LINK token to initiate the Chainlink job. Your current balance is <b>{{ data.linkBalance }} LINK </b>.</label>
                  <label class="form-label contract-inp-header">By proceeding <b>0.1 LINK</b> token will be transferred to the Time Locked Contract at address <b>{{data.walletContractAddress}}</b>.</label>
                </div>
                <div class=".d-none .d-md-block .d-lg-none col-md-2"></div>
              </div>
            </form>
          </div>
          <div id="step-3" class="tab-pane" role="tabpanel">
            <form id="step_form_3"></form>
            <ContractInfo
              :key="showContractDetailsKey"
              :walletContractAddress="data.walletContractAddress"
              :address="data.address"
              :networkId="data.networkId"
            ></ContractInfo>
          </div>
        </div>
      </div>
    </div>
  </div>

  <loading v-model:active="rpcInProgress" :color="$loaderColor" />
</template>

<script>
import $ from "jquery";
import "smartwizard/dist/css/smart_wizard_all.min.css";
import "smartwizard/dist/js/jquery.smartWizard.min.js";
import Loading from "vue-loading-overlay";

import web3Util from "@/assets/js/web3-utility";
import common from "@/assets/js/common";

import ContractInfo from "./ContractInfo";
import Base from "@/components/common/Base";
import { DatePicker } from 'v-calendar';

export default {
  name: "Contact",
  extends: Base,
  data() {
    return {
      data: {
        address: "",
        balance: 0,
        linkBalance: 0,
        link: 0.1,
        duration: 0,
        walletContractAddress: "",
        targets: [{ xdc: 0.000001, receiver: '0x39D3A9Ac73C885EF6AE3751C06eE6616F32d3Edf' }],
      },
      date: new Date(),
      contractDetails: {},
      showContractDetailsKey: 0,
      wizardConfig: {
        selected: 0,
        autoAdjustHeight: false,
        theme: "dots",
        justified: true,
        enableURLhash: false,
        lang: {
          // Language variables for button
          next: "Proceed",
        },
        keyboardSettings: {
          keyNavigation: false, // Enable/Disable keyboard navigation(left and right keys are used if enabled)
        },
        anchorSettings: {
          anchorClickable: false,
        },
        toolbarSettings: {
          toolbarPosition: "bottom", // none, top, bottom, both
          toolbarButtonPosition: "center", // left, right, center
          showPreviousButton: false,
          toolbarExtraButtons: [
            $(
              '<a href="/contracts" class="btn btn-info sw-btn-group-extra d-none">Close</a>'
            ),
          ],
        },
      },
    };
  },
  mounted() {
    this.initWizard();
  },
  components: {
    Loading,
    ContractInfo,
    DatePicker,
  },
  computed: {
    lockedupXDC() {
      return this.data.targets.reduce((total, target) => {
        return total + target.xdc;
      }, 0);
    },
  },
  created() {
    this.$watch("isInitialized", () => {
      this.data.address = this.address;
      this.data.balance = this.xdc;
      this.data.linkBalance = this.link;
      this.data.networkId = this.networkId;
      this.loadContract()
    });
  },
  methods: {
    async loadContract() {
      this.data.walletContractAddress = this.$route.params.contract_address
      if(!this.data.walletContractAddress) {
          return
      }
      this.rpcInProgress = true
      this.contractDetails = await web3Util.getContractDetails(this, this.data.address, this.data.walletContractAddress)
      
      this.progressWizard();
    },
    addReceiver() {
      this.data.targets.push({ xdc: 0.000001, receiver: "" });
    },
    removeReceiver(index) {
      this.data.targets.splice(index, 1);
    },
    initWizard() {
      $("#create_contract").smartWizard(this.wizardConfig);
      const vm = this;

      // eslint-disable-next-line
      $("#create_contract").on("showStep", function (e, anchorObject, stepIndex, stepDirection) {
          
          if (stepIndex == 1) {
            $(".sw-btn-group-extra").removeClass("d-none");
            $(".button.sw-btn-next").addClass("d-none");

            vm.showContractDetailsKey += 1;
          }
        }
      );

      // eslint-disable-next-line
      $("#create_contract").on("leaveStep", function (e, anchorObject, currentStepIndex, nextStepIndex, stepDirection) {
          if (stepDirection === "backward" || vm.rpcInProgress) {
            return true;
          }

          if(vm.data.walletContractAddress && currentStepIndex === 0) {
            return true;
          }

          let isFormValid = $(`#step_form_${currentStepIndex}`)[0].reportValidity();

          if (!isFormValid) {
            return false;
          }

          vm.initiateTransaction(currentStepIndex);
          return false;
        }
      );
    },
    async initiateTransaction(step) {
      switch (step) {
        case 0:
          this._transferXDC();
          break;
        case 1:
          this._transferLinkToken();
          break;
        default:
          console.log("Invalid Step ", step);
      }
    },
    progressWizard() {
      $("#create_contract").smartWizard("next");
      this.rpcInProgress = false;
    },

    async _transferXDC() {

      var xdc = this.$web3js.utils.toWei(this.lockedupXDC + "", "ether");
      let lockDuration = (this.date.getTime() - new Date().getTime())/1000
      this.data.duration = parseInt(lockDuration)

      if(this.data.duration < 60) {
        common.notifyError("Select valid date and time to unlock XDC")
        return
      }

      var tlw = await web3Util.transferXDC(this, this.data);
      this.rpcInProgress = true;
      const vm = this;
      try {
        tlw.send({ from: this.data.address, value: xdc }, function (error, transactionHash) {
            if (error) {
              vm.rpcInProgress = false;
              return;
            }
            web3Util.waitForReceipt(vm, transactionHash, async function (result) {
              if (result.error) {
                common.notifyError("Error transferring XDC to contract");
                vm.rpcInProgress = false;
                return;
              }
              var wallets = await web3Util.getWallets(vm, vm.data.address);
              vm.data.walletContractAddress = wallets[wallets.length - 1];

              common.notifySuccess("XDC transferred to contract");
              vm.progressWizard();
            });
          }
        );
      }catch(err) {
        console.log(err)
        this.rpcInProgress = false;
        common.notifyError('Error creating contract. Please check if receivers are valid')
      }
      
    },
    async _transferLinkToken() {
      var linkRpc = await web3Util.transferLinkToken(this, this.data);
      this.rpcInProgress = true;
      const vm = this;
      linkRpc.send(
        { from: this.data.address },
        function (error, transactionHash) {
          if (error) {
            common.notifyError("Error transferring LINK token to contract");
            vm.rpcInProgress = false;
            return;
          }
          web3Util.waitForReceipt(vm, transactionHash, async function (result) {
            if (result.error) {
              common.notifyError("Error transferring LINK token to contract");
              vm.rpcInProgress = false;
              return;
            }
            common.notifySuccess("LINK token transferred to contract");
            vm.progressWizard();
          });
        }
      );
    },
  },
};
</script>
