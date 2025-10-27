'use client'
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { ActivityLog } from "@/types/main-flow";
import dayjs from "dayjs";
import { Eye } from "lucide-react";

type ActivityLogProps = {
  log: ActivityLog;
  setSelectedLog: (log: ActivityLog) => void;
}

const ActivityLogItem = ({ log, setSelectedLog }: ActivityLogProps) => {
  return (
    <TableRow key={log.id}>
      <TableCell className="text-muted-foreground">
        {dayjs(log.timestamp).format('DD/MM/YYYY HH:mm')}
      </TableCell>
      <TableCell>
        {log.type === 'lesson-complete' && '✅ Lessons Completed'}
        {log.type === 'quiz-complete' && '📝 Quiz Completed'}
        {log.type === 'video-watch' && '▶️ Video Watched'}
      </TableCell>
      <TableCell>{log.details}</TableCell>
      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedLog(log)}
        >
          <Eye className="h-4 w-4 mr-2" />
          Chi tiết
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ActivityLogItem;