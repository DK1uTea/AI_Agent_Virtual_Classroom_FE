'use client'

import { Button } from "@/components/ui/button";

const EnrollLessonButton = () => {
  const handleEnroll = () => {

  };

  return (
    <Button className="w-full" size="lg" onClick={handleEnroll}>
      Enroll in Course
    </Button>
  );
};

export default EnrollLessonButton;