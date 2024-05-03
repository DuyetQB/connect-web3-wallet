import { useState, useEffect } from 'react';
import Web3 from 'web3';
import CardPortfolio from '../components/CardPortfolio';

function Home() {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  useEffect(() => {
    async function loadWeb3() {
      if ((window as any).ethereum) {
        const web3Instance = new Web3((window as any).ethereum);
        await (window as any).ethereum.enable();
        console.log("web3Instance aa:",web3Instance);
        setWeb3(web3Instance);
      } else if ((window as any).web3) {
        const web3Instance = new Web3((window as any).web3.currentProvider);
        console.log("web3Instance:",web3Instance);
        
        setWeb3(web3Instance);
      } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    }
    loadWeb3();
  }, []);

  useEffect(() => {
    async function loadAccount() {
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      }
    }
    loadAccount();
  }, [web3]);

  useEffect(() => {
    async function loadBalance() {
      if (web3 && account) {
        const balanceInWei = await web3.eth.getBalance(account);
        const balanceInEth = web3.utils.fromWei(balanceInWei, 'ether');
        setBalance(balanceInEth);
      }
    }
    loadBalance();
  }, [web3, account]);

  return (
    <div className="App">
      <h1>Connect with Your Wallet</h1>
      {account ? 
      (
        <div>
          <CardPortfolio balance={balance} account={account}/>
          {/* <button onClick={handleLogout} className='button'>Đăng xuất</button> */}
        </div>
      )
      : <p>Please connect with your wallet</p>}
    </div>
  );
}

export default Home;
