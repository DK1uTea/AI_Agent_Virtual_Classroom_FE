'use client'
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import MindMap from "./mindmap";
import { useLessonStore } from "@/stores/lesson-store";
import { useShallow } from "zustand/shallow";

const MindMapDialog = () => {
  const {
    isMindMapDialogOpen,
    toggleMindMapDialog,
  } = useLessonStore(useShallow((state) => ({
    isMindMapDialogOpen: state.ui.isMindMapDialogOpen,
    toggleMindMapDialog: state.toggleMindMapDialog,
  })));

  return (
    <Dialog
      open={isMindMapDialogOpen}
      onOpenChange={toggleMindMapDialog}>
      <DialogContent className="max-w-[95vw] sm:max-w-[95vw] h-[95vh] p-4">
        <DialogTitle className="sr-only">Mind Map</DialogTitle>
        <MindMap isLayout={true} />
      </DialogContent>
    </Dialog>
  );
}

export default MindMapDialog;