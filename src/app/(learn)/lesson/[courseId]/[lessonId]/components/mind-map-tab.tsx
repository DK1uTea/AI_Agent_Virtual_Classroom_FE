'use client'
import MindMapDialog from "./mind-map-dialog";
import MindMap from "./mindmap";

const MindMapTab = () => {
  return (
    <>
      <div className="h-full w-full p-2 rounded-lg border-2 border-dashed border-muted-foreground/50">
        <MindMap isLayout={false} />
      </div>
      <MindMapDialog />
    </>
  );
};

export default MindMapTab;