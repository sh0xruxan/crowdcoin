import Navbar from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { mockCampaigns } from "@/lib/mock-data"
import { BarChart3, Edit, Plus, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function MyCampaignsPage() {
  // Get campaigns for the user
  const userCampaigns = mockCampaigns.slice(0, 5)

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Campaigns</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your created campaigns</p>
          </div>
          <Button asChild>
            <Link href="/create-campaign">
              <Plus className="mr-2 h-4 w-4" />
              Create Campaign
            </Link>
          </Button>
        </div>

        <div className="space-y-6">
          {userCampaigns.map((campaign) => (
            <Card key={campaign.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 lg:w-1/5">
                  <div className="h-48 md:h-full relative bg-gray-100 dark:bg-gray-800">
                    <img
                      src={campaign.image || "/placeholder.svg"}
                      alt={campaign.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-3/4 lg:w-4/5 p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                    <div>
                      <Link href={`/campaign/${campaign.id}`}>
                        <h2 className="text-xl font-bold hover:underline">{campaign.title}</h2>
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                        >
                          Active
                        </Badge>
                        <span className="text-sm text-gray-500">Created on April 15, 2025</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/campaign/${campaign.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/campaign/${campaign.id}/analytics`}>
                          <BarChart3 className="mr-2 h-4 w-4" />
                          Analytics
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{campaign.description}</p>
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div
                        className="bg-black dark:bg-white h-2.5 rounded-full"
                        style={{ width: `${campaign.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex flex-wrap justify-between mt-2 text-sm">
                      <span>{campaign.raised} ETH raised</span>
                      <span>
                        {campaign.progress}% of {campaign.target} ETH goal
                      </span>
                      <span>{campaign.backers} backers</span>
                      <span>30 days left</span>
                    </div>
                  </div>
                  <Button asChild>
                    <Link href={`/campaign/${campaign.id}`}>View Campaign</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <footer className="py-6 text-center text-sm text-gray-500 mt-auto">
        <p>&copy; {new Date().getFullYear()} BlockFund. All rights reserved.</p>
      </footer>
    </main>
  )
}
