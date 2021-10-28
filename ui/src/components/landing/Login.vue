<template>
    <div class="sub-header">
        <div class="container header-ov pb-5">
        <div class="row bg-white">
            <div class="col-md-6 col-sm-12 pt-5">
                <h6 class="fs-5 mb-5"><b>Login to XDCPay to create XDC Smart Lock</b></h6>
                <ol>
                    <li><p class="fs-6">Install XDCPay extension if not installed already. <a target="_blank" href="https://chrome.google.com/webstore/detail/xdcpay/bocpokimicclpaiekenaeelehdjllofo?hl=en">Install XDCPay</a> </p></li>
                    <li><p class="fs-6">Click on the XDCPay extension and login with your password</p>  </li>
                    <li><p class="fs-6">Once logged in to XDCPay, click on <b>Access XDCPay</b> below </p>  </li>
                </ol>
                <div class="text-center">
                    <a href="/" class="btn btn-sm btn-primary">Access XDCPay & Create XDC Smart Lock</a>
                </div>
                <p class="mt-5 fs-6">
                    <i>
                        <b>XDCPay Browser Extension</b> <br>
The XDCPay is an extension for accessing XDC's XDPoS enabled distributed applications, or "Dapps" in your browser! 
<br>
<br>
The extension injects the XDC's XDPoS web3 API into every website's javascript context, so that dapps can read from the blockchain.
<br>
<br>
The XDCPay extension also lets the user create and manage their own identities (via private keys, local client wallet), so when a Dapp wants to perform a transaction and write to the blockchain,
                    </i>
                </p>
            </div>
            <div class="col-md-6 col-sm-12 text-center">
                <img src="@/assets/images/login.gif" style="height: auto; width: 70%" class="mt-5">
            </div>
        </div>
    </div>
    </div>
</template>

<script>

/**
 * Component to display the login screen with XDCPay installation instructions.
 * This screen will be displayed only if either XDCPay is not installed or if the user has not logged into XDCPay 
 */
export default {
    name: 'Login'
}

</script>
