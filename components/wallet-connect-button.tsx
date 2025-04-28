"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Wallet } from "lucide-react"
import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi"
import { walletIcons, walletNames } from "@/lib/wallet-config"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function WalletConnectButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [connectError, setConnectError] = useState<string | null>(null)
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending, pendingConnector } = useConnect({
    onError: (error) => {
      console.error("Wallet connection error:", error)
      setConnectError(error.message || "Failed to connect wallet. Please try again.")
    },
  })
  const { disconnect } = useDisconnect()
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address,
    enabled: Boolean(address),
  })

  // Format address for display
  const formatAddress = (addr: string | undefined) => {
    if (!addr) return ""
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  // Handle wallet connection
  const handleConnect = (connector: any) => {
    setConnectError(null)
    try {
      connect({ connector })
      setIsOpen(false)
    } catch (error: any) {
      setConnectError(error.message || "Failed to connect wallet. Please try again.")
    }
  }

  // Handle wallet disconnection
  const handleDisconnect = () => {
    disconnect()
  }

  return (
    <>
      {isConnected ? (
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2" onClick={() => setIsOpen(true)}>
            <Wallet className="h-4 w-4" />
            <span className="hidden md:inline">{formatAddress(address)}</span>
            <span className="inline md:hidden">Wallet</span>
          </Button>
        </div>
      ) : (
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Connect Wallet
        </Button>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isConnected ? "Wallet Connected" : "Connect Wallet"}</DialogTitle>
            <DialogDescription>
              {isConnected
                ? "Your wallet is connected to ZettaByte"
                : "Connect your wallet to fund projects and manage your contributions."}
            </DialogDescription>
          </DialogHeader>

          {isConnected ? (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Address</span>
                <span className="text-sm text-gray-500">{formatAddress(address)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Balance</span>
                {isBalanceLoading || !balance ? (
                  <Skeleton className="h-4 w-20" />
                ) : (
                  <span className="text-sm text-gray-500">
                    {Number.parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Button asChild>
                  <Link href="/wallet" onClick={() => setIsOpen(false)}>
                    View Wallet Dashboard
                  </Link>
                </Button>
                <Button variant="destructive" onClick={handleDisconnect}>
                  Disconnect Wallet
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 py-4">
              {connectError && (
                <Alert variant="destructive">
                  <AlertDescription>{connectError}</AlertDescription>
                </Alert>
              )}

              <p className="text-sm text-gray-500">Choose your preferred wallet provider:</p>
              <div className="grid grid-cols-1 gap-3">
                {connectors.map((connector) => {
                  const isReady = connector.ready
                  const iconKey = connector.name.toLowerCase().replace(/\s+/g, "") as keyof typeof walletIcons
                  const icon = walletIcons[iconKey] || "/placeholder.svg?height=24&width=24"
                  const name = walletNames[iconKey] || connector.name

                  return (
                    <Card
                      key={connector.uid}
                      className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                        !isReady ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={() => isReady && handleConnect(connector)}
                    >
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                        <img src={icon || "/placeholder.svg"} alt={name} className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{name}</h3>
                        <p className="text-xs text-gray-500">{isReady ? "Ready to connect" : "Not installed"}</p>
                      </div>
                      {isPending && connector.uid === pendingConnector?.uid && (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 dark:border-gray-100"></div>
                      )}
                    </Card>
                  )
                })}
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">
                By connecting your wallet, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
