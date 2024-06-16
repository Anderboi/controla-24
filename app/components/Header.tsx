"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { ModeToggle } from "@/components/ui/themeToggle";
import {
  SignInButton,
  SignUpButton,
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
    <nav className="items-center px-4 pt-4 dark:border-neutral-800 sm:flex sm:h-[10vh] sm:border-b sm:p-0">
      <div className="flex items-center justify-between sm:container">
        <div className="flex items-center gap-2">
          {pathname !== "/dashboard" && pathname !== "/" && (
            <Button
              onClick={() => router.back()}
              className="size-8"
              size={"icon"}
              variant={"outline"}
            >
              <ChevronLeft />
            </Button>
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
              <SignInButton forceRedirectUrl={"/dashboard"} mode="modal">
                Вход
              </SignInButton>
            </Button>
            <Button size={"sm"} variant={"secondary"}>
              <SignUpButton forceRedirectUrl={"/dashboard"} mode="modal">
                Регистрация
              </SignUpButton>
            </Button>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}

export default Header;
