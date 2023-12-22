import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useToast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";
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
} from "../ui/form";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../lib/firebase";
import firebaseAuthErrors from "../../lib/firebaseErrors";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Header } from "../components";

function Signup() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [visibility, setVisibility] = useState(false);
  const form = useForm();
  const separatorClassNames = "w-[20%]";

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
    <section className="p-8 xl:max-w-[80%] xl:mx-auto font-[poppins]">
      <Header />
      <Toaster />
      <div className="space-y-2 mt-4">
        <h3 className="text-[calc(1.75rem+1vw)] font-semibold">Signup</h3>
        <p>
          Already have an account?
          <Link to="/login" className="underline text-primaryColor ml-2">
            Login
          </Link>
        </p>
      </div>
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
                  <div className="relative">
                    <Input
                      type={visibility ? "text" : "password"}
                      placeholder="Enter your password"
                      {...field}
                    />
                    {visibility ? (
                      <EyeOpenIcon
                        onClick={() => setVisibility(!visibility)}
                        className="absolute top-3 right-6"
                      />
                    ) : (
                      <EyeClosedIcon
                        onClick={() => setVisibility(!visibility)}
                        className="absolute top-3 right-6"
                      />
                    )}
                  </div>
                </FormControl>
                <FormDescription>Set a strong password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Signup
          </Button>
        </form>
      </Form>
      <p className="flex items-center mx-auto w-[80%] justify-center mt-8">
        <Separator className={separatorClassNames} />
        <span className="mx-2 whitespace-nowrap">Or Sign up with</span>
        <Separator className={separatorClassNames} />
      </p>
      <Button
        className="bg-secondary border-2 text-primaryColor hover:bg-secondary border-primaryColor hover:text-primary mx-auto flex items-center mt-4"
        onClick={handleGoogleLogin}
      >
        <FcGoogle className="mr-2" />
        Google
      </Button>
    </section>
  );
}

export default Signup;
