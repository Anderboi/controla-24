"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { ModeToggle } from "@/components/ui/theme-toggle";
import {
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function Header() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="items-center px-4 pt-4 dark:border-neutral-600 bg-white dark:bg-transparent sm:flex h-[80px] sm:border-b sm:p-0">
      <div className="flex items-center justify-between sm:container">
        <div className="flex items-center gap-2">
          {pathname !== "/dashboard" && pathname !== "/" && (
            <>
              <Button
                onClick={() => router.back()}
                className="size-8"
                size={"icon"}
                variant={"outline"}
              >
                <ChevronLeft />
              </Button>
              <span className='sr-only'>Back button</span>
            </>
          )}

          <Link href="/dashboard">
            <h1 className="hidden text-2xl font-bold text-teal-600 dark:text-teal-400 sm:block">
              Controla
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-x-4">
          <ModeToggle />
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Button size={"sm"}>
              <Link href="/sign-in">Вход</Link>
            </Button>
            <Button size={"sm"} variant={"secondary"}>
              <Link href="/sign-up">Регистрация</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}

export default Header;
