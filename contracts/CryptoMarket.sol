// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

contract CryptoMarket{

    struct ContractProperties{
        address CryptoMarketOwner;
        address[] registeredUserAdderss;
    }
    
    mapping (address => bool) hasRegistered;
   
    ContractProperties contractProperties;

    function cryptomarket() public{
         
         contractProperties.CryptoMarketOwner = msg.sender;
    }

    function checkUserRegistration() public view returns(bool){
        return hasRegistered[msg.sender];
    }

    function registerUser() public {
        if (!hasRegistered[msg.sender]){
            hasRegistered[msg.sender] = true;
            contractProperties.registeredUserAdderss.push(msg.sender);
        }
    }

    
}