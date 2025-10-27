'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ActivityLogItem from "./activity-log-item";
import { ActivityLog } from "@/types/main-flow";
import { useState } from "react";
import ActivityDetailDialog from "./activity-detail-dialog";
export const mockActivityLogs: ActivityLog[] = [
  {
    id: '1',
    type: 'lesson-complete',
    timestamp: new Date(2025, 9, 12, 14, 30),
    details: 'Lesson Completed: Introduction to React',
    duration: '15:30',
  },
  {
    id: '2',
    type: 'quiz-complete',
    timestamp: new Date(2025, 9, 12, 15, 0),
    details: 'Quiz Completed: Basic React',
    score: 85,
  },
  {
    id: '3',
    type: 'video-watch',
    timestamp: new Date(2025, 9, 11, 10, 15),
    details: 'Video Watched: Components and Props',
    duration: '12:30',
  },
];
const ActivityTab = () => {
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>
            Detailed history of your learning activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockActivityLogs.map((log) => (
                <ActivityLogItem key={log.id} log={log} setSelectedLog={setSelectedLog} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <ActivityDetailDialog log={selectedLog!} selectedLog={selectedLog} setSelectedLog={setSelectedLog} />
    </>
  );
}

export default ActivityTab;