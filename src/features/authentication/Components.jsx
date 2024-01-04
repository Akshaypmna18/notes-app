import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNotes } from "@/store";

export function ButtonComponent({ children, onClick, className }) {
  return (
    <Button
      className={`bg-secondary border-2 text-primaryColor hover:bg-secondary border-primaryColor hover:text-primary ${className}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export function Btn({ children, type }) {
  return (
    <Button className="w-full" type={type}>
      {children}
    </Button>
  );
}

export function SeparatorComponent({ children }) {
  const separatorClassNames = "w-[20%]";
  return (
    <p className="flex items-center mx-auto w-[80%] justify-center mt-8">
      <Separator className={separatorClassNames} />
      <span className="mx-2 whitespace-nowrap">{children}</span>
      <Separator className={separatorClassNames} />
    </p>
  );
}

export function Section({ children }) {
  return (
    <section className="p-8 xl:max-w-[80%] xl:mx-auto font-[poppins]">
      {children}
    </section>
  );
}

export function Header({ isSignup }) {
  return (
    <div className="space-y-2 mt-4">
      <h3 className="text-[calc(1.75rem+1vw)] font-semibold">
        {isSignup ? "Signup" : "Login"}
      </h3>
      <p>
        Already have an account?
        <Link
          to={isSignup ? "/login" : "/signup"}
          className="underline text-primaryColor ml-2 hover:font-bold"
        >
          {isSignup ? "Signup" : "Login"}
        </Link>
      </p>
    </div>
  );
}

export function EyeIcon() {
  const { showPassword, setShowPassword } = useNotes((state) => state);
  const size = 20;
  return (
    <span
      className="cursor-pointer absolute top-[0.55rem] right-6"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? (
        <IoEyeOutline size={size} />
      ) : (
        <IoEyeOffOutline size={size} />
      )}
    </span>
  );
}
