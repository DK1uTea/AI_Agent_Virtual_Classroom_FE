"use client";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, documentDispatchEvent, formatTimer } from "@/lib/utils";
import { useLessonStore } from "@/stores/lesson-store";
import { useVideoPlayerStore } from "@/stores/video-player-store";
import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";
import { Button } from "@/components/ui/button";
import { Target } from "lucide-react";

const TranscriptTab = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchQueryDebounced] = useDebounceValue(searchQuery, 1000);

  const { currentTranscripts, currentLesson } = useLessonStore(
    useShallow((state) => ({
      currentTranscripts: state.currentTranscripts,
      currentLesson: state.currentLesson,
    }))
  );

  const { currentTime, changeCurrentSeekNumber } = useVideoPlayerStore(
    useShallow((state) => ({
      currentTime: state.currentTime,
      changeCurrentSeekNumber: state.changeCurrentSeekNumber,
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

  const itemRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const lastAutoIndexRef = useRef<number | null>(null);
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);

  const scrollToTime = (time: number, force = false) => {
    if (!isAutoScrollEnabled && !force) return;
    const activeIndex = filteredTranscripts.findIndex(
      (t) => time >= t.start && time <= t.end
    );

    if (activeIndex !== -1) {
      const el = itemRefs.current[activeIndex];
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

  const handleManualScroll = () => {
    if (isAutoScrollEnabled) {
      setIsAutoScrollEnabled(false);
    }
  };

  useEffect(() => {
    const handleSeek = (event: Event) => {
      const e = event as CustomEvent<{ time: number }>;
      const time = e.detail?.time;
      if (typeof time === "number") {
        // When seeking (from progress bar or transcript click), we SHOULD scroll and maybe re-enable
        setIsAutoScrollEnabled(true);
        scrollToTime(time, true);
      }
    };

    document.addEventListener("seekChange", handleSeek as EventListener);
    return () => {
      document.removeEventListener("seekChange", handleSeek as EventListener);
    };
  }, [filteredTranscripts]); // Re-bind if list changes to ensure findIndex works on latest list

  // Auto-scroll when active segment changes during playback
  useEffect(() => {
    if (!isAutoScrollEnabled) return;

    const activeIndex = filteredTranscripts.findIndex(
      (t) => currentTime >= t.start && currentTime <= t.end
    );

    if (activeIndex !== -1 && activeIndex !== lastAutoIndexRef.current) {
      lastAutoIndexRef.current = activeIndex;
      const el = itemRefs.current[activeIndex];
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    } else if (activeIndex === -1) {
      lastAutoIndexRef.current = null;
    }
  }, [currentTime, filteredTranscripts, isAutoScrollEnabled]);

  return (
    <div className="flex h-full flex-col p-1">
      <div className="p-4 border-b flex items-center justify-between gap-2">
        <div className="relative flex-1">
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
        {!isAutoScrollEnabled && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setIsAutoScrollEnabled(true);
              scrollToTime(currentTime, true);
            }}
            className="shrink-0 animate-in fade-in zoom-in duration-200"
            title="Sync with video"
          >
            <Target className="h-4 w-4" />
          </Button>
        )}
      </div>

      <ScrollArea
        className="flex-1 h-0 rounded-lg border-2 border-dashed border-muted-foreground/50 my-2"
        onWheel={handleManualScroll}
        onTouchMove={handleManualScroll}
      >
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
                  itemRefs.current[index] = el;
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
                    // Scroll immediately and re-enable auto-scroll
                    setIsAutoScrollEnabled(true);
                    scrollToTime(transcript.start, true);
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
