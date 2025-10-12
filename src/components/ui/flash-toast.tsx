'use client';

import { useEffect } from "react";
import { toast } from "sonner";

type FlashToastProps = {
  toastType: 'success' | 'error' | 'info';
  message: string;
};

const FlashToast = ({ toastType, message }: FlashToastProps) => {
  useEffect(() => {
    toast[toastType](message);
  }, []);

  return null;
};

export default FlashToast;