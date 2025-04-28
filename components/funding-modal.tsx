"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Check, Loader2, Wallet } from "lucide-react"
import { useAccount, useBalance, useSendTransaction } from "wagmi"
import { parseEther } from "viem"
import Link from "next/link"

export default function FundingModal({ campaign }: { campaign: any }) {
  const [amount, setAmount] = useState("0.1")
  const [paymentMethod, setPaymentMethod] = useState("eth")
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [txHash, setTxHash] = useState<string | null>(null)
  const [isConfirming, setIsConfirming] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)

  // Wallet connection state
  const { address, isConnected } = useAccount()
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address,
    enabled: Boolean(address),
  })

  // Transaction state
  const { sendTransactionAsync, isPending: isSending } = useSendTransaction()

  // Reset state when modal opens/closes
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setError(null)
      setTxHash(null)
      setIsConfirming(false)
      setIsConfirmed(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!isConnected) {
      setError("Please connect your wallet first")
      return
    }

    try {
      // Check if user has enough balance
      const amountInEth = Number.parseFloat(amount)
      const balanceInEth = balance ? Number.parseFloat(balance.formatted) : 0

      if (amountInEth > balanceInEth) {
        setError(`Insufficient balance. You have ${balanceInEth.toFixed(4)} ETH available.`)
        return
      }

      // This would be the campaign creator's address in a real app
      const recipientAddress = "0x8ba1f109551bD432803012645Ac136ddd64DBA72"

      // Send transaction
      const result = await sendTransactionAsync({
        to: recipientAddress,
        value: parseEther(amount),
      })

      setTxHash(result.hash)
      setIsConfirming(true)

      // Simulate transaction confirmation
      setTimeout(() => {
        setIsConfirming(false)
        setIsConfirmed(true)
      }, 2000)
    } catch (err: any) {
      setError(err.message || "Transaction failed. Please try again.")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-full">Back this project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Fund this project</DialogTitle>
          <DialogDescription>Support {campaign.title} by contributing to their funding goal.</DialogDescription>
        </DialogHeader>

        {!isConnected ? (
          <div className="py-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Wallet not connected</AlertTitle>
              <AlertDescription>Please connect your wallet to fund this project.</AlertDescription>
            </Alert>
            <Button className="w-full mt-4" variant="outline" asChild>
              <Link href="/" onClick={() => setIsOpen(false)}>
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Link>
            </Button>
          </div>
        ) : txHash ? (
          <div className="py-6 flex flex-col items-center justify-center text-center">
            {isConfirming && (
              <>
                <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary" />
                <h3 className="font-medium text-lg mb-2">Confirming Transaction</h3>
                <p className="text-sm text-gray-500 mb-4">Your transaction is being confirmed on the blockchain.</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                  <div className="bg-primary h-2.5 rounded-full animate-pulse w-1/2"></div>
                </div>
                <a
                  href={`https://etherscan.io/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline"
                >
                  View on Etherscan
                </a>
              </>
            )}

            {isConfirmed && (
              <>
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-medium text-lg mb-2">Transaction Successful!</h3>
                <p className="text-sm text-gray-500 mb-4">Thank you for supporting this project with {amount} ETH.</p>
                <a
                  href={`https://etherscan.io/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline mb-4"
                >
                  View on Etherscan
                </a>
                <Button onClick={() => setIsOpen(false)}>Close</Button>
              </>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="grid gap-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="amount">Contribution amount (ETH)</Label>
                  {balance && (
                    <span className="text-xs text-gray-500">
                      Balance: {Number.parseFloat(balance.formatted).toFixed(4)} ETH
                    </span>
                  )}
                </div>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label>Payment method</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="eth" id="eth" />
                    <Label htmlFor="eth">Ethereum (ETH)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="usdc" id="usdc" disabled />
                    <Label htmlFor="usdc" className="text-gray-400">
                      USD Coin (USDC) - Coming soon
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dai" id="dai" disabled />
                    <Label htmlFor="dai" className="text-gray-400">
                      Dai (DAI) - Coming soon
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {address && (
                <div className="text-sm text-gray-500 mt-2">
                  <p>
                    Connected as: {address.slice(0, 6)}...{address.slice(-4)}
                  </p>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isSending || isConfirming}>
                {isSending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Contribute"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
