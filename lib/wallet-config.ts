import { http, createConfig } from "wagmi"
import { mainnet, sepolia } from "wagmi/chains"
import { injected, coinbaseWallet, walletConnect } from "wagmi/connectors"

// Create wagmi config with WalletConnect
export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  connectors: [
    injected(),
    coinbaseWallet({
      appName: "ZettaByte",
      appLogoUrl: "/logoZ.png",
    }),
    walletConnect({
      projectId: "94c26995bcff9934c3f76d18ac2aac8a", // WalletConnect project ID
      metadata: {
        name: "ZettaByte",
        description: "Decentralized Crowdfunding Platform",
        url: "https://zettabyte.vercel.app",
        icons: ["/logoZ.png"],
      },
    }),
  ],
})

// Export wallet types for UI
export const walletIcons = {
  metaMask: "/placeholder.svg?height=24&width=24",
  walletConnect: "/placeholder.svg?height=24&width=24",
  coinbaseWallet: "/placeholder.svg?height=24&width=24",
  brave: "/placeholder.svg?height=24&width=24",
  ledger: "/placeholder.svg?height=24&width=24",
}

export const walletNames = {
  metaMask: "MetaMask",
  walletConnect: "WalletConnect",
  coinbaseWallet: "Coinbase Wallet",
  brave: "Brave Wallet",
  ledger: "Ledger",
}
