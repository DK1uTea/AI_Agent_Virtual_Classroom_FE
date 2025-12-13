import { Message, MessageAvatar, MessageContent } from "@/components/ui/shadcn-io/ai/message";
import { Reasoning, ReasoningContent, ReasoningTrigger } from "@/components/ui/shadcn-io/ai/reasoning";
import { Response } from "@/components/ui/shadcn-io/ai/response";
import { MessageType } from "@/types/chat-types";

type AIMessageComponentProps = {
  message: MessageType;
  status?: string;
}

const AIMessageComponent = ({ status, message }: AIMessageComponentProps) => {
  return (
    <>
      <Message from={message.role}>
        <MessageAvatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed=AI`} name="AI" />
        {status && status === 'streaming' && (
          <MessageContent>
            <Reasoning isStreaming={status === 'streaming'}>
              <ReasoningTrigger title="Thinking" />
              <ReasoningContent>{message.value}</ReasoningContent>
            </Reasoning>
          </MessageContent>
        )}
        {status && status === 'error' && (
          <MessageContent>
            <div className="text-red-500">
              {message.value}
            </div>
          </MessageContent>
        )}
        {message && !status && (
          <MessageContent>
            <Response className="max-h-[50rem] overflow-y-auto">
              {message.value}
            </Response>
          </MessageContent>
        )}
      </Message>
      <span className="text-muted-foreground">{message.createdAt}</span>
    </>
  );
}

export default AIMessageComponent;