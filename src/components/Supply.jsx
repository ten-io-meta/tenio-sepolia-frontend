import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import ABI from '../YourABI.json';

export default function Supply({ contractAddress }) {
  const [remaining, setRemaining] = useState(null);

  useEffect(() => {
    async function fetchSupply() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, ABI, provider);
      const total = await contract.totalSupply();           // 1000
      const filter = contract.filters.Transfer(null, ethers.constants.AddressZero);
      const events = await contract.queryFilter(filter);
      setRemaining(total.sub(events.length).toString());
    }
    fetchSupply();
  }, [contractAddress]);

  if (remaining === null) return <p>Cargando supply…</p>;
  return <p>Supply restante: {remaining} / 1000</p>;
}
