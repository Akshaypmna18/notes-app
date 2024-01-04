import React from "react";
import CommonHeader from "@/layouts/Header";
import { Header, Section } from "@/features/authentication/Components";
import LoginForm from "@/features/authentication/LoginForm";

function Login() {
  return (
    <Section>
      <CommonHeader />
      <Header />
      <LoginForm />
    </Section>
  );
}

export default Login;
