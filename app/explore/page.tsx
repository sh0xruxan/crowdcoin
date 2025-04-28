import Navbar from "@/components/navbar"
import { Suspense } from "react"
import CampaignGrid from "@/components/campaign-grid"
import { Skeleton } from "@/components/ui/skeleton"

export default function ExplorePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="py-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-8">Explore Campaigns</h1>

        <Suspense fallback={<CampaignGridSkeleton />}>
          <CampaignGrid />
        </Suspense>
      </div>

      <footer className="py-6 text-center text-sm text-gray-500 mt-auto">
        <p>&copy; {new Date().getFullYear()} BlockFund. All rights reserved.</p>
      </footer>
    </main>
  )
}

function CampaignGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="border rounded-lg overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ))}
    </div>
  )
}
