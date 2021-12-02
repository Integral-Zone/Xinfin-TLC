<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top">
    <div class="container">
      <a class="navbar-brand" href="/">
        <img src="@/assets/images/xdc-logo.png" class="logo" alt="XDC" />
        <b><span class="display-9" style="color: #21325b">Beta</span></b>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active menu-font" aria-current="page" href="/">Home</a>
          </li>
          <li class="nav-item" v-if="isApothem">
            <a class="nav-link menu-font" href="/contracts">Smart Locks</a>
          </li>
           <li class="nav-item" v-if="isApothem">
            <a class="nav-link menu-font" href="/faucet">Faucet</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script>

import common from "@/assets/js/common";

/**
 * Common header component for all screens
 */
export default {
  name: "Header",
  data() {
    return {
      networkId: 0
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    isApothem() {
      return common.isApothem(this.networkId)
    }
  },
  methods: {
    async init() {
      if(!this.$web3js) {
          return
      }
      this.networkId = await this.$web3js.eth.net.getId() 
    }
  }
};
</script>
