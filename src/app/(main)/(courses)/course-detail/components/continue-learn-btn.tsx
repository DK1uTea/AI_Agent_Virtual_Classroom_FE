'use client'
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";

type ContinueLearnButtonProps = {
  courseId: string;
}

const ContinueLearnButton = ({ courseId }: ContinueLearnButtonProps) => {
  const router = useRouter();

  return (
    <Button size="lg" onClick={() => router.push(`/lesson/${courseId}`)}>
      <PlayCircle className="mr-2 h-5 w-5" />
      Continue Learning
    </Button>
  )
}
export default ContinueLearnButton;