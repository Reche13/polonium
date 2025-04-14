"use client";

import { useState } from "react";
import { Button } from "@/components/primitives/Button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/primitives/Dropdown";
import clsx from "clsx";

const colorThemes = [
  { name: "Green", value: "green", color: "#10b981" },
  { name: "Teal", value: "teal", color: "#14b8a6" },
  { name: "Blue", value: "blue", color: "#3b82f6" },
  { name: "Indigo", value: "indigo", color: "#6366f1" },
  { name: "Violet", value: "violet", color: "#a855f7" },
  { name: "Yellow", value: "yellow", color: "#f59e0b" },
  { name: "Orange", value: "orange", color: "#f97316" },
  { name: "Red", value: "red", color: "#ef4444" },
  { name: "Pink", value: "pink", color: "#ec4899" },
];

export default function ColorPicker() {
  const [colorTheme, setColorTheme] = useState("green");

  const handleChangeTheme = (theme: string) => {
    setColorTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  const current =
    colorThemes.find((c) => c.value === colorTheme) ?? colorThemes[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="seconodary"
          className="flex items-center gap-2 px-3 py-2"
        >
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: current?.color }}
          ></span>
          <span className="capitalize text-sm">{current?.name}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-48 bg-bg-light-pri dark:bg-bg-dark-pri border-stroke-light-ter dark:border-stroke-dark-ter"
      >
        {colorThemes.map((color) => (
          <DropdownMenuItem
            key={color.value}
            onClick={() => handleChangeTheme(color.value)}
            className={clsx(
              "flex items-center gap-2 cursor-pointer text-sm",
              "hover:bg-bg-light-sec dark:hover:bg-bg-dark-sec",
              "text-text-w-sec dark:text-text-w-sec"
            )}
          >
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: color.color }}
            ></span>
            {color.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
