import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-6 py-6 sm:h-[90vh]">
      <div className="container">
        <div className="relative mx-auto max-w-7xl items-center px-4 py-8 md:px-12 lg:px-16">
          <div className="mx-auto max-w-3xl text-center">
            <div>
              <span className="w-auto rounded-full bg-teal-100 px-4 py-2 dark:bg-teal-950">
                <span className="text-xs font-medium text-teal-900 dark:text-teal-500">
                  Структурируйте свои пожелания
                </span>
              </span>
              <h1 className="mt-8 text-3xl font-bold tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
                Создавайте брифы{" "}
                <span className="bg-gradient-to-r from-teal-300 to-teal-700 bg-clip-text text-transparent">
                  играючи
                </span>
              </h1>
              <div className="text-balance dark:text-neutral-400">
                <p className="mx-auto mt-8 max-w-xl text-base lg:text-xl">
                  Откройте для себя Controla — ваш идеальный инструмент для
                  создания профессиональных брифов!
                </p>
                <p className="mx-auto mt-2 max-w-xl text-base lg:text-xl">
                  Создавайте подробные брифы и мгновенно загружайте их в формате
                  PDF.
                </p>
                <p className="mx-auto mt-2 max-w-xl  text-base lg:text-xl">
                  Controla — это ваш ключ к эффективной и продуктивной работе!
                </p>
              </div>
            </div>
            <div className="mx-auto mt-10 flex max-w-sm justify-center">
              <Button size="default" className="dark:bg-teal-500">
                <SignedIn>
                  <Link href={"/dashboard"}>Приступить</Link>
                </SignedIn>
                <SignedOut>
                  <SignUpButton mode="modal">
                    Зарегистрируйтесь бесплатно
                  </SignUpButton>
                </SignedOut>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
