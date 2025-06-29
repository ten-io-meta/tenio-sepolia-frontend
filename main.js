import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js";

const connectButton = document.getElementById("connectButton");
const mintButton = document.getElementById("mintButton");
const burnButton = document.getElementById("burnButton");
const statusText = document.getElementById("status");

let account;
let contract;

const contractAddress = "0xD360714b72796dC812A0c177B9Be45022D1f3f5B";
const abi = [
  "function mintFragment(string memory uri) external payable",
  "function burn(uint256 tokenId) external"
];

connectButton.onclick = async () => {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    account = await signer.getAddress();
    contract = new ethers.Contract(contractAddress, abi, signer);
    connectButton.innerText = `Conectado: ${account.slice(0, 6)}...`;
    statusText.innerText = "MetaMask conectado";
  } else {
    alert("MetaMask no está instalado");
  }
};

mintButton.onclick = async () => {
  if (!contract) return alert("Conecta MetaMask primero");
  try {
    const tx = await contract.mintFragment(
      "ipfs://bafkreidacdfc6dk3pwrsi7sgjd7wcacbsjvla4zbewdp54tknsjeyzpfvm",
      { value: ethers.utils.parseEther("0.12") }
    );
    await tx.wait();
    statusText.innerText = "Fragmento minteado con éxito";
  } catch (e) {
    console.error(e);
    statusText.innerText = "Error al mintear";
  }
};

burnButton.onclick = async () => {
  if (!contract) return alert("Conecta MetaMask primero");
  const tokenId = prompt("Introduce el ID del fragmento a quemar");
  if (!tokenId) return;
  try {
    const tx = await contract.burn(tokenId);
    await tx.wait();
    statusText.innerText = "Fragmento quemado con éxito";
  } catch (e) {
    console.error(e);
    statusText.innerText = "Error al quemar";
  }
};
