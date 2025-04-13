import { useTheme } from "next-themes";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../primitives/Dropdown";
import { Button } from "../primitives/Button";
import { Moon, Sun } from "lucide-react";
import ThemeColor from "../theme/ThemeColor";

const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="w-full py-2 px-4 flex items-center justify-between bg-bg-light-pri dark:bg-bg-dark-pri border-b border-stroke-light-ter dark:border-stroke-dark-ter">
      <span className="text-sm font-semibold text-text-b-pri dark:text-text-w-pri">
        POLONIUM
      </span>

      {/* Theme color */}
      <div className="flex items-center gap-4">
        <ThemeColor />

        {/* TODO: need to change this button later */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="seconodary" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-bg-light-pri dark:bg-bg-dark-pri border-stroke-light-ter dark:border-stroke-dark-ter"
          >
            <DropdownMenuItem
              onClick={() => setTheme("light")}
              className="cursor-pointer hover:bg-bg-light-sec dark:hover:bg-bg-dark-sec text-sm text-text-w-sec dark:text-text-w-sec"
            >
              Light
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("dark")}
              className="cursor-pointer hover:bg-bg-light-sec dark:hover:bg-bg-dark-sec text-sm text-text-w-sec dark:text-text-w-sec"
            >
              Dark
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
