

App = {

web3Provider: null,
contracts: {},
  

    init: function(){
        return App.initContract();
    },

    initContract: function(){
      $.getJSON('CryptoMarket.json', function(CryptoMarketArtifact) {
          App.contracts.CryptoMarket = TruffleContract(CryptoMarketArtifact);
          
          // Set the provider for our contract.
          if (window.ethereum)
            {
              App.contracts.CryptoMarket.setProvider(window.ethereum);
            console.log("Contract Executed");
            return App.initWeb3();
          }

          else{
            if (window.confirm('Please Install MetaMask. Click on OK another website.')) {
              window.location.href='https://metamask.io/';
            }
          }

          
        
        });

    
  },

    initWeb3 : async function(){

      if (window.ethereum){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()
        console.log(signer);
        console.log("provider set......Now checking user registerartion");
        App.checkUserRegistration();
        App.displayAccountInfo(provider);
        App.displayContractInfo();

      }
      else{
        const provider = new ethers.providers.JsonRpcProvider();
        const signer = provider.getSigner()
        console.log("provider set......Now checking user registerartion");
        App.checkUserRegistration();
        App.displayAccountInfo(provider);
        App.displayContractInfo();


      }

      
      },
        

    


    

  checkUserRegistration: function(){ 
    console.log("Checking User Registeration");
    var self = this;
    var meta;
    App.contracts.CryptoMarket.deployed().then(async function(instance){
      meta = instance;
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts;
      return meta.checkUserRegistration.call({from: account});}).then(function(value) {
        
        if (value) { 
          console.log("User Already Registered");
          return null;
        }
        
        else{
          if (confirm("New user: we need to register you to fetch your account details.")){
            App.initRegister();
            
          }
          else{
            return null;
          }
        }
      
    }).catch(function(e){
      console.log(e);
      console.log("Error checking user registration; see log");
    });
  return null;
  },

  initRegister: function(){
    console.log("Registering user now");
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

  displayAccountInfo: async function(provider){
    
    const accounts = await provider.send("eth_requestAccounts", []);
    balanceInWei = await window.ethereum.request({method: 'eth_getBalance', params: [accounts[0], 'latest']});
    balance = ethers.utils.formatEther(balanceInWei)
    document.getElementById("_mybalance").innerHTML = balance+"  Ethers";
    document.getElementById("ethereum_account").innerHTML = " "+accounts;
  return null;
  },

  displayContractInfo: function(){
    console.log("Contract Properties")
    var self = this;
    var meta;
    App.contracts.CryptoMarket.deployed().then(async function(instance){
      meta = instance;
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      return meta.getContractProperties.call({from: account});}).then(function(value) {
        var networkAddress = App.contracts.CryptoMarket.address;
        document.getElementById("contractaddress").innerHTML = " " + networkAddress;
        var by = value;
        var registeredUsersAddress = value[0];
        document.getElementById("contractowner").innerHTML = " " + registeredUsersAddress;
        
    });
  
    return null;
  },

  handleSignMessage : function( publicAddress, nonce ) {
    return new Promise((resolve, reject) =>
      web3.personal.sign(
        web3.fromUtf8(`I am signing my one-time nonce: ${nonce}`),
        publicAddress,
        (err, signature) => {
          if (err) return reject(err);
          return resolve({ publicAddress, signature });
        }
      )
    );
  },



};

  

$(document).ready(function(){
    
  App.init();

});