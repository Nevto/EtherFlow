const getBalance = document.querySelector('#getBalance')
const checkBalanceButton = document.querySelector('#balanceButton')
const showMyBalance = document.querySelector('#walletBalance')
const sendAmount = document.querySelector('#amount')
const toAdress = document.querySelector('#toWallet')
const sendTrxButton = document.querySelector('#sendTrxButton')
const showEveryTransaction = document.querySelector('#showAllTransactions')
const showEverythingButton = document.querySelector('#showEverythingButton')

const web3 = new Web3(window.ethereum)

let account

function initApp() {
    const forms = document.querySelectorAll('form');
    forms.forEach(forms => {
        forms.addEventListener('submit', function (e) {
            e.preventDefault();
        })
    })
} 
const loadBalance = async () => {
    if (typeof ethereum !== undefined) {
        account = await ethereum.request({
            method: 'eth_requestAccounts'
        })

        const balance = await ethereum.request({
            method: 'eth_getBalance',
            params:[getBalance.value, 'latest']
        })
        
        
        console.log(balance);
        //Converts the result to show only 3 decimals
        const parseBalance = Math.floor(parseInt(balance) / Math.pow(10,15)) / 1000
        showMyBalance.innerText = parseBalance + ' Eth';
    } else {
        console.log("You appear to be empty of eth");
    }
}

const sendTrx = async () => {
    const toWallet = toAdress.value;
    const fromWallet = getBalance.value;
    const amount = parseFloat(sendAmount.value) * Math.pow(10, 18)
    // const amount = sendAmount.value;

    try {
        // Fetch Current gasprice
        const gasPrice = await ethereum.request({
            method: 'eth_gasPrice',
        })
        const sendTransaction = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
                from: fromWallet,
                to: toWallet,
                value: Number(amount).toString(16),
                // Pay current gasPrice to stay competetive
                gasPrice: gasPrice
            }]
            
        });
        console.log('Congratulations! your transaction is done', sendTransaction);
        location.reload();
    } catch (error) {
        console.error('Something went wrong with the transaction:', error);
    }
};

checkBalanceButton.addEventListener('click', loadBalance)
sendTrxButton.addEventListener('click', sendTrx)
document.addEventListener('DOMContentLoaded', initApp)
