"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Comment {
  id: number
  content: string
  date: string
  author: {
    name: string
    avatar: string
  }
}

const mockComments: Comment[] = [
  {
    id: 1,
    content:
      "This project looks amazing! I'm excited to see how it develops and the impact it will have on the blockchain ecosystem.",
    date: "April 20, 2025",
    author: {
      name: "Crypto Enthusiast",
      avatar: "/placeholder.svg",
    },
  },
  {
    id: 2,
    content:
      "I've been following this team for a while, and their technical expertise is impressive. Looking forward to the beta release!",
    date: "April 18, 2025",
    author: {
      name: "Blockchain Developer",
      avatar: "/placeholder.svg",
    },
  },
  {
    id: 3,
    content:
      "Just backed this project! The roadmap is clear and the team seems very responsive. Quick question: will there be a mobile app version?",
    date: "April 15, 2025",
    author: {
      name: "Web3 Investor",
      avatar: "/placeholder.svg",
    },
  },
]

export default function CampaignComments({ campaignId }: { campaignId: number }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState("")

  useEffect(() => {
    // Simulate API fetch with a delay
    const timer = setTimeout(() => {
      setComments(mockComments)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [campaignId])

  const handleSubmitComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now(),
      content: newComment,
      date: "Just now",
      author: {
        name: "You",
        avatar: "/placeholder.svg",
      },
    }

    setComments([comment, ...comments])
    setNewComment("")
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Community Discussion</h2>

      <Card>
        <CardHeader>
          <CardTitle>Leave a comment</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Share your thoughts about this project..."
            className="min-h-[100px] mb-4"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button onClick={handleSubmitComment}>Post Comment</Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                  <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{comment.author.name}</h3>
                    <span className="text-xs text-gray-500">{comment.date}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
