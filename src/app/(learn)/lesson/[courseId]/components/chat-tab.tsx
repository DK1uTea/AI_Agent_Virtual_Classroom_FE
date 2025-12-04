'use client'

import { aiApis } from "@/apis/gateways/ai-apis";
import { AIChatReq } from "@/apis/requests/ai-req";
import { AIChatRes } from "@/apis/responses/ai-res";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ui/shadcn-io/ai/conversation";
import { Message, MessageAvatar, MessageContent } from "@/components/ui/shadcn-io/ai/message";
import { PromptInput, PromptInputSubmit, PromptInputTextarea, PromptInputToolbar } from "@/components/ui/shadcn-io/ai/prompt-input";
import { Response } from "@/components/ui/shadcn-io/ai/response";
import { getErrorJson, isHTTPError } from "@/lib/exception/http-error";
import { useAIStore } from "@/stores/ai-store";
import { useAuthStore } from "@/stores/auth-store";
import { useLessonStore } from "@/stores/lesson-store";
import { useMutation } from "@tanstack/react-query";
import { on } from "events";
import { FormEventHandler, useEffect, useMemo, useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";
import UserMessageComponent from "./user-message-component";
import AIMessageComponent from "./ai-message-component";
import { MessageType } from "@/types/chat-types";
import dayjs from "dayjs";

const useAIChat = (
  onSuccessExtra?: (res: AIChatRes) => void,
  onErrorExtra?: (error: Error) => void
) => {
  return useMutation({
    mutationFn: async (data: AIChatReq) => {
      const res = await aiApis.AIChat(data);
      return res;
    },
    onSuccess: (res) => {
      console.log('AI Chat Response: ', res);
      onSuccessExtra?.(res);
    },
    onError: (error) => {
      onErrorExtra?.(error);
      console.error('AI Chat Error: ', error);
      if (isHTTPError(error)) {
        getErrorJson(error).then((res) => {
          toast.error(res.message || 'An error occurred while processing your request.');
        })
      }
    },
  });
}

const ChatTab = () => {

  const {
    accessToken,
  } = useAuthStore(useShallow((state) => ({
    accessToken: state.accessToken,
  })));

  const {
    currentLesson
  } = useLessonStore(useShallow((state) => ({
    currentLesson: state.currentLesson,
  })))

  const {
    messagesList,
    setMessagesList
  } = useAIStore(useShallow((state) => ({
    messagesList: state.messagesList,
    setMessagesList: state.setMessagesList,
  })))

  const [text, setText] = useState<string>("");
  const [status, setStatus] = useState<
    'submitted' | 'streaming' | 'ready' | 'error'
  >('ready');

  const chatMutation = useAIChat(
    (res) => {
      setStatus('ready');
      const newAIMessage: MessageType = {
        role: 'assistant',
        value: res.reply,
        intent: res.intent,
      }
      setMessagesList((prev) => [...prev, newAIMessage]);
    },
    (error) => {
      setStatus('error');
    }
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!text) {
      return;
    }
    setStatus('submitted');
    setTimeout(() => {
      setStatus('streaming');
      const data: AIChatReq = {
        accessToken: accessToken || '',
        lessonId: String(currentLesson?.id) || '',
        userMessage: text
      };
      chatMutation.mutate(data);
      const newUserMessage: MessageType = {
        role: 'user',
        value: text,
        createdAt: dayjs().toISOString(),
      };
      setMessagesList((prev) => [...prev, newUserMessage]);
      setText('');
    }, 200);
  };

  return (
    <div className="flex h-full flex-col rounded-lg outline-dashed outline-2 outline-muted-foreground/50">
      <div className="flex-1">
        <div className="w-full p-4">
          <Conversation className="w-full h-full">
            <ConversationContent>
              {messagesList.map((message, index) => {
                if (message.role === 'user') {
                  return (
                    <UserMessageComponent key={`user-message-${index}`} message={message} />
                  )
                }
                if (message.role === 'assistant') {
                  return (
                    <AIMessageComponent key={`ai-message-${index}`} message={message} />
                  )
                }
              })}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
        </div>
      </div>
      <div>
        <div className="w-full p-4">
          <PromptInput onSubmit={handleSubmit}>
            <PromptInputTextarea
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
              value={text}
              placeholder="Type your message..."
            />
            <PromptInputToolbar>
              <PromptInputSubmit disabled={!text} status={status} />
            </PromptInputToolbar>
          </PromptInput>
        </div>
      </div>
    </div>
  );
};

export default ChatTab;