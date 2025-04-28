"use client"

import Navbar from "@/components/navbar"
import { TransactionHistory } from "@/components/transaction-history"
import { WalletDetails } from "@/components/wallet-details"

export default function WalletPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Wallet Dashboard</h1>

        <div className="grid gap-8">
          <WalletDetails />
          <TransactionHistory />
        </div>
      </div>

      <footer className="py-6 text-center text-sm text-gray-500 mt-auto">
        <p>&copy; {new Date().getFullYear()} ZettaByte. All rights reserved.</p>
      </footer>
    </main>
  )
}
