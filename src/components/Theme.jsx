import React, { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const Theme = () => {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  if (!mounted) return null;

  return (
    <div className="">
      <button
        onClick={toggleTheme}
        className={`
            relative flex items-center justify-center
            w-10 h-6 rounded-full
            bg-gradient-to-br from-gray-400 to-primary-500
            dark:from-indigo-600 dark:to-blue-800
            shadow-lg hover:shadow-xl
            transition-all duration-200
            hover:scale-110
            group
          `}
        aria-label="Toggle theme"
      >
        {/* Sun */}
        <SunIcon
          className={`
            w-5 h-5 text-yellow-100 absolute
            transition-all duration-300
            ${
              theme === "light"
                ? "opacity-100 rotate-0"
                : "opacity-0 -rotate-180 scale-0"
            }
            group-hover:text-white
          `}
        />

        {/* Moon  */}
        <MoonIcon
          className={`
            w-5 h-5 text-blue-100 absolute
            transition-all duration-300
            ${
              theme === "dark"
                ? "opacity-100 rotate-0"
                : "opacity-0 rotate-180 scale-0"
            }
            group-hover:text-white
          `}
        />

        {/* Animatioms cards */}
        <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-pulse-slow" />
        <div className="absolute inset-1 rounded-full border-2 border-white/10 animate-ping-slow" />
      </button>
    </div>
  );
};

export default Theme;
