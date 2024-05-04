import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/themeToggle";
import { createClient } from "@/lib/supabase/server";
import {
  UserButton,
  SignInButton,
  SignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  const supabase = createClient();
  const { data: projects } = await supabase.from("projects").select();

  return (
    <main className="flex min-h-screen flex-col items-center //justify-between gap-6 p-24">
      <h1>Список проектов</h1>
      <SignedIn>
        <div>
          <h3>Название проекта</h3>
          {projects?.map((project) => (
            <p>{project.address}</p>
          ))}
          {/* {briefs ?  */}
          {/* <span>1</span> */}
          {/* <span>2</span> */}
          {/* : */}
          <Button>
            <Link href="/create-brief">Создать новое задание</Link>
          </Button>
          {/* } */}
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
