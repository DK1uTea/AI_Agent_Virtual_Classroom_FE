'use client'
import { Menu } from "lucide-react";
import { Button } from "./button";

const MenuButton = () => {
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      className="lg:hidden"
      onClick={() => {
        console.log("on click Menu");
      }}
    >
      <Menu h-5 w-5 />
    </Button>
  );
}

export default MenuButton;