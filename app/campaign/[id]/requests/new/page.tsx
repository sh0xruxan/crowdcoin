"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react"
import { useAccount } from "wagmi"
import { mockCampaigns } from "@/lib/mock-data"

export default function CreateRequestPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { isConnected } = useAccount()
  const campaignId = Number.parseInt(params.id)
  const campaign = mockCampaigns.find((c) => c.id === campaignId)

  const [formData, setFormData] = useState({
    description: "",
    value: "",
    recipient: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      // In a real app, this would create a spending request on the smart contract
      console.log("Creating spending request with data:", formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Redirect to the campaign requests page
      router.push(`/campaign/${campaignId}?tab=requests`)
    } catch (err: any) {
      setError(err.message || "Failed to create request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!campaign) {
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container max-w-3xl mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Campaign not found</AlertTitle>
            <AlertDescription>The campaign you're looking for doesn't exist.</AlertDescription>
          </Alert>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link
              href={`/campaign/${campaignId}`}
              className="flex items-center gap-1 text-gray-500 hover:text-gray-900"
            >
              <ArrowLeft size={16} />
              Back to campaign
            </Link>
          </Button>
        </div>

        <h1 className="text-3xl font-bold mb-2">Create a Spending Request</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Campaign: {campaign.title}</p>

        {!isConnected ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Wallet not connected</AlertTitle>
            <AlertDescription>
              Please connect your Ethereum wallet to create a spending request. Only the campaign manager can create
              requests.
            </AlertDescription>
          </Alert>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Request Details</CardTitle>
              <CardDescription>
                Create a request to withdraw money from the campaign. Contributors will need to approve this request
                before funds can be transferred.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="description">Request Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe what this money will be used for"
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="value">Amount (ETH)</Label>
                  <Input
                    id="value"
                    name="value"
                    type="number"
                    step="0.001"
                    min="0.001"
                    value={formData.value}
                    onChange={handleChange}
                    placeholder="e.g., 1.5"
                    required
                  />
                  <p className="text-xs text-gray-500">Campaign balance: {campaign.raised} ETH</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipient">Recipient Address</Label>
                  <Input
                    id="recipient"
                    name="recipient"
                    value={formData.recipient}
                    onChange={handleChange}
                    placeholder="0x..."
                    required
                  />
                  <p className="text-xs text-gray-500">
                    The Ethereum address that will receive the funds if the request is approved
                  </p>
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Request...
                      </>
                    ) : (
                      "Create Request"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>

      <footer className="py-6 text-center text-sm text-gray-500 mt-auto">
        <p>&copy; {new Date().getFullYear()} ZettaByte. All rights reserved.</p>
      </footer>
    </main>
  )
}
