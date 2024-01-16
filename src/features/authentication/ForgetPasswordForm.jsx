import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import useAuth from "@/features/authentication/useAuth";

function ForgetPasswordForm() {
  const { handleError } = useAuth();
  const navigate = useNavigate();

  const defaultValues = { email: "" };
  const form = useForm({ defaultValues });

  const resetPassword = async (data) => {
    try {
      await sendPasswordResetEmail(auth, data.email);
      alert("check your email");
      navigate("/login");
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <>
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
                    className="max-w-[20rem]"
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
    </>
  );
}

export default ForgetPasswordForm;
