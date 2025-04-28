import Navbar from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { mockCampaigns } from "@/lib/mock-data"
import { ExternalLink, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function BackedCampaignsPage() {
  // Get campaigns backed by the user
  const backedCampaigns = mockCampaigns.slice(0, 6)

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Backed Campaigns</h1>
          <p className="text-gray-500 dark:text-gray-400">Projects you've supported</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {backedCampaigns.map((campaign) => (
            <Card key={campaign.id} className="overflow-hidden flex flex-col">
              <Link href={`/campaign/${campaign.id}`} className="block">
                <div className="aspect-video relative bg-gray-100 dark:bg-gray-800">
                  <img
                    src={campaign.image || "/placeholder.svg"}
                    alt={campaign.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </Link>
              <CardContent className="p-6 flex-grow flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                  >
                    Active
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <Link href={`/campaign/${campaign.id}`}>
                  <h3 className="font-bold text-lg mb-2 hover:underline">{campaign.title}</h3>
                </Link>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-grow">{campaign.description}</p>
                <div className="mb-4">
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
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-gray-500">Your contribution</span>
                  <span className="font-medium">0.5 ETH</span>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" asChild>
                    <Link href={`/campaign/${campaign.id}`}>View Details</Link>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href={`https://etherscan.io/tx/0x1234567890abcdef`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
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
