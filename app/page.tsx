import ProjectsBlock from "@/components/projectsBlock";
import Search from "@/components/search";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/themeToggle";
import {
  UserButton,
  SignInButton,
  SignIn,
  SignedIn,
  SignedOut,
  useAuth,
} from "@clerk/nextjs";
import Link from "next/link";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  return (
    <main className="flex min-h-screen flex-col items-center //justify-between gap-6 p-24">
      <h1>Список проектов</h1>
      <SignedIn>
        <div>
          <Search />
          <ProjectsBlock
            query={searchParams?.query || ""}
            currentPage={Number(searchParams?.page) || 1}
          />
          <Button>
            <Link href="/create-brief">Создать новое задание</Link>
          </Button>
        </div>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <Button>
          <SignInButton mode="modal">Авторизоваться</SignInButton>
        </Button>
      </SignedOut>
      <ModeToggle />
    </main>
  );
}
