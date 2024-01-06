import React from "react";
import {
  ButtonComponent as Button,
  SeparatorComponent as Separator,
  Btn,
  PwdInput,
} from "@/features/authentication/Components";
import { Input } from "../../components/ui/input";
import { useState } from "react";
import { Checkbox } from "../../components/ui/checkbox";
import { useToast } from "../../components/ui/use-toast";
import { Toaster } from "../../components/ui/toaster";
import { Link, useNavigate } from "react-router-dom";
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
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import firebaseAuthErrors from "@/lib/firebaseErrors";

function LoginForm() {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({ defaultValues: {} });
  const { toast } = useToast();

  const onLogin = async (data) => {
    const { email, password } = data;
    signInWithEmailAndPassword(auth, email, password)
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
  const handleTestAccountLogin = async () => {
    const email = "testaccount@mail.com";
    const password = "password";
    signInWithEmailAndPassword(auth, email, password)
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
        <form onSubmit={form.handleSubmit(onLogin)} className="space-y-4 mt-6">
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
              onClick={() => setIsChecked(!isChecked)}
              className="mr-2 data-[state=checked]:bg-primaryColor data-[state=checked]:border-primaryColor"
            />
            <span
              onClick={() => setIsChecked(!isChecked)}
              className="cursor-pointer"
            >
              Remember me?
            </span>
          </div>
          <Btn type="submit">Login</Btn>
        </form>
      </Form>
      <Separator>Or Log in with</Separator>
      <div className="flex flex-wrap justify-center gap-x-4 mt-8 gap-y-2">
        <Button onClick={handleGoogleLogin}>
          <FcGoogle className="mr-2" />
          Google
        </Button>
        <Button onClick={handleTestAccountLogin}>Guest account</Button>
      </div>
    </>
  );
}

export default LoginForm;
