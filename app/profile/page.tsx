import Navbar from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { mockCampaigns } from "@/lib/mock-data"
import { BarChart3, Edit, ExternalLink, Github, Globe, Twitter } from "lucide-react"

export default function ProfilePage() {
  // Mock user data
  const user = {
    firstName: "Alex",
    lastName: "Blockchain",
    email: "alex@example.com",
    bio: "Blockchain developer and entrepreneur with a passion for decentralized technologies.",
    avatar: "/placeholder.svg",
    website: "https://example.com",
    twitter: "alexblockchain",
    github: "alexblockchain",
  }

  // Get campaigns for the user
  const userCampaigns = mockCampaigns.slice(0, 3)
  const backedCampaigns = mockCampaigns.slice(3, 6)

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={`${user.firstName} ${user.lastName}`} />
                    <AvatarFallback>
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle>
                  {user.firstName} {user.lastName}
                </CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400">{user.bio}</p>
                <div className="flex flex-col gap-2">
                  {user.website && (
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <a
                        href={user.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {user.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}
                  {user.twitter && (
                    <div className="flex items-center gap-2 text-sm">
                      <Twitter className="h-4 w-4 text-gray-500" />
                      <a
                        href={`https://twitter.com/${user.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        @{user.twitter}
                      </a>
                    </div>
                  )}
                  {user.github && (
                    <div className="flex items-center gap-2 text-sm">
                      <Github className="h-4 w-4 text-gray-500" />
                      <a
                        href={`https://github.com/${user.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {user.github}
                      </a>
                    </div>
                  )}
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/profile/edit">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Campaigns Created</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Campaigns Backed</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Raised</span>
                  <span className="font-medium">45.8 ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Contributed</span>
                  <span className="font-medium">8.2 ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Member Since</span>
                  <span className="font-medium">April 2025</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Tabs defaultValue="campaigns">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="campaigns">My Campaigns</TabsTrigger>
                <TabsTrigger value="backed">Backed Projects</TabsTrigger>
              </TabsList>
              <TabsContent value="campaigns" className="mt-6 space-y-6">
                {userCampaigns.map((campaign) => (
                  <Card key={campaign.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3">
                        <div className="h-48 md:h-full relative bg-gray-100 dark:bg-gray-800">
                          <img
                            src={campaign.image || "/placeholder.svg"}
                            alt={campaign.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="md:w-2/3 p-6">
                        <Link href={`/campaign/${campaign.id}`}>
                          <h3 className="font-bold text-lg mb-2 hover:underline">{campaign.title}</h3>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{campaign.description}</p>
                        <div className="mb-4">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div
                              className="bg-black dark:bg-white h-2.5 rounded-full"
                              style={{ width: `${campaign.progress}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-2 text-sm">
                            <span>{campaign.raised} ETH raised</span>
                            <span>
                              {campaign.progress}% of {campaign.target} ETH
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button asChild>
                            <Link href={`/campaign/${campaign.id}`}>View Campaign</Link>
                          </Button>
                          <Button variant="outline" asChild>
                            <Link href={`/campaign/${campaign.id}/analytics`}>
                              <BarChart3 className="mr-2 h-4 w-4" />
                              Analytics
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                <div className="text-center">
                  <Button asChild>
                    <Link href="/my-campaigns">View All Campaigns</Link>
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="backed" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <div className="mb-2">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-black dark:bg-white h-2 rounded-full"
                              style={{ width: `${campaign.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm mb-4">
                          <span className="text-gray-500">Your contribution</span>
                          <span className="font-medium">0.5 ETH</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1" asChild>
                            <Link href={`/campaign/${campaign.id}`}>View</Link>
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <a
                              href={`https://etherscan.io/tx/0x1234567890abcdef`}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="View transaction"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="text-center mt-6">
                  <Button asChild>
                    <Link href="/backed-campaigns">View All Backed Projects</Link>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <footer className="py-6 text-center text-sm text-gray-500 mt-auto">
        <p>&copy; {new Date().getFullYear()} BlockFund. All rights reserved.</p>
      </footer>
    </main>
  )
}
