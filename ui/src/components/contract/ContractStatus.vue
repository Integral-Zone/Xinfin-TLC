<template>
    <h6><span :class="'badge status-'+contractDetails.statusInt">{{contractDetails.status}}</span></h6> 
</template>

<script>

/**
 * Component to derrive the contract status. Status is derrived based on following conditions - 
 * 
 * 1. withdrawn - If XDX is withdrawn from the contract
 * 2. Not Initiated - If LINK token is not transferred to the contarct
 * 3. Released - If allocated XDC is released to all receivers
 * 4. Pending - If XDC is still not released to the receivers 
 * 
 */
export default {
    name: 'ContractStatus',
    props: {
        contractDetails: Object
    }
}
</script>
