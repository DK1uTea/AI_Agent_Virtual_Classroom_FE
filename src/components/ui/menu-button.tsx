'use client'
import { Menu } from "lucide-react";
import { Button } from "./button";
import { useHeaderSidebarStore } from "@/stores/header-sidebar-store";
import { useShallow } from "zustand/shallow";

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

  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      className="lg:hidden"
      onClick={() => {
        isOpen ? onClose() : onOpen()
      }}
    >
      <Menu className="h-5 w-5" />
    </Button>
  );
}

export default MenuButton;