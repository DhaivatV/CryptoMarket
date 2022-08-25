App = {

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
        document.getElementById("_mybalance").innerHTML = balance+" Ethers";

        

    }

};

$(document).ready(function(){
    
    App.init();

});