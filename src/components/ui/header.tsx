import { ModeToggle } from "../mode-toggle";
import { cn } from "@/lib/utils";
import HeaderComponent from "./header-component";
import MenuButton from "./menu-button";
import Link from "next/link";
import HeaderSearch from "./header-search";

const Header = async () => {

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
        <MenuButton />
        <Link
          href={'/dashboard'}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span>AI</span>
          </div>
          <span className="hidden sm:inline-block">AI Virtual Classroom</span>
        </Link>
        <HeaderSearch />
        <HeaderComponent />
      </div>
    </header>
  );
}
export default Header;