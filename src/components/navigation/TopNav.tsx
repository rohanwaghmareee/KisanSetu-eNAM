import { useState, useEffect } from "react";
import { Sun, Moon, Star } from "lucide-react";
import Link from "next/link";

export function TopNav() {
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme-mode");
    if (saved) {
      setIsNight(saved === "night");
    } else {
      const systemNight = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsNight(systemNight);
    }
  }, []);

  const toggleTheme = () => {
    setIsNight(!isNight);
    localStorage.setItem("theme-mode", isNight ? "day" : "night");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-glass/60 border-b border-white/10 py-4">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <h1 className="text-2xl font-serif font-light tracking-wider text-primary">
          Happy Birthday
        </h1>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all ${
              isNight
                ? "bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600"
                : "bg-rose-100/20 text-rose-300 hover:bg-rose-100"
            }`}
            aria-label={isNight ? "Switch to day mode" : "Switch to night mode"}
          >
            <Sun className={isNight ? "hidden" : ""} />
            <Moon className={isNight ? "" : "hidden"} />
            <Star className="text-yellow-400" />
          </button>
          <span className="text-sm text-muted-foreground">
            {isNight ? "Cosmic Night" : "Dreamy Dawn"}
          </span>
        </div>
      </div>
    </nav>
  );
}