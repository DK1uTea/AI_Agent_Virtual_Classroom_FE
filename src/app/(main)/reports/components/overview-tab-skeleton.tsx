import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function OverviewTabSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Study Time by Day Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[160px] mb-2" />
            <Skeleton className="h-4 w-[100px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full rounded-md" />
          </CardContent>
        </Card>

        {/* Lessons Completed Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[160px] mb-2" />
            <Skeleton className="h-4 w-[100px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full rounded-md" />
          </CardContent>
        </Card>
      </div>

      {/* Study Time Distribution Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-[200px] mb-2" />
          <Skeleton className="h-4 w-[120px]" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="w-full h-[300px] flex items-center justify-center">
              <Skeleton className="h-[200px] w-[200px] rounded-full" />
            </div>

            <div className="space-y-2 w-full lg:w-auto min-w-[200px]">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-4 w-[40px]" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
