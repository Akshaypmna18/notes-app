import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
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
  const handleClick = () => {
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

  const form = useForm();
  return (
    <section className="space-y-8 p-8 xl:max-w-[80%] xl:mx-auto font-[poppins]">
      <Header />
      <Toaster />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* <FormField
            control={form.control}
            name="username"
            rules={{
              required: { value: true, message: "This is required*" },
              minLength: {
                value: 3,
                message: "Minimum number of characters is 3",
              },
              maxLength: {
                value: 25,
                message: "Maximum number of characters is 25",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormDescription>This is your display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}
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
                <FormLabel>Email</FormLabel>
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
                <FormLabel>Password</FormLabel>
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <p>
        Already have an account?{" "}
        <Link to="/login" className="underline">
          Login
        </Link>
      </p>
      <Button className="mt-8" onClick={handleClick}>
        google signin
      </Button>
    </section>
  );
}

export default Signup;
