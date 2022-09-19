// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

contract CryptoMarket{

    struct ContractProperties{
        address CryptoMarketOwner;
        address[] registeredUserAdderss;
        mapping (address => bytes[][]) itemAndOwner;
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

    function buyitem(bytes[] memory item) public payable {
        
        

           
            contractProperties.itemAndOwner[msg.sender].push(item);
            
            
      
        
        
        
        

    }

    function getUserItems() public view  returns(bytes[][] memory) {
        
       return  contractProperties.itemAndOwner[msg.sender];

     }
    

    

    function getContractProperties() public view returns(address, address[] memory){

        return (contractProperties.CryptoMarketOwner, contractProperties.registeredUserAdderss);
    }


    
}