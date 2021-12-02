/**
 * Router file to load appropriate components based on the uri/path being accessed
 */
import { createRouter, createWebHistory } from 'vue-router'
import Web3 from 'xdc3'

import Contracts from '@/components/contract/Contracts.vue';
import Contract from '@/components/contract/Contract.vue';
import Faucet from '@/components/faucet/Faucet.vue';
import ContractDetails from '@/components/contract/ContractDetails.vue';
import Login from '@/components/landing/Login.vue';
import Home from '@/components/landing/Home.vue';

/**
 * Available paths/uri's in the application
 */
const routes = [
    { path: '/contracts', component: Contracts ,
        meta: {
            title: 'XDCSmartLock - Contracts'
        }
    },
    { path: '/contract', component: Contract,
        meta: {
            title: 'XDCSmartLock - New Smart Lock'
        }
     },
     { path: '/faucet', component: Faucet,
        meta: {
            title: 'XDCSmartLock - Faucet'
        }
     },
    { path: '/contract/:contract_address', component: Contract,
        meta: {
            title: 'XDCSmartLock - Edit Smart Lock'
        }
    },
    { path: '/contract/:contract_address/clone', component: Contract,
        meta: {
            title: 'XDCSmartLock - Clone'
        }
    },
    { path: '/contracts/:contract_address', component: ContractDetails ,
        meta: {
            title: 'XDCSmartLock - View Smart Lock'
        }
    },
    { path: '/login', component: Login ,    
        meta: {
            title: 'XDCSmartLock - Login'
        }
    },
    { path: '/', component: Home,
        meta: {
            title: 'XDCSmartLock - Home'
        }
    }
];

const router = createRouter({
    // Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
});


/**
 * Validate if user is loggedin to XDCPay before accessing any of the application pages
 * If user has not logged into XDCPay or has not installed XDCPay wallet page would be automatically redirected to /login
 */
// eslint-disable-next-line
router.beforeEach(async (to, from) => {
    document.title = to.meta.title
    
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