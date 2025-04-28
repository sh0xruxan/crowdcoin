import { http, createConfig } from "wagmi"
import { mainnet, sepolia } from "wagmi/chains"
import { injected, coinbaseWallet } from "wagmi/connectors"

// Create wagmi config without WalletConnect to avoid the error
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
      appLogoUrl: "/logoZ.svg",
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
