import { ModeToggle } from "../mode-toggle";
import { cn } from "@/lib/utils";
import HeaderComponent from "./header-component";

const Header = async () => {

  return (
    <div className={cn('flex items-center px-4 py-2 justify-between md:px-6 md:py-4')}>
      <h1>AI Virtual Classroom</h1>
      <div className={cn('flex items-center gap-5')}>
        <HeaderComponent />
        <ModeToggle />
      </div>
    </div>
  );
}
export default Header;