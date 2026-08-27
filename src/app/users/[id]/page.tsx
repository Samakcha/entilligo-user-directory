"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  Globe2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { motion } from "framer-motion";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export default function UserDetails() {
  const params = useParams();
  const id = params?.id as string;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json() as Promise<User>;
      })
      .then((data) => {
        if (!cancelled) {
          setUser(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (error) {
    notFound();
  }

  return (
    <div className="min-h-screen font-sans font-normal bg-[#f8fafc] text-slate-900 transition-colors duration-300 dark:bg-[#08123e] dark:text-slate-100">
      <Navbar />

      <main className="px-6 py-10 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 font-sans font-medium text-sm text-[#2563eb] transition-transform hover:-translate-x-1 dark:text-[#cbe2fe]"
            >
              <ArrowLeft className="size-4" />
              Back to directory
            </Link>
          </motion.div>

          {loading ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: [0.5, 0.9, 0.5], y: 0 }}
              transition={{ opacity: { repeat: Infinity, duration: 1.5 }, y: { duration: 0.4 } }}
            >
              <Card className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm dark:border-[#1e40d4] dark:bg-[#0c1f70]">
                <div className="flex items-center gap-5">
                  <Skeleton className="size-20 rounded-full dark:bg-[#1837b5]" />
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-28 dark:bg-[#1837b5]" />
                    <Skeleton className="h-8 w-48 dark:bg-[#1837b5]" />
                  </div>
                </div>
                <div className="mt-8 space-y-4">
                  <Skeleton className="h-6 w-36 dark:bg-[#1837b5]" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Skeleton key={i} className="h-16 rounded-2xl dark:bg-[#1837b5]" />
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ) : user ? (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            >
              <Card className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm dark:border-[#1e40d4] dark:bg-[#0c1f70]">
                <div className="bg-[#050b20] px-6 py-10 text-white sm:px-10 dark:bg-[#08123e] dark:border-b dark:border-[#1e40d4]">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    <motion.div
                      initial={{ scale: 0, rotate: -15 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.15 }}
                      className="flex size-20 items-center justify-center rounded-full bg-white font-sans font-semibold text-3xl text-[#050b20] dark:bg-[#cbe2fe] dark:text-[#10288c] shadow-md"
                    >
                      {user.name.charAt(0)}
                    </motion.div>

                    <div>
                      <span className="mb-3 inline-flex items-center rounded-full bg-[#eff6ff] px-3.5 py-1 font-sans font-semibold text-xs text-[#2563eb] dark:bg-[#1837b5] dark:text-[#cbe2fe]">
                        Team member
                      </span>
                      <h1 className="font-sans font-semibold text-3xl">{user.name}</h1>
                      <p className="mt-1 font-sans font-medium text-sm text-[#cbe2fe]">@{user.username}</p>
                    </div>
                  </div>
                </div>

                <CardHeader className="px-6 pt-8 sm:px-10">
                  <h2 className="font-sans font-bold text-xl text-[#050b20] dark:text-white">
                    Contact information
                  </h2>
                </CardHeader>

                <CardContent className="grid gap-5 px-6 pb-10 sm:grid-cols-2 sm:px-10">
                  <InfoItem
                    icon={<Mail className="size-5" />}
                    label="Email"
                    value={user.email}
                    delay={0.2}
                  />

                  <InfoItem
                    icon={<Phone className="size-5" />}
                    label="Phone"
                    value={user.phone}
                    delay={0.25}
                  />

                  <InfoItem
                    icon={<MapPin className="size-5" />}
                    label="Location"
                    value={`${user.address.city}, ${user.address.zipcode}`}
                    delay={0.3}
                  />

                  <InfoItem
                    icon={<Globe2 className="size-5" />}
                    label="Website"
                    value={user.website}
                    delay={0.35}
                  />

                  <InfoItem
                    icon={<Building2 className="size-5" />}
                    label="Company"
                    value={user.company.name}
                    delay={0.4}
                  />

                  <InfoItem
                    icon={<Building2 className="size-5" />}
                    label="Company focus"
                    value={user.company.bs}
                    delay={0.45}
                  />

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="sm:col-span-2 rounded-2xl bg-[#eff6ff]/60 p-5 dark:bg-[#1837b5]/30"
                  >
                    <p className="font-sans font-medium text-xs uppercase tracking-wide text-[#2563eb] dark:text-[#cbe2fe]">
                      Company motto
                    </p>
                    <p className="mt-2 font-sans font-normal text-base text-slate-800 dark:text-slate-200">
                      “{user.company.catchPhrase}”
                    </p>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ) : null}
        </div>
      </main>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="flex gap-3 rounded-2xl border border-slate-200/80 p-4 transition-all duration-200 hover:border-[#2563eb]/40 dark:border-[#1e40d4] dark:bg-[#08123e]/50"
    >
      <div className="text-[#2563eb] dark:text-[#cbe2fe]">{icon}</div>
      <div className="min-w-0">
        <p className="font-sans font-medium text-xs uppercase tracking-wide text-slate-400 dark:text-slate-400">
          {label}
        </p>
        <p className="mt-1 truncate font-sans font-normal text-sm text-[#050b20] dark:text-white">{value}</p>
      </div>
    </motion.div>
  );
}