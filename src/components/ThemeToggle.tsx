"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [isIlluminating, setIsIlluminating] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setMounted(true);
      const saved = localStorage.getItem("theme");
      const shouldBeDark = saved === "dark";
      if (shouldBeDark) {
        document.documentElement.classList.add("dark");
        setIsDark(true);
      } else {
        document.documentElement.classList.remove("dark");
        setIsDark(false);
      }
    });
  }, []);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Visual cord pull & bulb flare animation feedback
    setIsPulling(true);
    setIsIlluminating(true);
    setTimeout(() => setIsPulling(false), 300);
    setTimeout(() => setIsIlluminating(false), 800);

    const currentlyDark = document.documentElement.classList.contains("dark");
    const nextDark = !currentlyDark;

    const applyThemeChange = () => {
      if (nextDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      setIsDark(nextDark);
    };

    // Check reduced motion
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!document.startViewTransition || isReducedMotion) {
      applyThemeChange();
      return;
    }

    // Get exact bulb button center coordinates (x, y)
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Calculate max radius from bulb center to furthest screen corner
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      applyThemeChange();
    });

    transition.ready.then(() => {
      // Light / Dark wave always originates at 0px at bulb location (x, y) and expands outwards to cover the screen
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 700,
          easing: "cubic-bezier(0.25, 1, 0.5, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  if (!mounted) {
    return (
      <div className="size-12 rounded-full border border-slate-200 dark:border-slate-800 bg-amber-500/10 opacity-0" />
    );
  }

  return (
    <div className="relative inline-flex flex-col items-center">
      {/* Hanging Cord & Socket Fixture Detail */}
      <div className="h-3 w-0.5 bg-gradient-to-b from-slate-400 to-slate-500 dark:from-slate-600 dark:to-slate-700 rounded-t" />

      {/* Main Lightbulb Toggle Button */}
      <button
        type="button"
        onClick={handleToggle}
        aria-label={isDark ? "Light up the room" : "Switch off the light"}
        title={isDark ? "Light up the room" : "Switch off the light"}
        className={`group relative flex size-12 items-center justify-center rounded-full border transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#CBE2FE] ${
          isPulling ? "scale-90 translate-y-1" : "hover:scale-105 active:scale-95"
        } ${
          isIlluminating ? "scale-110 border-[#CBE2FE] shadow-[0_0_40px_rgba(203,226,254,0.9)]" : ""
        } ${
          isDark
            ? "border-[#1e40d4] bg-[#0c1f70] text-[#CBE2FE] shadow-md shadow-[#0a164d]/60 hover:border-[#CBE2FE] hover:bg-[#142e99] hover:text-[#FFFFFF]"
            : "border-[#CBE2FE] bg-gradient-to-b from-[#FFFFFF] via-[#eaf3ff] to-[#CBE2FE] text-[#10288C] shadow-xl shadow-[#10288C]/15 hover:border-[#10288C]/40 hover:shadow-[#10288C]/25"
        }`}
      >
        {/* Ambient Glow Aura when Lit (Light mode) */}
        {!isDark && (
          <>
            <span className="absolute inset-0 rounded-full bg-[#CBE2FE]/60 blur-md transition-all duration-500 group-hover:bg-[#CBE2FE]/80 group-hover:blur-lg" />
            <span className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-[#CBE2FE]/40 via-[#FFFFFF]/50 to-[#CBE2FE]/40 blur-md animate-pulse" />
          </>
        )}

        {/* Ambient Night Glow (Dark mode) */}
        {isDark && (
          <span className="absolute inset-0 rounded-full bg-[#CBE2FE]/20 blur-sm transition-all duration-500 group-hover:bg-[#CBE2FE]/40 group-hover:blur-md" />
        )}

        {/* Flare Flash when clicked */}
        {isIlluminating && (
          <span className="absolute -inset-4 rounded-full bg-[#CBE2FE]/60 blur-xl animate-ping" />
        )}

        {/* Bulb Fixture / Detailed SVG Icon */}
        <div className="relative z-10 flex items-center justify-center">
          <svg
            className={`size-7 transition-all duration-300 ${
              isIlluminating
                ? "scale-110 text-[#FFFFFF] drop-shadow-[0_0_12px_rgba(203,226,254,1)]"
                : isDark
                ? "text-[#CBE2FE] group-hover:text-[#FFFFFF] group-hover:rotate-12"
                : "text-[#10288C] group-hover:-rotate-12"
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Bulb Glass Dome */}
            <path
              d="M9 18h6m-5 3h4m-5.5-6.5A7 7 0 1 1 15.5 15C14.3 15.8 13.5 17 13.5 18h-3c0-1-.8-2.2-2-3Z"
              fill={
                isIlluminating
                  ? "#CBE2FE"
                  : isDark
                  ? "rgba(24, 55, 181, 0.7)"
                  : "rgba(203, 226, 254, 0.85)"
              }
              className="transition-colors duration-300"
            />

            {/* Inner Tungsten Filament */}
            <path
              d="M10 13l2-3 2 3"
              stroke={isDark ? "#CBE2FE" : "#10288C"}
              strokeWidth="1.75"
              fill="none"
              className="opacity-100 drop-shadow-[0_0_4px_rgba(203,226,254,0.9)]"
            />

            {/* Radiant Light Rays when ON or Illuminating */}
            {(!isDark || isIlluminating) && (
              <g className="animate-fade-in">
                <line x1="12" y1="1.5" x2="12" y2="3" stroke={isDark ? "#CBE2FE" : "#10288C"} strokeWidth="2" strokeLinecap="round" />
                <line x1="4.5" y1="4.5" x2="5.6" y2="5.6" stroke={isDark ? "#CBE2FE" : "#10288C"} strokeWidth="2" strokeLinecap="round" />
                <line x1="19.5" y1="4.5" x2="18.4" y2="5.6" stroke={isDark ? "#CBE2FE" : "#10288C"} strokeWidth="2" strokeLinecap="round" />
                <line x1="1.5" y1="11" x2="3" y2="11" stroke={isDark ? "#CBE2FE" : "#10288C"} strokeWidth="2" strokeLinecap="round" />
                <line x1="21" y1="11" x2="22.5" y2="11" stroke={isDark ? "#CBE2FE" : "#10288C"} strokeWidth="2" strokeLinecap="round" />
              </g>
            )}
          </svg>
        </div>
      </button>
    </div>
  );
}
