import React from "react";
import SignupForm from "@/features/authentication/SignupForm";
import Page from "@/features/authentication/page";

function Signup() {
  return (
    <Page isSignup={true}>
      <SignupForm />
    </Page>
  );
}

export default Signup;
