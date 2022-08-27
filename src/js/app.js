App = {

    web3Provider: null,
    contracts: {},

    init: function(){
        return App.initWeb3();
    },

    

    initWeb3 : async function(){

        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        document.getElementById("ethereum_account").innerHTML = accounts;
        return App.initFetchBalance();
    },

    initFetchBalance : async function(){
        var account  = document.getElementById("ethereum_account").innerHTML ;
        balanceInWei =await  window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']}) ;
        balance = ethers.utils.formatEther(balanceInWei)
        document.getElementById("_mybalance").innerHTML = balance+"  Ethers";
        return App.initContract();
    },

    initContract: function(){
        $.getJSON('CryptoMarket.json', function(CryptoMarketArtifact) {
            App.contracts.CryptoMarket = TruffleContract(CryptoMarketArtifact);
            
            // Set the provider for our contract.
            App.contracts.CryptoMarket.setProvider(window.ethereum);
            console.log("Contract Executed");
            return App.checkUserRegistration();
          
          });
    },

    checkUserRegistration: function(){
      var self = this;
    console.log("Checking user registration...please wait");
    var meta;
    App.contracts.CryptoMarket.deployed().then(async function(instance) {
      meta = instance;
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts;
      console.log(account)
      return meta.checkUserRegistration.call({from: account});
    }).then(function(value) {
      console.log(value)
      if (value) { 
        alert("User is already registered");
      } else {
        if (confirm("New user: we need to setup an account for you")) {
          App.initRegister();
        } else {
          return null;  
        }
      }
    }).catch(function(e) {
      console.log(e);
      console.log("Error checking user registration; see log");
    });
    return null;

    },

    initRegister: function(){
        console.log("Registration Initiated")
        var self = this;
        console.log("User registration:(open MetaMask->submit->wait)");
        var meta;
        App.contracts.CryptoMarket.deployed().then(async function(instance) {
        meta = instance;
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        return meta.registerUser({}, {
          from: account,
          gas: 6385876,
          gasPrice: 20000000000
        });
        }).then(function(result) {
        var gasUsedWei = result.receipt.gasUsed;
        var gasUsedEther = ethers.utils.formatEther(gasUsedWei);
        alert("User is registered...gas spent: " + gasUsedEther + "(ethers)");
        
        }).catch(function(e) {
            console.log(e);
            console.log("Error logging in; see log");
        });

    
      return null;
    },

};

$(document).ready(function(){
    
    App.init();

});