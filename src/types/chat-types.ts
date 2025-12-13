export type MessageType = {
  id?: number;
  role: 'user' | 'assistant';
  value: string;
  intent?: 'normal' | 'deep';
  createdAt?: string;
}