'use client'
import { BarChart3, BookOpen, Home, Settings, User } from "lucide-react";
import { ScrollArea } from "./scroll-area";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./button";
import { cn } from "@/lib/utils";

type MenuItemProps = {
  onClose?: () => void
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'course-catalog', label: 'Course Catalog', icon: BookOpen },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const MenuItems = ({ onClose }: MenuItemProps) => {
  const pathName = usePathname();
  const router = useRouter();

  return (
    <ScrollArea className="flex-1 px-3">
      <div className="space-y-1 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathName === `/${item.id}`;
          return (
            <Button
              key={item.id}
              variant={isActive ? 'secondary' : 'ghost'}
              className={cn('w-full justify-start gap-2', isActive && 'bg-secondary', 'hover:bg-secondary hover:cursor-pointer')}
              onClick={() => {
                router.push(`/${item.id}`);
                onClose?.();
              }}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Button>
          )
        })}
      </div>
    </ScrollArea>
  );
}

export default MenuItems;