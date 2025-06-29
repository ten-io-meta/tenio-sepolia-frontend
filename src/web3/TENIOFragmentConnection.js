import { ethers } from 'ethers';

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const ABI = [
  "function mintFragment(string memory uri) external payable",
  "function burn(uint256 tokenId) external",
  "function tokenURI(uint256 tokenId) public view returns (string memory)",
  "function ownerOf(uint256 tokenId) public view returns (address)",
  "function tokenIds() public view returns (uint256)"
];

let provider;
let signer;
let contract;

export async function connectWallet() {
  if (!window.ethereum) {
    alert('MetaMask no está disponible');
    return;
  }

  provider = new ethers.BrowserProvider(window.ethereum);
  const accounts = await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();
  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  return accounts[0];
}

export async function mintFragment() {
  const tx = await contract.mintFragment(
    "ipfs://bafybeigftt7kun6fq3hlpahoxdnxy2nn54gjhkdgkyhch2yzilqfpet27a",
    { value: ethers.parseEther("0.12") }
  );
  await tx.wait();
}

export async function burnFragment(tokenId) {
  const tx = await contract.burn(tokenId);
  await tx.wait();
}

export async function getOwnedFragments(account) {
  const lastId = await contract.tokenIds();
  const owned = [];

  for (let i = 1; i <= lastId; i++) {
    try {
      const owner = await contract.ownerOf(i);
      if (owner.toLowerCase() === account.toLowerCase()) {
        owned.push(i);
      }
    } catch (err) {
      // token quemado
    }
  }

  return owned;
}

export async function getTotalBurned() {
  const lastId = await contract.tokenIds();
  let burned = 0;

  for (let i = 1; i <= lastId; i++) {
    try {
      await contract.ownerOf(i);
    } catch (err) {
      burned++;
    }
  }

  return burned;
}