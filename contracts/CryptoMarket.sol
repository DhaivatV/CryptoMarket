// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

contract CryptoMarket{

    struct ContractProperties{
        address CryptoMarketOwner;
        address[] registeredUserAdderss;
        string[] itemsSold;
    }

    
    
    mapping (address => bool) hasRegistered;
    mapping (address => string) bought;
    
   
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

    function buyitem(string[] memory item) public {
        address owner = msg.sender;
        uint arr_len = item.length;
        for(uint i=0; i<=arr_len; i++ ){
            contractProperties.itemsSold.push(item[i]);
            bought[owner] = item[i];
        }
        
        

    }
    

    

    function getContractProperties() public view returns(address, address[] memory){

        return (contractProperties.CryptoMarketOwner, contractProperties.registeredUserAdderss);
    }


    
}