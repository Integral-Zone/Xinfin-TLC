<template>
<div class="sub-header header-ov">
    <div class="container">
        <div class="row text-white">
            <div class="col-md-6 col-sm-12  text-center">
                <h6 class="fs-4 mb-3 mt-3">Time Locked Smart Contracts</h6>
                <div class="mb-3" style="color: #e1f2ff">
                    <a href="/contract" class="btn btn-primary"><i class="bi bi-menu-up"></i> Create Smart Contract </a> 
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
            <img src="@/assets/images/time_locked_contract.png" class="img-fluid" alt="Time Locked Contract" style="width: 70%; height: auto">
        </div>
    </div>
    <loading v-model:active="rpcInProgress" :color="$loaderColor"/>
</div>

</template>

<script>

import Loading from 'vue-loading-overlay';
import Base from '@/components/common/Base'

export default {
    name: 'Home',
    extends: Base,
    components: {
        Loading
    }
}

</script>
