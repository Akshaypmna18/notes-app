import {
  ButtonComponent as Btn,
  SeparatorComponent as Separator,
  PwdInput,
} from "@/features/authentication/Components";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Toaster } from "@/components/ui/toaster";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useAuthFunctions from "./useAuthFunctions";

function LoginForm() {
  const { handleLogin, handleGoogleLogin, handleTestAccountLogin } =
    useAuthFunctions();

  const defaultValues = { email: "", password: "" };
  const form = useForm({ defaultValues });

  const [isChecked, setIsChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Toaster />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleLogin)}
          className="space-y-4 mt-6"
        >
          <FormField
            control={form.control}
            name="email"
            rules={{
              required: { value: true, message: "This is required*" },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">
                  <big>Email</big>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            rules={{
              required: { value: true, message: "This is required*" },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-between">
                  <big className="font-semibold ">Password</big>
                  <p className="underline">
                    <Link
                      to="/forgot-password"
                      className="underline text-primaryColor"
                    >
                      Forgot Password
                    </Link>
                  </p>
                </FormLabel>
                <FormControl>
                  <PwdInput
                    field={field}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center">
            <Checkbox
              checked={isChecked}
              onCheckedChange={() => setIsChecked(!isChecked)}
              className="mr-2 data-[state=checked]:bg-primaryColor data-[state=checked]:border-primaryColor"
            />
            <span
              onClick={() => setIsChecked(!isChecked)}
              className="cursor-pointer"
            >
              Remember me?
            </span>
          </div>
          <Button className="w-full" type="submit">
            Login
          </Button>
        </form>
      </Form>
      <Separator>Or Log in with</Separator>
      <div className="flex flex-wrap justify-center gap-x-4 mt-8 gap-y-2">
        <Btn onClick={handleGoogleLogin}>
          <FcGoogle className="mr-2" />
          Google
        </Btn>
        <Btn onClick={handleTestAccountLogin}>Guest account</Btn>
      </div>
    </>
  );
}

export default LoginForm;
