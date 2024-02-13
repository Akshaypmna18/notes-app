import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";

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

export function SeparatorComponent({ children }) {
  const separatorClassNames = "w-[20%]";
  return (
    <div className="flex items-center mx-auto w-[80%] justify-center mt-8">
      <Separator className={separatorClassNames} />
      <span className="mx-2 whitespace-nowrap">{children}</span>
      <Separator className={separatorClassNames} />
    </div>
  );
}

export function PwdInput({ field, isConfirmPassword }) {
  const [showPassword, setShowPassword] = useState(false);
  const size = 20;
  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder={
          isConfirmPassword ? "Re-enter your password" : "Enter your password"
        }
        {...field}
      />
      <span
        className="cursor-pointer absolute top-3 right-6"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <IoEyeOutline size={size} />
        ) : (
          <IoEyeOffOutline size={size} />
        )}
      </span>
    </div>
  );
}

export const Loader = () => {
  return <ClipLoader color="#fff" size={20} />;
};
