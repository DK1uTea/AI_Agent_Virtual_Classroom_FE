import { Message, MessageAvatar, MessageContent } from "@/components/ui/shadcn-io/ai/message";
import { Response } from "@/components/ui/shadcn-io/ai/response";
import { MessageType } from "@/types/chat-types";

type AIMessageComponentProps = {
  message: MessageType;
}

const AIMessageComponent = ({ message }: AIMessageComponentProps) => {
  return (
    <Message from={message.role}>
      <MessageAvatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed=AI`} name="AI" />
      {message.intent === 'deep' && (
        <MessageContent>
          <Response className="max-h-[500px] overflow-y-auto">
            {message.value}
          </Response>
        </MessageContent>
      )}
      {message.intent === 'normal' && (
        <MessageContent>
          {message.value}
        </MessageContent>
      )}
    </Message>
  );
}

export default AIMessageComponent;