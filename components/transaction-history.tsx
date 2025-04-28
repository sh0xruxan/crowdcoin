"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAccount } from "wagmi"
import { ArrowDownRight, ArrowUpRight, Clock } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

// Mock transaction data
interface Transaction {
  id: string
  type: "sent" | "received"
  amount: string
  timestamp: number
  status: "confirmed" | "pending"
  to: string
  from: string
  hash: string
}

// This would come from an API or blockchain indexer in a real app
const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "sent",
    amount: "0.5",
    timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
    status: "confirmed",
    to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
    from: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  },
  {
    id: "2",
    type: "received",
    amount: "0.2",
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    status: "confirmed",
    to: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    from: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    hash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
  },
  {
    id: "3",
    type: "sent",
    amount: "0.1",
    timestamp: Date.now() - 1000 * 60 * 5, // 5 minutes ago
    status: "pending",
    to: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    from: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    hash: "0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456",
  },
]

export function TransactionHistory() {
  const { address, isConnected } = useAccount()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isConnected) {
      // Simulate API fetch with a delay
      const timer = setTimeout(() => {
        setTransactions(mockTransactions)
        setLoading(false)
      }, 1500)

      return () => clearTimeout(timer)
    } else {
      setTransactions([])
      setLoading(false)
    }
  }, [isConnected, address])

  // Format address for display
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  // Format timestamp to relative time
  const formatTime = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp

    if (diff < 1000 * 60) {
      return "Just now"
    } else if (diff < 1000 * 60 * 60) {
      return `${Math.floor(diff / (1000 * 60))}m ago`
    } else if (diff < 1000 * 60 * 60 * 24) {
      return `${Math.floor(diff / (1000 * 60 * 60))}h ago`
    } else {
      return `${Math.floor(diff / (1000 * 60 * 60 * 24))}d ago`
    }
  }

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Connect your wallet to view your transaction history</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-6 text-gray-500">No wallet connected</CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>Recent transactions for your wallet</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <div className="text-right">
                  <Skeleton className="h-4 w-16 mb-2" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </div>
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-6 text-gray-500">No transactions found</div>
        ) : (
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      tx.type === "sent"
                        ? "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                        : "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                    }`}
                  >
                    {tx.type === "sent" ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
                  </div>
                  <div>
                    <div className="font-medium">
                      {tx.type === "sent" ? "Sent to" : "Received from"}{" "}
                      {tx.type === "sent" ? formatAddress(tx.to) : formatAddress(tx.from)}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      {tx.status === "pending" ? (
                        <>
                          <Clock className="h-3 w-3" /> Pending
                        </>
                      ) : (
                        formatTime(tx.timestamp)
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`font-medium ${
                      tx.type === "sent" ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
                    }`}
                  >
                    {tx.type === "sent" ? "-" : "+"}
                    {tx.amount} ETH
                  </div>
                  <a
                    href={`https://etherscan.io/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-500 hover:underline"
                  >
                    View
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
