import React from "react";
import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="mx-auto mt-4 flex w-full items-center justify-center">
      <SignIn path="/sign-in" routing="path" />
    </div>
  );
};

export default SignInPage;
