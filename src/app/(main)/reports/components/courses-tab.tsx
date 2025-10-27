'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const CoursesTab = () => {

  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Progress</CardTitle>
        <CardDescription>Details of each course's progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4>React Programming for Beginners</h4>
                <p className="text-muted-foreground">45% Completed</p>
              </div>
              <Button variant="outline" onClick={() => router.push('course-detail')}>
                View Details
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border p-4">
                <p className="text-muted-foreground">Lessons</p>
                <p>11/24</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-muted-foreground">Duration</p>
                <p>8.5 hours</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-muted-foreground">Average Score</p>
                <p>87%</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4>Python and Machine Learning</h4>
                <p className="text-muted-foreground">12% Completed</p>
              </div>
              <Button variant="outline" onClick={() => router.push('course-detail')}>
                View Details
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border p-4">
                <p className="text-muted-foreground">Lessons</p>
                <p>5/40</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-muted-foreground">Duration</p>
                <p>4.2 hours</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-muted-foreground">Average Score</p>
                <p>82%</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CoursesTab;