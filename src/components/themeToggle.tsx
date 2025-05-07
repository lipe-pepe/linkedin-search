"use client";

import { useTheme } from "next-themes";
import { LuMoon, LuSun } from "react-icons/lu";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div
      className="cursor-pointer text-[var(--color-neutral)] h-6 w-6 flex justify-center items-center"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <LuSun className="size-full" />
      ) : (
        <LuMoon className="size-full" />
      )}
    </div>
  );
};

export default ThemeToggle;
