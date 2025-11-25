import { ReactNode } from "react";

export type Message = {
  id: string | number;
  role: 'user' | 'assistant';
  value: string | string[];
  timestamp?: string;
}