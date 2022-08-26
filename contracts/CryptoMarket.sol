// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;
import "@openzeppelin/contracts/utils/Strings.sol";

contract CryptoMarket{

    struct ContractProperties{
        address CryptoMarketOwner;
        address[] registeredUserAdderss;
        string[] items;
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

    function addItem(string memory item ) public  {
        string memory Item = item;
        string memory length = Strings.toString((bytes(item).length));
        address setter = msg.sender;
        string memory item_details = string.concat(Item,",",length,",",setter);
        contractProperties.items.push(item_details);
    }

    
}