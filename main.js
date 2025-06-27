import { ethers } from "ethers";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const ABI = [
  "function mintFragment(string memory uri) external payable",
  "function burn(uint256 tokenId) external",
  "function tokenURI(uint256 tokenId) public view returns (string memory)",
  "function ownerOf(uint256 tokenId) public view returns (address)",
  "function tokenIds() view returns (uint256)",
];

const connectWallet = async () => {
  if (!window.ethereum) {
    alert("MetaMask not found");
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

  window.contract = contract;
  window.signer = signer;
  window.provider = provider;

  const address = await signer.getAddress();
  document.getElementById("wallet").innerText = "🟢 " + address.slice(0, 6) + "..." + address.slice(-4);
};

const mint = async () => {
  const uri = prompt("IPFS URI:");
  if (!uri) return;

  const tx = await window.contract.mintFragment(uri, {
    value: ethers.parseEther("0.12"),
  });

  await tx.wait();
  alert("Minted!");
};

const burn = async () => {
  const id = prompt("Token ID to burn:");
  if (!id) return;

  const tx = await window.contract.burn(id);
  await tx.wait();
  alert("Burned and refunded!");
};

document.body.innerHTML = `
  <h1>TEN.IO Fragment (Sepolia)</h1>
  <button onclick="connectWallet()">Conectar Wallet</button>
  <span id="wallet">🔴 Desconectado</span>
  <br/><br/>
  <button onclick="mint()">Mintear fragmento (0.12 ETH)</button>
  <button onclick="burn()">Quemar fragmento</button>
`;

window.connectWallet = connectWallet;
window.mint = mint;
window.burn = burn;
