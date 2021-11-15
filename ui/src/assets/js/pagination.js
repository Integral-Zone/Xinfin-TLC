import web3Util from '@/assets/js/web3-utility'


/**
 * 
 * Get the SmartLocks based on the datatable start/offset and length/limit
 * 
 * @param {*} data -  Datatable start and length settings
 * @param {*} callback - Datatable callback once the records are retrieved
 * @param {*} settings - Datatable settings
 * @param {*} vm 
 * @param {*} total - Total Smart Lock instances
 * @returns 
 */
async function paginate(data, callback, settings, vm, total) {

   vm.rpcInProgress = true
   let smartLockDtails = []
   if(total <= 0) {
      vm.rpcInProgress = false
      return smartLockDtails;
   }

   let recordsLimit = getRecodsLimits(data, total)
   let from = recordsLimit[0]
   let to = recordsLimit[1]

   let smartLocks = await web3Util.getSmartLocks(vm, vm.address, from, to)

    for(let smartLock of smartLocks) {
      let contractDetail = await web3Util.getContractDetails(vm, vm.address, smartLock)
      smartLockDtails.push(contractDetail)
    }
    vm.rpcInProgress = false

      callback({
        recordsTotal: total,
        recordsFiltered: total,
        data: smartLockDtails
      })
}

/**
 * Calculate the limit and offset
 **/
function getRecodsLimits(data, total) {
  
  let from = total - data.start
  let to = from - data.length 

  if(to < 0) {
   to = 0
  }
  return [from, to]
}


/**
 * Export all the functions
 */
 export default {
    paginate,
    getRecodsLimits
}