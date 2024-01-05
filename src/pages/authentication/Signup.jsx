import React from "react";
import CommonHeader from "@/layouts/Header";
import { Header, Section } from "@/features/authentication/Components";
import SignupForm from "@/features/authentication/SignupForm";

function Signup() {
  return (
    <div className="md:flex">
      <div className="hidden md:flex flex-col justify-end pb-16 md:w-[50%] bg-secondary p-8 min-h-[100svh]">
        <span className="font-semibold">
          <big>
            “You are the author of your own life; do not surrender the pen to
            anyone else."
          </big>
        </span>
        <span className="mt-2">Hugh Prather</span>
      </div>
      <Section>
        <CommonHeader />
        <Header isSignup={true} />
        <SignupForm />
      </Section>
    </div>
  );
}

export default Signup;
