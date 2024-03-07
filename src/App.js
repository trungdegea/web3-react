import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import "./App.css";
import { injected } from "./connector";

function App() {
  const [accounts, setAccounts] = useState("hi");
  const { active, account, library, connector, chainId, activate, deactivate } =
    useWeb3React();

  useEffect(() => {
    const load = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(provider);
      const signer = provider.getSigner();
      console.log(signer);
      await provider.getBlockNumber();
      let balance = await provider.getBalance(
        "0xF53593e0009582B9ADac9F2854ce07ACDcde94EC"
      );
      console.log(ethers.utils.formatEther(balance));
      console.log(provider._network);
      // const tx = signer.sendTransaction({
      //   to: "0xA2397895a57E90b8BA240415b29c05214E533B07",
      //   value: ethers.utils.parseEther("0.1"),
      // });
    };
    load();

    setAccounts(account);
  }, [account]);
  const connect = async () => {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <div className="App">
      <h1>account : {accounts}</h1>
      <button onClick={connect}>connect to metaMark</button>
      {active ? (
        <span>
          Connected with <b>{account}</b>
        </span>
      ) : (
        <span>Not connected</span>
      )}
    </div>
  );
}

export default App;
