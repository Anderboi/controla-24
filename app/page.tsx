import { UserButton, SignInButton, SignIn, SignedIn, SignedOut } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center //justify-between p-24">
      <h1>Список проектов</h1>
      <SignedIn>
        <div>
          <h3>Название проекта</h3>
        </div>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton mode='modal' />
      </SignedOut>
    </main>
  );
}
