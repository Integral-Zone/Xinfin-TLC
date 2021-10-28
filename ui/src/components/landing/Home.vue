<template>
<div class="sub-header header-ov">
    <div class="container">
        <div class="row text-white">
            <div class="col-md-6 col-sm-12  text-center">
                <h6 class="fs-4 mb-3 mt-3">XDC Smart Lock</h6>
                <div class="mb-3" style="color: #e1f2ff">
                    <a href="/contract" class="btn btn-primary"><i class="bi bi-menu-up"></i> Create Smart Lock </a> 
                </div>
            </div>
            <div class="col-md-3 col-sm-12 text-center">
                <h6 class="fs-4 mb-3 mt-3">XDC Balance</h6>
                <p>{{xdc || 0 }} XDC</p>
            </div>
            <div class="col-md-3 col-sm-12 text-center">
                <h6 class="fs-4 mb-3 mt-3">LINK Token Balance</h6>
                <p class="">{{link || 0}} LINK</p>
            </div>
        </div>
    </div>
</div>
<div class="container">
    <div class="row mt-4 mb-5">
        <div class="col text-center">
            <img src="@/assets/images/xdc_smart_lock_overview.png" class="img-fluid" alt="XDC Smart Lock Overview" style="width: 70%; height: auto">
        </div>
    </div>
    <loading v-model:active="rpcInProgress" :color="$loaderColor"/>
</div>

</template>

<script>

/**
 * Component to display the XDC Smart Lock use case flow along with -
 * 1. User's current XDC balance based on the network selected in XDCPay
 * 2. User's current LINK token balance based on the network selected in XDCPay
 */
import Loading from 'vue-loading-overlay';
import Base from '@/components/common/Base'

export default {
    name: 'Home',
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
     /**
     * Required components -
     * 
     * 1. Ajax loader with gif
     */
    components: {
        Loading
    }
}

</script>
