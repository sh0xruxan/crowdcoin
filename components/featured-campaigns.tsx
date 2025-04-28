"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { mockCampaigns } from "@/lib/mock-data"

export default function FeaturedCampaigns() {
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch with a delay
    const timer = setTimeout(() => {
      setCampaigns(mockCampaigns.slice(0, 3))
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Featured Campaigns</h2>
          <p className="text-gray-500 dark:text-gray-400">Discover the newest opportunities</p>
        </div>
        <Button variant="ghost" asChild>
          <Link href="/explore" className="flex items-center gap-1">
            View All
            <ArrowRight size={16} />
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="overflow-hidden">
              <Link href={`/campaign/${campaign.id}`} className="block">
                <div className="aspect-video relative bg-gray-100 dark:bg-gray-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={campaign.image || "/placeholder.svg"}
                      alt={campaign.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </Link>
              <CardHeader>
                <Link href={`/campaign/${campaign.id}`}>
                  <CardTitle className="hover:underline">{campaign.title}</CardTitle>
                </Link>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">{campaign.description}</p>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-black dark:bg-white h-2.5 rounded-full"
                      style={{ width: `${campaign.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span>{campaign.raised} ETH raised</span>
                    <span>{campaign.progress}%</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href={`/campaign/${campaign.id}`}>View Campaign</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
