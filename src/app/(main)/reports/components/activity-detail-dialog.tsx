import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ActivityLog } from "@/types/main-flow";
import dayjs from "dayjs";

type ActivityDetailDialogProps = {
  log: ActivityLog;
  selectedLog: ActivityLog | null;
  setSelectedLog: (log: ActivityLog | null) => void;
}

const ActivityDetailDialog = ({ log, selectedLog, setSelectedLog }: ActivityDetailDialogProps) => {

  return (
    <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Activity Details</DialogTitle>
          <DialogDescription>
            Detailed information about this activity
          </DialogDescription>
        </DialogHeader>
        {selectedLog && (
          <div className="space-y-4">
            <div className="grid gap-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <span>
                  {selectedLog.type === 'lesson-complete' && 'Lesson Completed'}
                  {selectedLog.type === 'quiz-complete' && 'Quiz Completed'}
                  {selectedLog.type === 'video-watch' && 'Video Watched'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time:</span>
                <span>{dayjs(selectedLog.timestamp).format("HH:mm - DD/MM/YYYY")}</span>
              </div>
              {selectedLog.duration && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span>{selectedLog.duration}</span>
                </div>
              )}
              {selectedLog.score !== undefined && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Score:</span>
                  <span>{selectedLog.score}%</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Details:</span>
                <span>{selectedLog.details}</span>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ActivityDetailDialog;