import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Question } from "@/types/main-flow";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

interface TrueFalseQuestionProps {
  question: Question;
  currentAnswer?: string;
  onAnswer: (answer: string) => void;
}

export default function TrueFalseQuestion({
  question,
  currentAnswer,
  onAnswer,
}: TrueFalseQuestionProps) {
  const options = ["True", "False"];

  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((option) => (
        <div
          key={option}
          className={cn(
            "flex flex-col items-center justify-center space-y-2 rounded-lg border-2 p-6 cursor-pointer hover:bg-accent transition-all",
            currentAnswer === option && "border-primary bg-primary/5 text-primary"
          )}
          onClick={() => onAnswer(option)}
        >
           <div className={cn(
              "p-2 rounded-full",
              option === "True" 
                ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400" 
                : "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
            )}>
              {option === "True" ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}
            </div>
            <span className="font-semibold text-lg">{option}</span>
        </div>
      ))}
    </div>
  );
}
