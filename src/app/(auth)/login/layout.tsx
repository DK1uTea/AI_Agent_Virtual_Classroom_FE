import { ModeToggle } from "@/components/mode-toggle";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      {children}
    </main>
  );
};

export default Layout;