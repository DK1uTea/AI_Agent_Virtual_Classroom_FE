import { AIAnalyzeRes } from "@/apis/responses/ai-res";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Message, MessageAvatar, MessageContent } from "@/components/ui/shadcn-io/ai/message";
import { Response } from "@/components/ui/shadcn-io/ai/response";
import { useLessonStore } from "@/stores/lesson-store";
import { useShallow } from "zustand/shallow";

type DialogAnalyzeComponentProps = {
  analyzeData: AIAnalyzeRes | null;
}

const DialogAnalyzeComponent = ({ analyzeData }: DialogAnalyzeComponentProps) => {

  const {
    currentLesson,
    isAnalyzeDialogOpen,
    toggleAnalyzeDialog,
  } = useLessonStore(useShallow((state) => ({
    currentLesson: state.currentLesson,
    isAnalyzeDialogOpen: state.ui.isAnalyzeDialogOpen,
    toggleAnalyzeDialog: state.toggleAnalyzeDialog,
  })))

  return (
    <Dialog open={isAnalyzeDialogOpen} onOpenChange={toggleAnalyzeDialog}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="max-w-[90vw] sm:max-w-[90vw] lg:max-w-[80vw] xl:max-w-[70vw]"
      >
        <DialogHeader>
          <DialogTitle>AI Agent Analyze: {currentLesson?.title}</DialogTitle>
          <DialogDescription asChild>
            <div>
              <Message from="assistant" className="[&>div]:max-w-full">
                <MessageContent>
                  <Response className="max-h-[50rem] overflow-y-auto">
                    {analyzeData?.analysis}
                  </Response>
                  <div className="mt-2">
                    <div className="w-full flex justify-start items-center gap-2">
                      <strong>Level: </strong>
                      <span>{analyzeData?.level}</span>
                    </div>
                    <div className="w-full flex justify-start items-center gap-2">
                      <strong>Reason: </strong>
                      <span className="break-words">{analyzeData?.levelReason}</span>
                    </div>
                  </div>
                </MessageContent>
                <MessageAvatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed=AI`} name="AI" />
              </Message>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => {
            toggleAnalyzeDialog(false);
          }}>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogAnalyzeComponent;