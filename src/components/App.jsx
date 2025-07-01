import React from 'react';
import Supply from './components/Supply';
import BurnForm from './components/BurnForm';
import { ethers } from 'ethers';
import ABI from '../YourABI.json';

const CONTRACT = '0xd360714b72796dc812a0c177b9be45022d1f3f5b';

export default function App() {
  const mint = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT, ABI, provider.getSigner());
    const tx = await contract.mint(1, { value: ethers.utils.parseEther('0.01') });
    await tx.wait();
    window.location.reload();
  };

  return (
    <div>
      <h1>TEN.IO FRONT</h1>
      <Supply contractAddress={CONTRACT} />
      <button onClick={mint}>Mintear fragmento</button>
      <BurnForm contractAddress={CONTRACT} />
    </div>
  );
}
