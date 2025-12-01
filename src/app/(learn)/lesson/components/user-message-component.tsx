import { Message, MessageAvatar, MessageContent } from "@/components/ui/shadcn-io/ai/message";
import { useAuthStore } from "@/stores/auth-store";
import { MessageType } from "@/types/chat-types";
import { useShallow } from "zustand/shallow";

type UserMessageComponentProps = {
  message: MessageType;
}

const UserMessageComponent = ({ message }: UserMessageComponentProps) => {
  const {
    user
  } = useAuthStore(useShallow((state) => ({
    user: state.user,
  })))

  return (
    <Message from={message.role}>
      <MessageAvatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} name="User" />
      <MessageContent>{message.value}</MessageContent>
    </Message>
  );
}

export default UserMessageComponent;