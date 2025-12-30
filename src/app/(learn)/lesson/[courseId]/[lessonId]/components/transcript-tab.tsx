"use client";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, documentDispatchEvent, formatTimer } from "@/lib/utils";
import { useLessonStore } from "@/stores/lesson-store";
import { useVideoPlayerStore } from "@/stores/video-player-store";
import { Search } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";

const TranscriptTab = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchQueryDebounced] = useDebounceValue(searchQuery, 1000);

  const { currentTranscripts, currentLesson } = useLessonStore(
    useShallow((state) => ({
      currentTranscripts: state.currentTranscripts,
      currentLesson: state.currentLesson,
    }))
  );

  const { currentTime } = useVideoPlayerStore(
    useShallow((state) => ({
      currentTime: state.currentTime,
    }))
  );

  const filteredTranscripts = useMemo(() => {
    if (searchQueryDebounced.trim() === "") {
      return currentTranscripts;
    }
    return currentTranscripts.filter((transcript) =>
      transcript.text.toLowerCase().includes(searchQueryDebounced.toLowerCase().trim())
    );
  }, [currentTranscripts, searchQueryDebounced]);

  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // useEffect(() => {
  //   const active = filteredTranscripts.find(
  //     (t) => currentTime >= t.start && currentTime <= t.end
  //   );

  //   if (active) {
  //     const el = itemRefs.current[active.id];
  //     if (el) {
  //       el.scrollIntoView({
  //         behavior: "smooth",
  //         block: "center",
  //       });
  //     }
  //   }
  // }, [currentTime, filteredTranscripts]);

  return (
    <div className="flex h-full flex-col p-1">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Find in transcripts..."
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value;
              setSearchQuery(value);
            }}
            className="pl-10 bg-input-background"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 h-0 rounded-lg border-2 border-dashed border-muted-foreground/50 my-2">
        <div className="p-4 space-y-3">
          {filteredTranscripts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {searchQuery
                ? "No transcripts match your search."
                : "No transcripts available."}
            </div>
          )}

          {filteredTranscripts.map((transcript, index) => {
            const isActive =
              currentTime >= transcript.start &&
              currentTime <= transcript.end;

            return (
              <div
                key={`${transcript.id}-${index}`}
                ref={(el) => {
                  itemRefs.current[transcript.id] = el;
                }}
                className={cn(
                  "cursor-pointer rounded-lg p-3 transition-colors",
                  {
                    "bg-primary/10 border border-primary": isActive,
                    "hover:bg-accent": !isActive,
                  }
                )}
                onClick={() => {
                  const isVideoCompleted = currentLesson?.completed?.videoCompleted;

                  if (!isVideoCompleted && transcript.start > currentTime) {
                    toast.warning("You must watch the video to unlock this section.");
                    return;
                  }

                  requestAnimationFrame(() => {
                    documentDispatchEvent("seekChange", {
                      time: transcript.start,
                    });
                  });
                }}
              >
                <div className="mb-1">
                  <span className="text-primary">
                    {formatTimer(transcript.start)} -{" "}
                    {formatTimer(transcript.end)}
                  </span>
                </div>
                <p className={cn({ "text-muted-foreground": isActive })}>
                  {transcript.text}
                </p>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TranscriptTab;
