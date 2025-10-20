'use client'

import { Search } from "lucide-react";
import { Input } from "./input";

const HeaderSearch = () => {
  return (
    <div className="flex-1 max-w-md mx-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search courses, topics..."
          className="pl-10 bg-input-background"
        />
      </div>
    </div>
  );
}

export default HeaderSearch;