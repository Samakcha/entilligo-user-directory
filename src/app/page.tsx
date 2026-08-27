"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, Users, ArrowUpRight, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Navbar } from "@/components/Navbar";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    city: string;
  };
  company: {
    name: string;
  };
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );

      if (!response.ok) {
        throw new Error("Unable to fetch users.");
      }

      const data: User[] = await response.json();
      setUsers(data);
    } catch {
      setError("We couldn't load the directory. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch users.");
        }

        return response.json() as Promise<User[]>;
      })
      .then((data) => {
        if (!cancelled) {
          setUsers(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("We couldn't load the directory. Please try again.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredUsers = useMemo(() => {
    const search = query.toLowerCase().trim();

    if (!search) {
      return users;
    }

    return users.filter((user) =>
      [user.name, user.username, user.email, user.company.name, user.address.city]
        .join(" ")
        .toLowerCase()
        .includes(search),
    );
  }, [query, users]);

  return (
    <div className="min-h-screen font-sans font-normal bg-[#f8fafc] text-slate-900 transition-colors duration-300 dark:bg-[#08123e] dark:text-slate-100">
      <Navbar />

      <main>
        {/* Hero Section with Aurora Mesh & Dot Grid Pattern */}
        <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-[#e8f1fd] via-[#f3f7fe] to-[#f8fafc] transition-colors duration-300 dark:border-[#1e40d4] dark:from-[#0b1854] dark:via-[#0e2172] dark:to-[#08123e]">
          {/* Glowing Aurora Ambient Blobs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="pointer-events-none absolute -left-20 -top-20 size-96 rounded-full bg-[#cbe2fe]/70 blur-3xl dark:bg-[#1837b5]/50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.7, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="pointer-events-none absolute -right-20 -top-20 size-96 rounded-full bg-[#cbe2fe]/70 blur-3xl dark:bg-[#1e40d4]/50"
          />

          {/* Dot Matrix Grid Layer */}
          <div className="pointer-events-none absolute inset-0 bg-hero-dots opacity-80" />

          <div className="relative mx-auto max-w-6xl px-6 py-16 sm:px-8">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              >
                <h1 className="font-sans font-bold text-4xl tracking-tight text-[#09122c] dark:text-white sm:text-5xl">
                  Find your people<span className="text-[#2563eb]">.</span>
                </h1>
                <p className="mt-4 max-w-xl font-sans font-normal text-base leading-7 text-slate-600 dark:text-slate-300">
                  Browse the team directory, explore member details, and discover
                  who is working across the organization.
                </p>
              </motion.div>

              {/* Directory Counter Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
                className="flex items-center gap-4 rounded-2xl border border-slate-200/90 bg-white/90 px-6 py-4 shadow-sm backdrop-blur-md dark:border-[#1e40d4] dark:bg-[#0c1f70]/90"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-[#eff6ff] text-[#2563eb] dark:bg-[#1837b5] dark:text-[#cbe2fe]">
                  <Users className="size-6" />
                </div>
                <div>
                  <p className="font-sans font-bold text-3xl text-[#09122c] dark:text-white">
                    {users.length}
                  </p>
                  <p className="font-sans font-normal text-xs text-slate-500 dark:text-slate-300">
                    directory members
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-10 sm:px-8">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mb-10 max-w-xl"
          >
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400 dark:text-slate-400" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, email, company, or city..."
              className="h-12 rounded-2xl font-sans font-normal bg-white pl-11 border-slate-200/80 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-[#2563eb] dark:bg-[#0c1f70] dark:border-[#1e40d4] dark:text-white dark:placeholder:text-slate-400"
              aria-label="Search users"
            />
          </motion.div>

          {loading && (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: [0.4, 0.9, 0.4], y: 0 }}
                  transition={{
                    opacity: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
                    y: { duration: 0.4, delay: index * 0.05 },
                  }}
                >
                  <Card className="rounded-3xl border-slate-200/80 bg-white p-3 sm:p-4 dark:border-[#1e40d4] dark:bg-[#0c1f70]">
                    <CardHeader className="p-2 sm:p-3">
                      <Skeleton className="size-14 rounded-full dark:bg-[#1837b5]" />
                      <Skeleton className="mt-5 h-6 w-40 dark:bg-[#1837b5]" />
                      <Skeleton className="h-4 w-28 dark:bg-[#1837b5]" />
                    </CardHeader>
                    <CardContent className="p-2 sm:p-3 space-y-4">
                      <Skeleton className="h-4 w-full dark:bg-[#1837b5]" />
                      <Skeleton className="h-4 w-4/5 dark:bg-[#1837b5]" />
                      <Skeleton className="mt-6 h-12 w-full rounded-2xl dark:bg-[#1837b5]" />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="rounded-2xl border-red-200 bg-red-50 dark:border-red-900/40 dark:bg-red-950/30">
                <CardContent className="flex flex-col items-start gap-4 p-6">
                  <div>
                    <h2 className="font-sans font-semibold text-red-950 dark:text-red-300">Something went wrong</h2>
                    <p className="mt-1 font-sans font-normal text-sm text-red-700 dark:text-red-400">{error}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => void loadUsers()}
                    className="inline-flex items-center gap-2 rounded-xl font-sans font-medium bg-red-950 px-4 py-2 text-sm text-white dark:bg-red-900 dark:hover:bg-red-800"
                  >
                    <RefreshCw className="size-4" />
                    Try again
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {!loading && !error && filteredUsers.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="rounded-2xl border-slate-200/80 bg-white dark:border-[#1e40d4] dark:bg-[#0c1f70]">
                <CardContent className="p-10 text-center">
                  <h2 className="font-sans font-semibold text-[#09122c] dark:text-white">No users found</h2>
                  <p className="mt-2 font-sans font-normal text-sm text-slate-500 dark:text-slate-300">
                    Try searching with a different name, company, or city.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {!loading && !error && filteredUsers.length > 0 && (
            <AnimatePresence mode="popLayout">
              <motion.div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {filteredUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
                    transition={{
                      duration: 0.4,
                      delay: Math.min(index * 0.04, 0.3),
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  >
                    <Card className="rounded-3xl border border-slate-200/80 bg-white p-3 sm:p-4 transition-shadow duration-300 hover:shadow-lg dark:border-[#1e40d4] dark:bg-[#0c1f70] dark:hover:shadow-[#050b20]/70">
                      <CardHeader className="p-2 sm:p-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex size-14 items-center justify-center rounded-full bg-[#050b20] font-sans font-semibold text-xl text-white dark:bg-[#cbe2fe] dark:text-[#10288c]">
                            {user.name.charAt(0)}
                          </div>
                          <span className="rounded-full bg-[#eff6ff] px-3.5 py-1.5 font-sans font-semibold text-xs text-[#2563eb] dark:bg-[#1837b5] dark:text-[#cbe2fe]">
                            {user.address.city}
                          </span>
                        </div>

                        <CardTitle className="pt-5 font-sans font-bold text-2xl text-[#050b20] dark:text-white">
                          {user.name}
                        </CardTitle>
                        <p className="font-sans font-medium text-base text-[#2563eb] dark:text-[#cbe2fe]">
                          @{user.username}
                        </p>
                      </CardHeader>

                      <CardContent className="p-2 sm:p-3 space-y-5">
                        <div className="space-y-2 font-sans font-normal text-base text-slate-500 dark:text-slate-300">
                          <p className="truncate">{user.email}</p>
                          <p className="truncate">{user.company.name}</p>
                        </div>

                        <Link
                          href={`/users/${user.id}`}
                          className="mt-6 flex h-12 items-center justify-center gap-2.5 rounded-2xl font-sans font-medium bg-[#050b20] px-5 text-base text-white transition-all hover:bg-[#121c3b] dark:bg-[#cbe2fe] dark:text-[#10288c] dark:hover:bg-white shadow-sm"
                        >
                          View profile
                          <ArrowUpRight className="size-5" />
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </section>
      </main>
    </div>
  );
}