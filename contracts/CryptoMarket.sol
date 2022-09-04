// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

contract CryptoMarket{

    struct ContractProperties{
        address CryptoMarketOwner;
        address[] registeredUserAdderss;
        string[] soldItems;
    }

    
    
    mapping (address => bool) hasRegistered;
    mapping (address => bool) bought;
    
   
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

    // function buyItem() public   {

    //     // address owner = msg.sender;
    //     // userItem[owner]  = item;
    //     // txnHash[owner] = txn_hash;
    //     // bool sold = true;
        

    // }

    function BuyItem() public {
        // if (!hasRegistered[msg.sender]){
        //     hasRegistered[msg.sender] = true;
        //     contractProperties.registeredUserAdderss.push(msg.sender);
        bought[msg.sender] = true;

        
        
    }

    function getContractProperties() public view returns(address, address[] memory){

        return (contractProperties.CryptoMarketOwner, contractProperties.registeredUserAdderss);
    }


    
}