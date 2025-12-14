'use client'

import { AIChatReq } from "@/apis/requests/ai-req";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ui/shadcn-io/ai/conversation";
import { PromptInput, PromptInputButton, PromptInputSubmit, PromptInputTextarea, PromptInputToolbar, PromptInputTools } from "@/components/ui/shadcn-io/ai/prompt-input";
import { useAIStore } from "@/stores/ai-store";
import { useAuthStore } from "@/stores/auth-store";
import { useLessonStore } from "@/stores/lesson-store";
import { FormEventHandler, useEffect, useMemo, useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";
import UserMessageComponent from "./user-message-component";
import AIMessageComponent from "./ai-message-component";
import { MessageType } from "@/types/chat-types";
import dayjs from "dayjs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MicIcon } from "lucide-react";
import { useAIChat } from "@/hooks/useAIAgent";
import { useGetHistoryLessonChat } from "@/hooks/useGetHistoryLessonChat";
import { Skeleton } from "@/components/ui/skeleton";



// const models = [
//   { id: 'normal', name: 'AI-Agent lỏng tay' },
//   { id: 'deep', name: 'AI-Agent hết ngọn' },
// ];

const ConversationContentSkeleton = () => {
  return (
    <ConversationContent>
      <div className="flex flex-col gap-6">
        <div className="flex w-full items-end gap-2">
          <Skeleton className="size-8 flex-shrink-0 rounded-full" />
          <div className="flex flex-col gap-2 max-w-[80%]">
            <Skeleton className="h-10 w-[200px] rounded-lg" />
          </div>
        </div>

        <div className="flex w-full flex-row-reverse items-end gap-2">
          <Skeleton className="size-8 flex-shrink-0 rounded-full" />
          <div className="flex flex-col items-end gap-2 max-w-[80%]">
            <Skeleton className="h-16 w-[280px] rounded-lg" />
          </div>
        </div>

        <div className="flex w-full items-end gap-2">
          <Skeleton className="size-8 flex-shrink-0 rounded-full" />
          <div className="flex flex-col gap-2 max-w-[80%] w-full">
            <Skeleton className="h-24 w-full rounded-lg" />
            <Skeleton className="h-4 w-[60%] rounded-lg" />
          </div>
        </div>
      </div>
    </ConversationContent>
  );
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
  console.log('Check Status: ', status);
  // const [model, setModel] = useState<string>(models[0].id)

  const chatQuery = useGetHistoryLessonChat({
    accessToken: accessToken,
    lessonId: String(currentLesson?.id),
  })

  const chatMutation = useAIChat(
    (res) => {
      setStatus('ready');
      const newAIMessage: MessageType = {
        role: 'assistant',
        value: res.reply,
        intent: res.intent,
      }
      console.log('New AI Message: ', newAIMessage);
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
      const newUserMessage: MessageType = {
        role: 'user',
        value: text,
        createdAt: dayjs().toISOString(),
      };
      chatMutation.mutate(data);
      setMessagesList((prev) => [...prev, newUserMessage]);
      setText('');
    }, 200);
  };

  useEffect(() => {
    if (chatQuery.data) {
      setMessagesList(chatQuery.data);
    }
  }, [chatQuery.data]);

  return (
    <div className="flex h-full flex-col rounded-lg outline-dashed outline-2 outline-muted-foreground/50">
      <ScrollArea className="flex-1 h-0 w-full">
        <div className="p-4">
          <Conversation className="w-full h-full">
            {chatQuery.isLoading && (
              <ConversationContentSkeleton />
            )}
            {!chatQuery.isLoading && (
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
                {(chatMutation.isPending || status === 'streaming') && (
                  <AIMessageComponent status={status} message={{
                    role: 'assistant',
                    value: 'Let me think about this step by step...Please wait until I finish.',
                  }} />
                )}
                {(chatMutation.isError || status === 'error') && (
                  <AIMessageComponent status={status} message={{
                    role: 'assistant',
                    value: 'An error occurred while generating the response. Please try again :((',
                  }} />
                )}
              </ConversationContent>
            )}
            <ConversationScrollButton />
          </Conversation>
        </div>
      </ScrollArea>
      <div className="w-full p-4">
        <PromptInput onSubmit={handleSubmit}>
          <PromptInputTextarea
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setText(e.target.value);
              setStatus('ready');
            }}
            value={text}
            placeholder="Type your message..."
            disabled={chatQuery.isLoading || status === 'streaming'}
          />
          <PromptInputToolbar>
            <PromptInputTools>
              <PromptInputButton>
                <MicIcon size={16} />
                <span>Voice</span>
              </PromptInputButton>
              {/* <PromptInputModelSelect onValueChange={setModel} value={model}>
                <PromptInputModelSelectTrigger>
                  <PromptInputModelSelectValue />
                </PromptInputModelSelectTrigger>
                <PromptInputModelSelectContent>
                  {models.map((model) => (
                    <PromptInputModelSelectItem key={model.id} value={model.id}>
                      {model.name}
                    </PromptInputModelSelectItem>
                  ))}
                </PromptInputModelSelectContent>
              </PromptInputModelSelect> */}
            </PromptInputTools>
            <PromptInputSubmit disabled={!text} status={status} />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  );
};

export default ChatTab;