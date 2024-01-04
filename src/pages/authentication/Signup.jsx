import React from "react";
import CommonHeader from "@/layouts/Header";
import { Header, Section } from "@/features/authentication/Components";
import SignupForm from "@/features/authentication/SignupForm";

function Signup() {
  return (
    <Section>
      <CommonHeader />
      <Header isSignup={true} />
      <SignupForm />
    </Section>
  );
}

export default Signup;
