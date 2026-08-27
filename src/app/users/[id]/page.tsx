import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  Globe2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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

async function getUser(id: string): Promise<User | null> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export default async function UserDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUser(id);

  if (!user) {
    notFound();
  }

  return (
    <div className="min-h-screen font-sans font-normal bg-[#f8fafc] text-slate-900 transition-colors duration-300 dark:bg-[#08123e] dark:text-slate-100">
      <Navbar />

      <main className="px-6 py-10 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 font-sans font-medium text-sm text-[#2563eb] transition hover:opacity-80 dark:text-[#cbe2fe]"
          >
            <ArrowLeft className="size-4" />
            Back to directory
          </Link>

          <Card className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm dark:border-[#1e40d4] dark:bg-[#0c1f70]">
            <div className="bg-[#050b20] px-6 py-10 text-white sm:px-10 dark:bg-[#08123e] dark:border-b dark:border-[#1e40d4]">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex size-20 items-center justify-center rounded-full bg-white font-sans font-semibold text-3xl text-[#050b20] dark:bg-[#cbe2fe] dark:text-[#10288c]">
                  {user.name.charAt(0)}
                </div>

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
              />

              <InfoItem
                icon={<Phone className="size-5" />}
                label="Phone"
                value={user.phone}
              />

              <InfoItem
                icon={<MapPin className="size-5" />}
                label="Location"
                value={`${user.address.city}, ${user.address.zipcode}`}
              />

              <InfoItem
                icon={<Globe2 className="size-5" />}
                label="Website"
                value={user.website}
              />

              <InfoItem
                icon={<Building2 className="size-5" />}
                label="Company"
                value={user.company.name}
              />

              <InfoItem
                icon={<Building2 className="size-5" />}
                label="Company focus"
                value={user.company.bs}
              />

              <div className="sm:col-span-2 rounded-2xl bg-[#eff6ff]/60 p-5 dark:bg-[#1837b5]/30">
                <p className="font-sans font-medium text-xs uppercase tracking-wide text-[#2563eb] dark:text-[#cbe2fe]">
                  Company motto
                </p>
                <p className="mt-2 font-sans font-normal text-base text-slate-800 dark:text-slate-200">
                  “{user.company.catchPhrase}”
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 rounded-2xl border border-slate-200/80 p-4 dark:border-[#1e40d4] dark:bg-[#08123e]/50">
      <div className="text-[#2563eb] dark:text-[#cbe2fe]">{icon}</div>
      <div className="min-w-0">
        <p className="font-sans font-medium text-xs uppercase tracking-wide text-slate-400 dark:text-slate-400">
          {label}
        </p>
        <p className="mt-1 truncate font-sans font-normal text-sm text-[#050b20] dark:text-white">{value}</p>
      </div>
    </div>
  );
}