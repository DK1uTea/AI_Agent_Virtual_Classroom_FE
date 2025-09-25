import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { cn } from "@/lib/utils";

const Header = () => {
  return (
    <div className={cn('flex items-center px-4 py-2 justify-between md:px-6 md:py-4')}>
      <h1>Restaurant System</h1>
      <div className={cn('flex items-center gap-5')}>
        <ul className="flex items-center gap-2">
          <li>
            <Link href={'/login'}>Login</Link>
          </li>
          <li>
            <Link href={'/register'}>Register</Link>
          </li>
        </ul>
        <ModeToggle />
      </div>
    </div>
  );
}
export default Header;