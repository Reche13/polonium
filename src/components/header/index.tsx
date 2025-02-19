import { useTheme } from "next-themes";
import React from "react";

const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="w-full py-2 px-4 flex items-center justify-between bg-bg-light-pri dark:bg-bg-dark-pri border-b border-stroke-light-ter dark:border-stroke-dark-ter">
      <span className="text-sm font-semibold text-text-b-pri dark:text-text-w-pri">
        POLONIUM
      </span>

      {/* TODO: need to change this button later */}
      <div>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded"
        >
          {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </div>
  );
};

export default Header;
