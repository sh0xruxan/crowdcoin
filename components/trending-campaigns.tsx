"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { mockCampaigns } from "@/lib/mock-data"
import Link from "next/link"

export default function TrendingCampaigns() {
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch with a delay
    const timer = setTimeout(() => {
      setCampaigns(mockCampaigns.slice(3, 7))
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp size={20} />
        <h2 className="text-2xl font-bold">Trending Now</h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {campaigns.map((campaign) => (
            <Link href={`/campaign/${campaign.id}`} key={campaign.id}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{campaign.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500 dark:text-gray-400">Target</span>
                    <span>{campaign.target} ETH</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Backers</span>
                    <span>{campaign.backers}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
