<template>
    <h6 v-if="contractDetails.isWithdrawn"><span class="badge bg-secondary">Withdrawn</span></h6> 
    <h6 v-else-if="!contractDetails.isLinkTransferred"><span class="badge bg-danger">Not Initiated</span></h6> 
    <h6 v-else-if="contractDetails.isReleased"><span class="badge bg-success">Released</span></h6> 
    <h6 v-else><span class="badge bg-warning text-dark">Pending</span></h6>
</template>

<script>

export default {
    name: 'ContractStatus',
    props: {
        contractDetails: Object
    }
}
</script>
