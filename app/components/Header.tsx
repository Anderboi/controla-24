import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/themeToggle';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <nav className="sm:border-b sm:h-[10vh] //hidden sm:flex items-center dark:border-neutral-800 px-4 pt-4 sm:p-0">
      <div className="sm:container flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold dark:text-teal-400 text-teal-600 hidden sm:block">
            Controla
          </h1>
        </Link>

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
