"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

interface Update {
  id: number
  title: string
  content: string
  date: string
  author: {
    name: string
    avatar: string
  }
}

const mockUpdates: Update[] = [
  {
    id: 1,
    title: "Development Progress Update",
    content:
      "We're excited to share that we've completed the initial architecture design and have begun implementing the core functionality. Our team has been working tirelessly to ensure we meet our development milestones. We've also onboarded two new senior developers who bring extensive experience in blockchain development.",
    date: "April 15, 2025",
    author: {
      name: "Alex Blockchain",
      avatar: "/placeholder.svg",
    },
  },
  {
    id: 2,
    title: "Partnership Announcement",
    content:
      "We're thrilled to announce a strategic partnership with BlockTech Solutions, a leading provider of blockchain infrastructure. This collaboration will enhance our platform's capabilities and provide additional resources for development and testing. Stay tuned for more details on how this partnership will benefit our project and community.",
    date: "April 5, 2025",
    author: {
      name: "Alex Blockchain",
      avatar: "/placeholder.svg",
    },
  },
  {
    id: 3,
    title: "Funding Milestone Reached",
    content:
      "Thanks to your incredible support, we've reached 50% of our funding goal! This is a significant milestone that brings us one step closer to realizing our vision. We're deeply grateful for your belief in our project and commitment to supporting innovative blockchain solutions. With this funding, we can now accelerate our development timeline and expand our team.",
    date: "March 28, 2025",
    author: {
      name: "Alex Blockchain",
      avatar: "/placeholder.svg",
    },
  },
]

export default function CampaignUpdates({ campaignId }: { campaignId: number }) {
  const [updates, setUpdates] = useState<Update[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch with a delay
    const timer = setTimeout(() => {
      setUpdates(mockUpdates)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [campaignId])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Project Updates</h2>

      {updates.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-gray-500">No updates have been posted yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {updates.map((update) => (
            <Card key={update.id}>
              <CardHeader>
                <CardTitle>{update.title}</CardTitle>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{update.date}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{update.content}</p>
                <Separator />
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={update.author.avatar || "/placeholder.svg"} alt={update.author.name} />
                    <AvatarFallback>{update.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{update.author.name}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
