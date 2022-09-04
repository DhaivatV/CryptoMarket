App = {
  web3Provider: null,
  contracts: {},
  hash:"",

  init: function () {
    return App.initContract();
  },

  initContract: function () {
    $.getJSON("CryptoMarket.json", function (CryptoMarketArtifact) {
      App.contracts.CryptoMarket = TruffleContract(CryptoMarketArtifact);

      // Set the provider for our contract.
      if (window.ethereum) {
        App.contracts.CryptoMarket.setProvider(window.ethereum);
        console.log("Contract Executed");
        return App.initWeb3();
      } else {
        if (
          window.confirm(
            "Please Install MetaMask. Click on OK another website."
          )
        ) {
          window.location.href = "https://metamask.io/";
        }
      }
    });
  },

  initWeb3: async function () {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log(signer);
      console.log("provider set......Now checking user registerartion");
      return null;
    } else {
      const provider = new ethers.providers.JsonRpcProvider();
      const signer = provider.getSigner();
      console.log("provider set......Now checking user registerartion");
      return null;
    }
  },

  

  buyItem: async function () {
    //  price = 3000000000000000000;

    //   hexPrice = ethers.utils.hexlify(price)
    //   console.log(hexPrice);
    console.log("Transaction Initiated");
    const transactionParameters = {
      nonce: "0x00", // ignored by MetaMask
      // gasPrice: '0x09184e72a00000', // customizable by user during MetaMask confirmation.
      // gas: '0x5', // customizable by user during MetaMask confirmation.
      to: "0xf4392A8fB085d64Ec0e772f6CeB03B7b4254AaF5", // Required except during contract publications.
      from: ethereum.selectedAddress, // must match user's active address.
      value: "0x29a2241af62c0", // Only required to send ether to the recipient from the initiating external account.
      // data:
      //   '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
      chainId: "0x3", // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    };
    console.log("Parameters Added");

    const txHash = await ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });

    App.hash = txHash

    // console.log(typeof(txHash))
    // var self = this;
    // var meta;
    // App.contracts.CryptoMarket.deployed().then(async function(instance){
    // meta = instance;
    // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    // const account = accounts;
    // return meta.BuyItem({},{
    //   from: account[0],
    //   gas: 6385876,
    //   gasPrice: 20000000000
    // });

    // document.getElementById("btn").innerHTML = "View Txn Details";
    document.getElementById("view").style.display = "block";
    document.getElementById("btn").style.display = "none";
    // document.getElementById("view").addEventListener("click", App.veiwTxnhash(txHash));
    // App.test(txHash)

    // })
  },
  // test: function () {
  //   document.getElementById("view").addEventListener("click", App.veiwTxnhash(App.hash));
  // },
  veiwTxnhash: function () {
    console.log("abcd");
    document.getElementById("content").innerHTML = App.hash;
  },
};

$(document).ready(function () {
  App.init();
});
