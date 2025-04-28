import { Button } from "@/components/ui/button"
import Link from "next/link"
import Navbar from "@/components/navbar"
import FeaturedCampaigns from "@/components/featured-campaigns"
import TrendingCampaigns from "@/components/trending-campaigns"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-20 bg-gray-100 dark:bg-gray-900">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Decentralized Crowdfunding on Ethereum</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mb-8">
          ZettaByte helps you fund and create transparent, trustless campaigns using smart contracts.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            asChild
            className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            <Link href="/explore">Explore Campaigns</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-black text-black hover:bg-black/5 dark:border-white dark:text-white dark:hover:bg-white/10"
          >
            <Link href="/campaigns/new" className="flex items-center gap-1">
              Start a Campaign <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-center mb-12">How ZettaByte Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-black text-white dark:bg-white dark:text-black rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              1
            </div>
            <h3 className="text-xl font-bold mb-2">Create a Campaign</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Set up your campaign with a funding goal, description, and deadline. Each campaign is a smart contract.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-black text-white dark:bg-white dark:text-black rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              2
            </div>
            <h3 className="text-xl font-bold mb-2">Get Funded</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Supporters contribute ETH directly to your campaign's smart contract with full transparency.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-black text-white dark:bg-white dark:text-black rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              3
            </div>
            <h3 className="text-xl font-bold mb-2">Create Spending Requests</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Create requests to spend funds. Contributors vote to approve each spending request for maximum
              accountability.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <FeaturedCampaigns />
      </section>

      {/* Trending Now */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <TrendingCampaigns />
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-black text-white dark:bg-white dark:text-black text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Campaign?</h2>
          <p className="mb-8">
            Launch your campaign on ZettaByte today and leverage the power of blockchain for transparent crowdfunding.
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10 dark:border-black dark:text-black dark:hover:bg-black/10"
          >
            <Link href="/campaigns/new">Create a Campaign</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <div className="bg-black text-white dark:bg-white dark:text-black p-1 rounded">
                <img src="/logoZ.svg" alt="ZettaByte Logo" className="h-6 w-6" />
              </div>
              <span>ZettaByte</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400">Decentralized crowdfunding platform built on Ethereum.</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/explore" className="text-gray-600 dark:text-gray-400 hover:underline">
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/campaigns/new" className="text-gray-600 dark:text-gray-400 hover:underline">
                  Start a Campaign
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-600 dark:text-gray-400 hover:underline">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-gray-600 dark:text-gray-400 hover:underline">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-gray-600 dark:text-gray-400 hover:underline">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="text-gray-600 dark:text-gray-400 hover:underline">
                  Tutorials
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:underline">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} ZettaByte. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
