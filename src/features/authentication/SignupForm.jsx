import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
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
import {
  ButtonComponent as Btn,
  SeparatorComponent as Separator,
  PwdInput,
} from "@/features/authentication/Components";
import useAuth from "./useAuth";

function SignupForm() {
  const { handleSignup, handleGoogleSignup } = useAuth();

  const defaultValues = { email: "", password: "", confirmPassword: "" };
  const form = useForm({ defaultValues });
  const password = form.watch("password");

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Toaster />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSignup)}
          className="space-y-4 mt-6"
        >
          <FormField
            control={form.control}
            name="email"
            rules={{
              required: { value: true, message: "This is required*" },
              maxLength: {
                value: 35,
                message: "Maximum number of characters is 35",
              },
              pattern: {
                value:
                  /^[a-zA-Z0-9+_.-]{3,}@[a-zA-Z0-9.-]{3,}[.][a-zA-Z]{2,4}$/,
                message: "Must be a valid email",
              },
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
                <FormDescription>
                  Be careful you cannot change your email once set and this
                  email is used to reset password
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            rules={{
              required: { value: true, message: "This is required*" },
              minLength: {
                value: 8,
                message: "Minimum number of characters is 8",
              },
              maxLength: {
                value: 25,
                message: "Maximum number of characters is 25",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">
                  <big>Password</big>
                </FormLabel>
                <FormControl>
                  <PwdInput
                    field={field}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                </FormControl>
                <FormDescription>Set a strong password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {password && (
            <FormField
              control={form.control}
              name="confirmPassword"
              rules={{
                required: { value: true, message: "This is required*" },
                validate: (val) => val === password || "Passwords do not match",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    <big>Confirm Password</big>
                  </FormLabel>
                  <FormControl>
                    <PwdInput
                      field={field}
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                      isConfirmPassword={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button className="w-full" type="submit">
            Signup
          </Button>
        </form>
      </Form>
      <Separator>Or Sign up with</Separator>
      <Btn className="flex mx-auto mt-8" onClick={handleGoogleSignup}>
        <FcGoogle className="mr-2" />
        Google
      </Btn>
    </>
  );
}

export default SignupForm;
