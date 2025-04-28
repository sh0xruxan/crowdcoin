import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Share2, Heart, Users, AlertCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockCampaigns } from "@/lib/mock-data"
import CampaignUpdates from "@/components/campaign-updates"
import CampaignComments from "@/components/campaign-comments"
import FundingModal from "@/components/funding-modal"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function CampaignPage({ params }: { params: { id: string } }) {
  const campaignId = Number.parseInt(params.id)
  const campaign = mockCampaigns.find((c) => c.id === campaignId)

  if (!campaign) {
    notFound()
  }

  const daysLeft = 30 // Mock data

  // Mock spending requests for the campaign
  const spendingRequests = [
    {
      id: 1,
      description: "Purchase equipment for development",
      value: "5.0 ETH",
      recipient: "0x1234...5678",
      approvalCount: "3/5",
      status: "Pending",
    },
    {
      id: 2,
      description: "Marketing expenses",
      value: "2.5 ETH",
      recipient: "0x8765...4321",
      approvalCount: "4/5",
      status: "Approved",
    },
    {
      id: 3,
      description: "Server costs",
      value: "1.2 ETH",
      recipient: "0x5678...1234",
      approvalCount: "2/5",
      status: "Pending",
    },
  ]

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/explore" className="flex items-center gap-1 text-gray-500 hover:text-gray-900">
              <ArrowLeft size={16} />
              Back to campaigns
            </Link>
          </Button>
        </div>

        {/* Campaign header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4">
              <img
                src={campaign.image || "/placeholder.svg"}
                alt={campaign.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                >
                  Active
                </Badge>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Calendar size={14} />
                  {daysLeft} days left
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Share2 size={18} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Heart size={18} />
                </Button>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-2">{campaign.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{campaign.description}</p>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Funding</CardTitle>
                <CardDescription>Campaign ends on May 30, 2025</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-2xl font-bold">{campaign.raised} ETH</span>
                    <span className="text-gray-500">of {campaign.target} ETH goal</span>
                  </div>
                  <Progress value={campaign.progress} className="h-2 mb-1" />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{campaign.progress}% funded</span>
                    <span>{daysLeft} days left</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users size={16} />
                  <span>{campaign.backers} backers</span>
                </div>

                <FundingModal campaign={campaign} />

                <div className="pt-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <AlertCircle size={16} />
                    <span>Minimum contribution: 0.01 ETH. All funds are managed through a smart contract.</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Campaign Manager</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" alt="Creator" />
                    <AvatarFallback>CR</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">Alex Blockchain</h3>
                    <p className="text-sm text-gray-500">Campaign Manager</p>
                  </div>
                </div>
                <Separator className="my-4" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Blockchain developer and entrepreneur with a passion for decentralized technologies.
                </p>
                <Button variant="outline" className="w-full mt-4">
                  Contact Manager
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Campaign content tabs */}
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="requests">Spending Requests</TabsTrigger>
            <TabsTrigger value="updates">Updates</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>
          <TabsContent value="about" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <h2 className="text-2xl font-bold mb-4">About This Project</h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>
                      {campaign.title} is a groundbreaking initiative that aims to revolutionize the way we interact
                      with blockchain technology. Our mission is to create a more accessible, efficient, and
                      user-friendly platform that empowers individuals and communities.
                    </p>
                    <h3>The Problem</h3>
                    <p>
                      Current blockchain solutions often suffer from high transaction fees, slow processing times, and
                      complex user interfaces. This creates significant barriers to entry for many potential users and
                      limits the widespread adoption of blockchain technology.
                    </p>
                    <h3>Our Solution</h3>
                    <p>
                      We're developing a next-generation platform that addresses these challenges head-on. By
                      implementing innovative scaling solutions, optimizing transaction processing, and designing an
                      intuitive user experience, we're making blockchain technology accessible to everyone.
                    </p>
                    <h3>Key Features</h3>
                    <ul>
                      <li>Low transaction fees and fast processing times</li>
                      <li>User-friendly interface designed for both beginners and experts</li>
                      <li>Enhanced security measures to protect user assets</li>
                      <li>Interoperability with existing blockchain networks</li>
                      <li>Comprehensive documentation and support resources</li>
                    </ul>
                    <h3>Roadmap</h3>
                    <p>Our development roadmap is divided into several key phases:</p>
                    <ol>
                      <li>
                        <strong>Phase 1:</strong> Core infrastructure development and testing
                      </li>
                      <li>
                        <strong>Phase 2:</strong> Beta release and community feedback
                      </li>
                      <li>
                        <strong>Phase 3:</strong> Feature enhancements and optimization
                      </li>
                      <li>
                        <strong>Phase 4:</strong> Full public launch and ecosystem expansion
                      </li>
                    </ol>
                    <h3>How Your Funding Helps</h3>
                    <p>
                      Your support is crucial to bringing this project to life. The funds raised will be allocated to:
                    </p>
                    <ul>
                      <li>Development resources and engineering talent (60%)</li>
                      <li>Security audits and testing (15%)</li>
                      <li>User experience design and implementation (10%)</li>
                      <li>Marketing and community building (10%)</li>
                      <li>Legal and operational expenses (5%)</li>
                    </ul>
                    <p>
                      By backing this project, you're not just funding a new technology—you're helping to build a more
                      accessible and equitable blockchain ecosystem for everyone.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">Campaign Details</h2>
                  <div className="grid gap-4">
                    <Card>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Campaign Address</h3>
                            <p className="font-mono text-sm">0x8ba1f109551bD432803012645Ac136ddd64DBA72</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Manager Address</h3>
                            <p className="font-mono text-sm">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Minimum Contribution</h3>
                            <p>0.01 ETH</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Number of Requests</h3>
                            <p>3</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Number of Contributors</h3>
                            <p>{campaign.backers}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Campaign Balance</h3>
                            <p>{campaign.raised} ETH</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Project FAQ</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-1">How does the smart contract work?</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Each campaign is a smart contract on the Ethereum blockchain. Contributors send ETH directly to
                        the contract, and the manager creates spending requests that contributors can approve.
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-medium mb-1">How are funds managed?</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        All funds are held in the smart contract. The manager can only spend funds by creating requests
                        that must be approved by a majority of contributors.
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-medium mb-1">What happens if the goal isn't reached?</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        The campaign will continue until its deadline. Unlike traditional platforms, there is no "all or
                        nothing" model - all funds remain in the contract and can be used through the request system.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-6">
                  <h3 className="font-medium mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Blockchain</Badge>
                    <Badge variant="secondary">DeFi</Badge>
                    <Badge variant="secondary">Web3</Badge>
                    <Badge variant="secondary">Technology</Badge>
                    <Badge variant="secondary">Innovation</Badge>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="requests" className="mt-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Spending Requests</h2>
                <Button asChild>
                  <Link href={`/campaign/${campaign.id}/requests/new`}>Create Request</Link>
                </Button>
              </div>

              <Card>
                <CardContent className="p-6">
                  <p className="mb-4 text-gray-600 dark:text-gray-400">
                    The campaign manager can create requests to withdraw money from the campaign. Contributors can
                    approve these requests. When a request receives approval from a majority of contributors, the
                    manager can finalize the request and transfer the funds.
                  </p>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Recipient</TableHead>
                        <TableHead>Approval Count</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {spendingRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>{request.id}</TableCell>
                          <TableCell>{request.description}</TableCell>
                          <TableCell>{request.value}</TableCell>
                          <TableCell className="font-mono text-xs">{request.recipient}</TableCell>
                          <TableCell>{request.approvalCount}</TableCell>
                          <TableCell>
                            <Badge
                              variant={request.status === "Approved" ? "outline" : "secondary"}
                              className={
                                request.status === "Approved"
                                  ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                                  : ""
                              }
                            >
                              {request.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                Approve
                              </Button>
                              {request.status === "Approved" && (
                                <Button size="sm" variant="outline">
                                  Finalize
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="updates">
            <CampaignUpdates campaignId={campaign.id} />
          </TabsContent>

          <TabsContent value="comments">
            <CampaignComments campaignId={campaign.id} />
          </TabsContent>
        </Tabs>
      </div>

      <footer className="py-6 text-center text-sm text-gray-500 mt-auto">
        <p>&copy; {new Date().getFullYear()} ZettaByte. All rights reserved.</p>
      </footer>
    </main>
  )
}
