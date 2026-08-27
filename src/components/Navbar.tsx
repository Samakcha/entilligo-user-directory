"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#CBE2FE] bg-[#FFFFFF]/90 backdrop-blur-md transition-colors duration-300 dark:border-[#1e40d4] dark:bg-[#10288C]/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5 sm:px-8">
        <Link
          href="/"
          className="group flex items-center transition hover:opacity-90"
        >
          <div>
            <span className="font-sans font-bold text-lg tracking-tight text-[#10288C] dark:text-[#FFFFFF]">
              Entelligo
            </span>
            <span className="ml-1.5 font-sans font-semibold text-xs uppercase tracking-wider text-[#10288C]/70 dark:text-[#CBE2FE]/80">
              Directory
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
