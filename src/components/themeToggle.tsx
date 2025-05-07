"use client";

import { useTheme } from "next-themes";
import { LuMoon, LuSun } from "react-icons/lu";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div
      className="p-2 cursor-pointer text-[var(--color-neutral)]"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <LuSun className="absolute h-6 w-6 scale-100 dark:scale-0" />
      <LuMoon className="absolute h-6 w-6 scale-0 dark:scale-100" />
    </div>
  );
};

export default ThemeToggle;
