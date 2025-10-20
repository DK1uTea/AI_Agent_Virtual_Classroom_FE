'use client'
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { X } from "lucide-react";
import MenuItems from "./menu-items";
import { useHeaderSidebarStore } from "@/stores/header-sidebar-store";
import { useShallow } from "zustand/shallow";




const Sidebar = () => {
  const {
    isOpen,
    onClose
  } = useHeaderSidebarStore(useShallow((state) => ({
    isOpen: state.isOpen,
    onClose: state.onClose,
  })))

  return (
    <>
      {/* Overlay for mobile */}
      {
        isOpen && (
          <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden">
          </div>
        )
      }

      {/* Sidebar */}
      <aside className={cn('fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-background transition-transform duration-300 lg:translate-x-0', isOpen ? 'translate-x-0' : '-translate-x-full')}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4 lg:hidden">
            <span>Menu</span>
            <Button variant={"ghost"} size={"icon"} onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <MenuItems />
          <div className="border-t p-4">
            <div className="rounded-lg bg-accent p-3">
              <p className="mb-2">💡 Study tips</p>
              <p className="text-muted-foreground">
                Study regularly every day to maintain your streak!
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;