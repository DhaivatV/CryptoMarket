// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

contract CryptoMarket{

    struct ContractProperties{
        address CryptoMarketOwner;
        address[] registeredUserAdderss;
        mapping (address => string[]) itemAndOwner;
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

    function buyitem(string[2] memory item) public payable {
        
        for (uint i=0; i<item.length; i++){

           
            contractProperties.itemAndOwner[msg.sender].push(item[i]);
            
            
        }
        
        
        
        

    }

    function getUserItems() public view  returns(string[] memory) {
        
       return  contractProperties.itemAndOwner[msg.sender];

     }
    

    

    function getContractProperties() public view returns(address, address[] memory){

        return (contractProperties.CryptoMarketOwner, contractProperties.registeredUserAdderss);
    }


    
}