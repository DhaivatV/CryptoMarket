

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
            
    
          }
          else{
            const provider = new ethers.providers.JsonRpcProvider();
            const signer = provider.getSigner()
            console.log("provider set......Now checking user registerartion");
            App.checkUserRegistration();
            
    
    
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
              alert("User Already Registered");
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
    
     
    
      
    

    
    
    };
    
      
    
    $(document).ready(function(){
        
      App.init();
    
    });