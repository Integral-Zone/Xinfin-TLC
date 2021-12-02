// SPDX-License-Identifier: MIT

pragma solidity ^0.4.24;

import "../interface/TokenInterface.sol";

/**
 * 
 * Contract to store the tokens (either LINK or PLI) and transfer it to the message sender.
 * 
 **/
contract Faucet {
    
    address private _tokenAddress;
    address private _owner;
    
    constructor(address tokenAddress) public {
        _tokenAddress = tokenAddress;
        _owner = msg.sender;
    }
    
    /**
    * Transfer 0.1 token (LINK or PLI) to the messge sender
    **/
    function transfer() public  {
        TokenInterface tokenInterface = TokenInterface(_tokenAddress);
        tokenInterface.transfer(msg.sender, 1 * 10 **18);
    }
    
    /**
    * Withdraw the complete token balance to sender's account
    **/
    function withdraw() public {
        TokenInterface tokenInterface = TokenInterface(_tokenAddress);
        tokenInterface.transfer(_owner, tokenInterface.balanceOf(address(this)));
    }
    
}