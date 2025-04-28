import Navbar from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { mockCampaigns } from "@/lib/mock-data"
import { ArrowRight, BarChart3, Heart, Plus, Wallet } from "lucide-react"

export default function DashboardPage() {
  // Get a few campaigns for the dashboard
  const userCampaigns = mockCampaigns.slice(0, 2)
  const backedCampaigns = mockCampaigns.slice(2, 4)

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your campaigns and contributions</p>
          </div>
          <Button asChild>
            <Link href="/create-campaign">
              <Plus className="mr-2 h-4 w-4" />
              Create Campaign
            </Link>
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-gray-500">Active campaigns</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Raised</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45.8 ETH</div>
              <p className="text-xs text-gray-500">Across all campaigns</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Contributions Made</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-gray-500">Projects backed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Wallet Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2 ETH</div>
              <p className="text-xs text-gray-500">Available for funding</p>
            </CardContent>
          </Card>
        </div>

        {/* Your Campaigns */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Your Campaigns</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/my-campaigns" className="flex items-center">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userCampaigns.map((campaign) => (
              <Card key={campaign.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <div className="h-full aspect-video md:aspect-square relative bg-gray-100 dark:bg-gray-800">
                      <img
                        src={campaign.image || "/placeholder.svg"}
                        alt={campaign.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3 p-4">
                    <h3 className="font-bold mb-2">{campaign.title}</h3>
                    <div className="mb-2">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-black dark:bg-white h-2 rounded-full"
                          style={{ width: `${campaign.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>{campaign.raised} ETH raised</span>
                        <span>
                          {campaign.progress}% of {campaign.target} ETH
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/campaign/${campaign.id}`}>View</Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/campaign/${campaign.id}/edit`}>Edit</Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/campaign/${campaign.id}/analytics`}>
                          <BarChart3 className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            <Card className="flex items-center justify-center p-6 border-dashed">
              <Button variant="outline" asChild>
                <Link href="/create-campaign" className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Campaign
                </Link>
              </Button>
            </Card>
          </div>
        </div>

        {/* Backed Campaigns */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Campaigns You've Backed</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/backed-campaigns" className="flex items-center">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {backedCampaigns.map((campaign) => (
              <Card key={campaign.id} className="overflow-hidden">
                <Link href={`/campaign/${campaign.id}`} className="block">
                  <div className="aspect-video relative bg-gray-100 dark:bg-gray-800">
                    <img
                      src={campaign.image || "/placeholder.svg"}
                      alt={campaign.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <CardContent className="p-4">
                  <Link href={`/campaign/${campaign.id}`}>
                    <h3 className="font-bold mb-2 hover:underline">{campaign.title}</h3>
                  </Link>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Your contribution</span>
                    <span>0.5 ETH</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Wallet className="h-3 w-3" />
                      <span>{campaign.backers} backers</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <footer className="py-6 text-center text-sm text-gray-500 mt-auto">
        <p>&copy; {new Date().getFullYear()} BlockFund. All rights reserved.</p>
      </footer>
    </main>
  )
}
