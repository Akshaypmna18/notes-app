import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { sendPasswordResetEmail } from "firebase/auth";
import firebaseAuthErrors from "../../lib/firebaseErrors";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { Header } from "../components";

function ForgetPassword() {
  const navigate = useNavigate();
  const form = useForm();
  const { toast } = useToast();

  const resetPassword = async (data) => {
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        alert("check your email");
        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(error.message);
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
    <section className="p-8 space-y-8">
      <Header />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(resetPassword)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            rules={{
              required: { value: true, message: "This is required*" },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <big className="font-semibold">Email</big>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter the registered email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-2">
            Reset password
          </Button>{" "}
        </form>
      </Form>
      <Toaster />
    </section>
  );
}

export default ForgetPassword;
