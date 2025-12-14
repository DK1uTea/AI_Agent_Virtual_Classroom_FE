import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Question } from "@/types/main-flow";
import { cn } from "@/lib/utils";

interface MultipleChoiceQuestionProps {
  question: Question;
  currentAnswer?: string;
  onAnswer: (answer: string) => void;
}

export default function MultipleChoiceQuestion({
  question,
  currentAnswer,
  onAnswer,
}: MultipleChoiceQuestionProps) {
  return (
    <RadioGroup
      value={currentAnswer}
      onValueChange={onAnswer}
      className="space-y-3"
    >
      {question.options?.map((option, index) => (
        <div
          key={index}
          className={cn(
            "flex items-center space-x-3 rounded-lg border p-4 hover:bg-accent cursor-pointer transition-colors",
            currentAnswer === option && "bg-accent border-primary"
          )}
          onClick={() => onAnswer(option)}
        >
          <RadioGroupItem value={option} id={`option-${index}`} />
          <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
            {option}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
