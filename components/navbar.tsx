"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useAccount } from "wagmi"
import { useEffect, useState } from "react"
import { UserNav } from "@/components/user-nav"
import { getCurrentUser } from "@/lib/actions"
import { WalletConnectButton } from "@/components/wallet-connect-button"

export default function Navbar() {
  const { isConnected } = useAccount()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getCurrentUser()
        setUser(userData)
      } catch (error: any) {
        console.error("Error fetching user:", error)
        setError(error.message || "Failed to load user data")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 md:px-6 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="h-8 w-8">
            <img src="/logoZ.png" alt="ZettaByte Logo" width={32} height={32} />
          </div>
          <span>ZettaByte</span>
        </Link>

        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            Home
          </Link>
          <Link href="/explore" className="text-sm font-medium hover:underline underline-offset-4">
            Explore
          </Link>
          <Link href="/campaigns/new" className="text-sm font-medium hover:underline underline-offset-4">
            Create Campaign
          </Link>
          <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
            Dashboard
          </Link>
          <ModeToggle />
          <WalletConnectButton />

          {!loading && (
            <>
              {user ? (
                <UserNav user={user} />
              ) : (
                !isConnected && (
                  <>
                    <Button variant="outline" asChild className="hidden md:inline-flex">
                      <Link href="/signin">Sign In</Link>
                    </Button>
                    <Button asChild className="hidden md:inline-flex">
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                  </>
                )
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
