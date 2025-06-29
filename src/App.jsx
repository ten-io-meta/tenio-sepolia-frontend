import React, { useEffect, useState } from 'react';
import { connectWallet, mintFragment, burnFragment, getOwnedFragments, getTotalBurned } from './web3/TENIOFragmentConnection';
import './App.css';

function App() {
  const [account, setAccount] = useState(null);
  const [ownedFragments, setOwnedFragments] = useState([]);
  const [totalBurned, setTotalBurned] = useState(0);
  const maxSupply = 1000;

  useEffect(() => {
    if (account) {
      refreshData();
    }
  }, [account]);

  const refreshData = async () => {
    const fragments = await getOwnedFragments(account);
    const burned = await getTotalBurned();
    setOwnedFragments(fragments);
    setTotalBurned(burned);
  };

  const handleConnect = async () => {
    const acc = await connectWallet();
    setAccount(acc);
  };

  const handleMint = async () => {
    await mintFragment();
    refreshData();
  };

  const handleBurn = async (tokenId) => {
    await burnFragment(tokenId);
    refreshData();
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '40px', fontFamily: 'sans-serif' }}>
      <h1>TEN.IO – Fragmentos</h1>
      {!account ? (
        <button onClick={handleConnect}>Conectar billetera</button>
      ) : (
        <>
          <p><strong>Conectado:</strong> {account}</p>
          <video width="300" autoPlay loop muted style={{ borderRadius: '50%' }}>
            <source src="/assets/esfera.mp4" type="video/mp4" />
          </video>
          <h2>Fragmentos vivos: {maxSupply - totalBurned} / {maxSupply}</h2>
          <button onClick={handleMint}>Mintear fragmento (0.12 ETH)</button>
          <h3>Tus fragmentos:</h3>
          {ownedFragments.length === 0 ? (
            <p>No tienes fragmentos aún.</p>
          ) : (
            ownedFragments.map((tokenId) => (
              <div key={tokenId} style={{ margin: '10px' }}>
                Fragmento #{tokenId}
                <button onClick={() => handleBurn(tokenId)} style={{ marginLeft: '10px' }}>
                  Quemar (recupera 0.10 ETH)
                </button>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}

export default App;