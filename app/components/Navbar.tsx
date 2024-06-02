"use client";

import React from "react";
import { cn } from "@/utils/utils";
import { Home, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navigation = [
  { name: "Home", icon: Home, href: "/dashboard" },
  // { name: "Settings", icon: Settings, href: "/dashboard/settings" },
];
function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col items-start gap-2 w-full">
      {navigation.map((item, index) => (
        <Link key={index} href={item.href} className="w-full">
          <span
            className={cn(
              "group flex items-center rounded-md px-4 py-2 text-sm font-medium hover:dark:bg-neutral-800 hover:bg-neutral-100 ",
              pathname === item.href ? "dark:bg-neutral-800 bg-neutral-100" : "bg-transparent"
            )}
          >
            <item.icon className="mr-2 size-4" />
            <span>{item.name}</span>
          </span>
        </Link>
      ))}
    </nav>
  );
}

export default Navbar;
