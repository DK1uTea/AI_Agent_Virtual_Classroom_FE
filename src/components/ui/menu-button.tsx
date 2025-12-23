'use client'
import { Menu } from "lucide-react";
import { Button } from "./button";
import { useHeaderSidebarStore } from "@/stores/header-sidebar-store";
import { useShallow } from "zustand/shallow";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MenuButton = () => {
  const {
    isOpen,
    onOpen,
    onClose
  } = useHeaderSidebarStore(useShallow((state) => ({
    isOpen: state.isOpen,
    onOpen: state.onOpen,
    onClose: state.onClose,
  })))

  const pathName = usePathname();

  const isLessonPage = pathName.startsWith('/lesson');
  const isQuizPage = pathName.startsWith('/quiz');

  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      className={cn('lg:hidden', { 'hidden': isLessonPage || isQuizPage })}
      onClick={() => {
        isOpen ? onClose() : onOpen()
      }}
    >
      <Menu className="h-5 w-5" />
    </Button>
  );
}

export default MenuButton;