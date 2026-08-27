import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";

export default function NotFound() {
  return (
    <div className="min-h-screen font-sans font-normal bg-[#f8fafc] text-slate-900 transition-colors duration-300 dark:bg-[#08123e] dark:text-slate-100">
      <Navbar />

      <main className="flex min-h-[calc(100vh-65px)] items-center justify-center px-6">
        <div className="max-w-md text-center">
          <span className="inline-flex items-center rounded-full bg-[#eff6ff] px-3.5 py-1 font-sans font-semibold text-xs text-[#2563eb] dark:bg-[#1837b5] dark:text-[#cbe2fe]">
            Error 404
          </span>

          <h1 className="mt-4 font-sans font-bold text-4xl text-[#050b20] dark:text-white">
            User not found<span className="text-[#2563eb]">.</span>
          </h1>

          <p className="mt-3 font-sans font-normal text-slate-500 dark:text-slate-300">
            The user you are looking for does not exist in this directory.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-xl font-sans font-medium bg-[#050b20] px-6 py-3.5 text-sm text-white transition-all hover:bg-[#121c3b] dark:bg-[#cbe2fe] dark:text-[#10288c] dark:hover:bg-white shadow-sm"
          >
            <ArrowLeft className="size-4" />
            Back to directory
          </Link>
        </div>
      </main>
    </div>
  );
}