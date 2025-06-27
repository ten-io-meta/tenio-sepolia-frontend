# TENIO Fragment Web (Sepolia)

Esta es la interfaz oficial de prueba para el contrato `TENIOFragment` desplegado en la red Sepolia.

## Funcionalidades

- Conectar wallet (MetaMask)
- Mintear fragmento (envía 0.12 ETH falso)
- Quemar fragmento (devuelve 0.10 ETH falso)
- Vinculado al IPFS real del fragmento de "Crack in the Silence"

## Contrato Sepolia

- Dirección: `0xD360714b72796dC812A0c177B9Be45022D1f3f5B`
- Verificado: [Etherscan](https://sepolia.etherscan.io/address/0xD360714b72796dC812A0c177B9Be45022D1f3f5B)

## Instrucciones locales

```bash
npm install
npm run dev
```

## Variables de entorno

Crea un archivo `.env` con este contenido:

```bash
VITE_CONTRACT_ADDRESS=0xD360714b72796dC812A0c177B9Be45022D1f3f5B
```
