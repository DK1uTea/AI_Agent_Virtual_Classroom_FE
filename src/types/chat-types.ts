export type MessageType = {
  role: 'user' | 'assistant';
  value: string;
  intent?: 'normal' | 'deep';
  createdAt?: string;
}