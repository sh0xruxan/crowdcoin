"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { useAccount } from "wagmi"

export default function CreateCampaignPage() {
  const router = useRouter()
  const { isConnected } = useAccount()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    target: "",
    minimumContribution: "",
    deadline: "",
    image: "",
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
      // In a real app, this would create a smart contract
      console.log("Creating campaign with data:", formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Redirect to the campaigns page
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Failed to create campaign. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Create a New Campaign</h1>

        {!isConnected ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Wallet not connected</AlertTitle>
            <AlertDescription>
              Please connect your Ethereum wallet to create a campaign. The campaign will be created as a smart contract
              on the Ethereum blockchain.
            </AlertDescription>
          </Alert>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Campaign Details</CardTitle>
              <CardDescription>
                Fill out the information below to create your crowdfunding campaign. All campaigns are deployed as smart
                contracts on the Ethereum blockchain.
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
                  <Label htmlFor="title">Campaign Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter a clear, descriptive title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Campaign Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your campaign in detail. What are you raising funds for?"
                    rows={5}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="target">Funding Goal (ETH)</Label>
                    <Input
                      id="target"
                      name="target"
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={formData.target}
                      onChange={handleChange}
                      placeholder="e.g., 10"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minimumContribution">Minimum Contribution (ETH)</Label>
                    <Input
                      id="minimumContribution"
                      name="minimumContribution"
                      type="number"
                      step="0.001"
                      min="0.001"
                      value={formData.minimumContribution}
                      onChange={handleChange}
                      placeholder="e.g., 0.01"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Campaign Deadline</Label>
                  <Input
                    id="deadline"
                    name="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Campaign Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    type="url"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Campaign...
                      </>
                    ) : (
                      "Create Campaign"
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
