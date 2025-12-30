import { Message, MessageAvatar, MessageContent } from "@/components/ui/shadcn-io/ai/message";
import { Reasoning, ReasoningContent, ReasoningTrigger } from "@/components/ui/shadcn-io/ai/reasoning";
import { Response } from "@/components/ui/shadcn-io/ai/response";
import { MessageType } from "@/types/chat-types";
import dayjs from "dayjs";
import { current } from "immer";
import { useCallback, useEffect, useState } from "react";

type AIMessageComponentProps = {
  message: MessageType;
  status?: string;
}

const AIMessageComponent = ({ status, message }: AIMessageComponentProps) => {

  const [currentReasoningTokenIndex, setCurrentReasoningTokenIndex] = useState<number>(0);
  const [reasoningTokens, setReasoningTokens] = useState<string[]>([]);
  const [contentReasoning, setContentReasoning] = useState<string>('');

  const [contentMessage, setContentMessage] = useState<string>('');


  const getRandomChunkSize = (min = 3, max = 4) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const chunkIntoTokens = useCallback((text: string): string[] => {
    const tokens: string[] = [];
    let index = 0;

    while (index < text.length) {
      const size = getRandomChunkSize();
      tokens.push(text.slice(index, index + size));
      index += size;
    }

    return tokens;
  }, []);

  useEffect(() => {
    if (status && status === 'streaming') {
      const tokenizedSteps = chunkIntoTokens(message.value);
      setReasoningTokens(tokenizedSteps);
      setContentReasoning('');
      setCurrentReasoningTokenIndex(0);
    }
  }, [chunkIntoTokens])

  useEffect(() => {
    if (!status || (status && status !== 'streaming') || currentReasoningTokenIndex >= reasoningTokens.length) {
      return;
    }

    const timer = setTimeout(() => {
      setContentReasoning((prev) => prev + reasoningTokens[currentReasoningTokenIndex]);
      setCurrentReasoningTokenIndex((prev) => prev + 1);
    }, 25);

    return () => {
      clearTimeout(timer);
    }
  }, [status, currentReasoningTokenIndex, reasoningTokens])

  useEffect(() => {
    if (status) return;

    let currentContent = '';
    let index = 0;
    const tokens = chunkIntoTokens(message.value);

    const interval = setInterval(() => {
      if (index < tokens.length) {
        currentContent += tokens[index];
        setContentMessage(currentContent);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [status]);

  return (
    <>
      <Message from={message.role}>
        <MessageAvatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed=AI`} name="AI" />
        {status && status === 'streaming' && (
          <MessageContent>
            <Reasoning isStreaming={status === 'streaming'}>
              <ReasoningTrigger title="Thinking" />
              <ReasoningContent>{contentReasoning}</ReasoningContent>
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
      {message.createdAt && (
        <span className="text-muted-foreground block w-full text-left text-xs italic">{dayjs(message.createdAt).format('YYYY-MM-DD HH:mm')}</span>
      )}
    </>
  );
}

export default AIMessageComponent;