"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAccount, useBalance } from "wagmi"
import { Skeleton } from "@/components/ui/skeleton"
import { Copy, ExternalLink } from "lucide-react"
import { useState } from "react"

export function WalletDetails() {
  const { address, isConnected } = useAccount()
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address,
    enabled: Boolean(address),
  })
  const [copied, setCopied] = useState(false)

  // Format address for display
  const formatAddress = (addr: string | undefined) => {
    if (!addr) return ""
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  // Copy address to clipboard
  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Wallet Details</CardTitle>
          <CardDescription>Connect your wallet to view your details</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-6 text-gray-500">No wallet connected</CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wallet Details</CardTitle>
        <CardDescription>Your connected wallet information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Address</h3>
            <div className="flex items-center gap-2">
              <span className="font-mono">{formatAddress(address)}</span>
              <Button variant="ghost" size="icon" onClick={copyAddress} className="h-6 w-6">
                {copied ? <span className="text-green-500 text-xs">✓</span> : <Copy className="h-3 w-3" />}
              </Button>
              {address && (
                <Button variant="ghost" size="icon" className="h-6 w-6" asChild>
                  <a
                    href={`https://etherscan.io/address/${address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View on Etherscan"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Balance</h3>
            {isBalanceLoading || !balance ? (
              <Skeleton className="h-6 w-24" />
            ) : (
              <div className="font-medium">
                {Number.parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Network</h3>
            <div className="font-medium">Ethereum</div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Actions</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href="https://etherscan.io" target="_blank" rel="noopener noreferrer">
                  View on Etherscan
                </a>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
