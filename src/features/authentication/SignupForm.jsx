import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import { useToast } from "../../components/ui/use-toast";
import { Toaster } from "../../components/ui/toaster";
import { useNavigate } from "react-router-dom";
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
} from "../../components/ui/form";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import firebaseAuthErrors from "@/lib/firebaseErrors";
import {
  ButtonComponent as Button,
  SeparatorComponent as Separator,
  Btn,
  PwdInput,
} from "@/features/authentication/Components";

function SignupForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm({ defaultValues: {} });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    const { email, password } = data;
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/notes");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = firebaseAuthErrors[errorCode];
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: errorMessage,
        });
      });
  };
  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        navigate("/notes");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage =
          firebaseAuthErrors[errorCode] || "An unexpected error occurred.";
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: errorMessage,
        });
      });
  };
  return (
    <>
      <Toaster />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
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
          <Btn type="submit">Signup</Btn>
        </form>
      </Form>
      <Separator>Or Sign up with</Separator>
      <Button className="flex mx-auto mt-8" onClick={handleGoogleLogin}>
        <FcGoogle className="mr-2" />
        Google
      </Button>
    </>
  );
}

export default SignupForm;
