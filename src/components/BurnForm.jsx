import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import ABI from '../YourABI.json';

export default function BurnForm({ contractAddress }) {
  const [tokens, setTokens] = useState([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    async function fetchTokens() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, ABI, provider);
      const signer = provider.getSigner();
      const owner = await signer.getAddress();
      const balance = await contract.balanceOf(owner);
      const list = [];
      for (let i = 0; i < balance; i++) {
        const id = await contract.tokenOfOwnerByIndex(owner, i);
        list.push(id.toString());
      }
      setTokens(list);
      setSelected(list[0] || '');
    }
    fetchTokens();
  }, [contractAddress]);

  const burn = async () => {
    if (!selected) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, ABI, provider.getSigner());
    await (await contract.burn(selected)).wait();
    window.location.reload();
  };

  return (
    <>
      <select value={selected} onChange={e => setSelected(e.target.value)}>
        {tokens.map(id => <option key={id} value={id}>{id}</option>)}
      </select>
      <button onClick={burn}>Quemar fragmento</button>
    </>
  );
}
