import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignUpButton,
} from "@clerk/nextjs";
import { redirect } from 'next/navigation';

export default function Home() {
  return (
    <main
      className="
        flex
        //min-h-screen
        sm:h-[90vh]
        flex-col
        items-center
        gap-6
        py-6
        //sm:p-24
        "
    >
      <div className="container">
        <SignedIn >{redirect('/dashboard')}</SignedIn>
        <SignedOut>
          <div
            className="
              relative items-center 
              px-4 py-8
              mx-auto
              md:px-12
              lg:px-16
              max-w-7xl
              "
          >
            <div className="mx-auto max-w-3xl text-center">
              <div>
                <span className="w-auto px-4 py-2 rounded-full dark:bg-teal-950 bg-teal-100">
                  <span className="text-xs font-medium dark:text-teal-500 text-teal-900">
                    Структурируйте свои пожелания
                  </span>
                </span>
                <h1 className="mt-8 text-3xl font-extrabold tracking-tight lg:text-6xl">
                  Создавайте брифы{" "}
                  <span className="//dark:text-teal-500 //text-teal-600 bg-gradient-to-r from-teal-300 to-teal-700 text-transparent bg-clip-text">
                    играючи
                  </span>
                </h1>
                <p className="max-w-xl mx-auto text-balance mt-8 text-base lg:text-xl dark:text-neutral-300">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Laudantium voluptate laborum veniam ipsum soluta ducimus fuga
                </p>
              </div>
              <div className="flex justify-center max-w-sm mx-auto mt-10">
                <Button size="lg" className="dark:bg-teal-500 //w-full">
                  <SignUpButton mode="modal">
                    Зарегистрируйтесь бесплатно
                  </SignUpButton>
                </Button>
              </div>
            </div>
          </div>
        </SignedOut>
      </div>
    </main>
  );
}
