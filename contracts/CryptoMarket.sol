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

    // function buyItem(string memory item, address payable _to ) public payable returns(bool result, address addr, data)  {
    //     address owner = msg.sender;
    //     (bool sent, bytes memory data) = _to.call{value: msg.value}("");
    //     require(sent, "Failed to send Ether");
    //     if (sent){
    //         item = userItem[owner];
    //         contractProperties.soldItems.push(item);
    //         result = true;
    //         return (result, owner, data);
    //     }

    //     else{
    //         result= false;
    //         return (result, _to, data);
    //     }
        
    // }

    function getContractProperties() public view returns(address, address[] memory){

        return (contractProperties.CryptoMarketOwner, contractProperties.registeredUserAdderss);
    }


    
}