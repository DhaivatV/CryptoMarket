// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

contract CryptoMarket{

    struct ContractProperties{
        address CryptoMarketOwner;
        address[] registeredUserAdderss;
        string[] soldItems;
    }
    
    mapping (address => bool) hasRegistered;
    mapping (address => string) userItem;
    mapping (address => string) txnHash;
   
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

    function buyItem(string memory item, string calldata txn_hash ) public payable returns(bool )  {

        address owner = msg.sender;
        userItem[owner]  = item;
        txnHash[owner] = txn_hash;
        bool sold = true;
        return sold;

    }

    function getContractProperties() public view returns(address, address[] memory){

        return (contractProperties.CryptoMarketOwner, contractProperties.registeredUserAdderss);
    }


    
}