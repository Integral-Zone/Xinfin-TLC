import { createRouter, createWebHistory } from 'vue-router'
import Web3 from 'xdc3'

import Contracts from '@/components/contract/Contracts.vue';
import Contract from '@/components/contract/Contract.vue';
import Login from '@/components/landing/Login.vue';
import Home from '@/components/landing/Home.vue';

const routes = [
    { path: '/contracts', component: Contracts },
    { path: '/contract', component: Contract },
    { path: '/contract/:contract_address', component: Contract },
    { path: '/login', component: Login },
    { path: '/', component: Home }
];

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
});

// eslint-disable-next-line
router.beforeEach(async (to, from) => {

    let isLoggedIn = false
    try {
        if (window.ethereum) {
            let web3 = new Web3(window.ethereum);
            let accounts = await web3.eth.getAccounts();
            isLoggedIn = accounts.length
        }
    }catch(err)  {
        console.log(err)
    }

    if(isLoggedIn) {
        if (to.fullPath === '/login') {
            return '/'    
        }else {
            return true
        }
    }else if(!isLoggedIn) {
        if (to.fullPath === '/login') {
            return true
        }else {
            return '/login'
        }
    }
})
  

export default router