'use client'

import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ui/shadcn-io/ai/conversation";
import { Message, MessageAvatar, MessageContent } from "@/components/ui/shadcn-io/ai/message";
import { PromptInput, PromptInputSubmit, PromptInputTextarea, PromptInputToolbar } from "@/components/ui/shadcn-io/ai/prompt-input";
import { Response } from "@/components/ui/shadcn-io/ai/response";
import { useAuthStore } from "@/stores/auth-store";
import { FormEventHandler, useEffect, useState, type ChangeEvent } from "react";
import { useShallow } from "zustand/shallow";

const tokens = [
  '### Hello',
  ' World',
  '\n\n',
  'This',
  ' is',
  ' a',
  ' **mark',
  'down',
  '**',
  ' response',
  ' from',
  ' an',
  ' AI',
  ' model',
  '.',
  '\n\n',
  '---',
  '\n\n',
  '## Tables',
  '\n\n',
  '| Column 1',
  ' | Column 2',
  ' | Column 3',
  ' |',
  '\n',
  '|----------|----------|----------|',
  '\n',
  '| Row 1, Col 1',
  ' | Row 1, Col 2',
  ' | Row 1, Col 3',
  ' |',
  '\n',
  '| Row 2, Col 1',
  ' | Row 2, Col 2',
  ' | Row 2, Col 3',
  ' |',
  '\n',
  '| Row 3, Col 1',
  ' | Row 3, Col 2',
  ' | Row 3, Col 3',
  ' |',
  '\n\n',
  '## Blockquotes',
  '\n\n',
  '> This',
  ' is',
  ' a',
  ' blockquote.',
  ' It',
  ' can',
  ' contain',
  ' multiple',
  ' lines',
  ' and',
  ' **formatted**',
  ' text.',
  '\n',
  '>',
  '\n',
  '> It',
  ' can',
  ' even',
  ' have',
  ' multiple',
  ' paragraphs.',
  '\n\n',
  '## Inline',
  ' Code',
  '\n\n',
  'Here',
  ' is',
  ' some',
  ' text',
  ' with',
  ' `inline',
  ' code`',
  ' in',
  ' the',
  ' middle',
  ' of',
  ' a',
  ' sentence.',
  ' You',
  ' can',
  ' also',
  ' use',
  ' `const',
  ' x',
  ' =',
  ' 42`',
  ' for',
  ' variable',
  ' declarations.',
  '\n\n',
  '## Code',
  ' Blocks',
  '\n\n',
  '```',
  'javascript',
  '\n',
  'const',
  ' greeting',
  ' = ',
  "'Hello, world!'",
  ';',
  '\n',
  'console',
  '.',
  'log',
  '(',
  'greeting',
  ')',
  ';',
  '\n',
  '```',
  '\n\n',
  '## Math',
  '\n\n',
  'It',
  ' also',
  ' supports',
  ' math',
  ' equations',
  ', ',
  'like',
  ' this',
  ' inline',
  ' one',
  ': ',
  '$',
  'E',
  ' = ',
  'mc',
  '^2',
  '$',
  '.',
  '\n\n',
  'And',
  ' here',
  ' is',
  ' a',
  ' display',
  ' equation',
  ' for',
  ' the',
  ' quadratic',
  ' formula',
  ':',
  '\n\n',
  '$$',
  '\n',
  'x',
  ' = ',
  '\\frac',
  '{',
  '-b',
  ' \\pm',
  ' \\sqrt',
  '{',
  'b^2',
  ' -',
  ' 4ac',
  '}',
  '}',
  '{',
  '2a',
  '}',
  '\n',
  '$$',
  '\n\n',
  '## Links',
  ' and',
  ' Lists',
  '\n\n',
  "Here's",
  ' a',
  ' [',
  'link',
  '](',
  'https://example.com',
  ')',
  ' and',
  ' some',
  ' more',
  ' text',
  ' with',
  ' an',
  ' unordered',
  ' list',
  ':',
  '\n\n',
  '-',
  ' Item',
  ' one',
  '\n',
  '-',
  ' Item',
  ' two',
  '\n',
  '-',
  ' Item',
  ' three',
  '\n\n',
  '## Ordered',
  ' Lists',
  '\n\n',
  '1.',
  ' First',
  ' item',
  '\n',
  '2.',
  ' Second',
  ' item',
  '\n',
  '3.',
  ' Third',
  ' item',
];

const ChatTab = () => {

  const {
    user
  } = useAuthStore(useShallow((state) => ({
    user: state.user,
  })))

  const [text, setText] = useState<string>("");
  const [status, setStatus] = useState<
    'submitted' | 'streaming' | 'ready' | 'error'
  >('ready');

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!text) {
      return;
    }
    setStatus('submitted');
    setTimeout(() => {
      setStatus('streaming');
    }, 200);
    setTimeout(() => {
      setStatus('ready');
      setText('');
    }, 2000);
  };

  const [content, setContent] = useState('');
  useEffect(() => {
    let currentContent = '';
    let index = 0;
    const interval = setInterval(() => {
      if (index < tokens.length) {
        currentContent += tokens[index];
        setContent(currentContent);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1">
        <div className="w-full p-8">
          <Conversation className="w-full h-full">
            <ConversationContent>
              <Message from="user">
                <MessageAvatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} name="User" />
                <MessageContent>Hello, how can I help you today?</MessageContent>
              </Message>
              <Message from="assistant">
                <MessageAvatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed=AI`} name="AI" />
                <MessageContent>
                  <Response className="max-h-[500px] overflow-y-auto">
                    {content}
                  </Response>
                </MessageContent>
              </Message>
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
        </div>
      </div>
      <div>
        <div className="w-full p-8">
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