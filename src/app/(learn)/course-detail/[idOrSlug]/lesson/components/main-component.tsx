'use client'

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Course, Lesson } from "@/types/main-flow";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import LessonListTab from "./lesson-list-tab";

type MainComponentProps = {
  currentCourse: Course;
  currentLesson: Lesson;
}
const MainComponent = ({ currentCourse, currentLesson }: MainComponentProps) => {

  const [isVideoPauseByChat, setIsVideoPauseByChat] = useState<boolean>(false);

  const handlePrevious = () => {

  };

  const handleNext = () => {

  };

  return (
    <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
      {/* Video Section */}
      <div className="flex flex-1 flex-col">
        {/* Video Player */}

        {isVideoPauseByChat && (
          <div className="bg-yellow-500/10 border-t border-yellow-500/20 p-2 text-center text-yellow-500">
            Video is paused due to chat interaction.
          </div>
        )}

        {/* Progress And Navigation */}
        <div className="bg-background p-4 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p>{currentLesson.title}</p>
              <span className="text-muted-foreground">{currentLesson.duration}</span>
            </div>
            <Progress value={65} />
          </div>

          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={handlePrevious}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous Lesson
            </Button>
            <Button onClick={handleNext}>
              Next Lesson
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tab Section */}
      <div className="w-full lg:w-96">
        <Tabs defaultValue="lesson-list" className="flex h-full flex-col">
          <TabsList className="w-full rounded-none border-b">
            <TabsTrigger value="lesson-list" className="flex-1">
              Lesson List
            </TabsTrigger>
            <TabsTrigger value="transcript-text" className="flex-1">
              Transcript
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex-1">
              Chat Agent
            </TabsTrigger>
            <TabsTrigger value="mind-map" className="flex-1">
              Mind Map
            </TabsTrigger>
          </TabsList>

          <div className="flex-1">
            <TabsContent value="lesson-list" className="h-full p-4 m-0">
              <LessonListTab lessons={currentCourse.lessons || []} currentLessonId={currentLesson.id} />
            </TabsContent>
            <TabsContent value="transcript-text" className="h-full p-4 m-0">

            </TabsContent>
            <TabsContent value="chat" className="h-full p-4 m-0">

            </TabsContent>
            <TabsContent value="mind-map" className="h-full p-4 m-0">

            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

export default MainComponent;