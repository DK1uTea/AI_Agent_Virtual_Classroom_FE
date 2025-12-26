'use client'
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { ActivityLog } from "@/types/main-flow";
import dayjs from "dayjs";
import { Eye } from "lucide-react";

type ActivityLogProps = {
  log: {
    time: string;
    activity: string;
    details: string;
    lessonId: number | string;
    courseId: number | string;
  };
  index: number;
  setSelectedLog: (log: {
    time: string;
    activity: string;
    details: string;
    lessonId: number | string;
    courseId: number | string;
  }) => void;
}

const ActivityLogItem = ({ log, index, setSelectedLog }: ActivityLogProps) => {
  return (
    <TableRow key={`${log.activity}-${index}`}>
      <TableCell className="text-muted-foreground">
        {dayjs(log.time).format('DD/MM/YYYY HH:mm')}
      </TableCell>
      <TableCell>
        {log.activity === 'Lessons Completed' && '✅ Lessons Completed'}
        {log.activity === 'Quiz Completed' && '📝 Quiz Completed'}
        {log.activity === 'Video Watched' && '▶️ Video Watched'}
      </TableCell>
      <TableCell>{log.details}</TableCell>
      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedLog(log)}
        >
          <Eye className="h-4 w-4 mr-2" />
          Details
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ActivityLogItem;