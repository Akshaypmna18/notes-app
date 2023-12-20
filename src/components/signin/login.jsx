import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import Theme from "../theme";
import { useToast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";
import { Link, useNavigate } from "react-router-dom";
// import { zodResolver } from "@hookform/resolvers/zod";
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
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../lib/firebase";
import firebaseAuthErrors from "../../lib/firebaseErrors";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

function Login() {
  const navigate = useNavigate();
  const form = useForm();
  const { toast } = useToast();
  const [visibility, setVisibility] = useState(false);

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

  return (
    <div className="space-y-8 p-8">
      <Theme />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onLogin)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            rules={{
              required: { value: true, message: "This is required*" },
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
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
          <Toaster />
        </form>
      </Form>
      <p>
        Don't have an account?{" "}
        <Link to="/signup" className="underline">
          SignUp
        </Link>
      </p>
      <Button className="mt-8" onClick={handleClick}>
        google login
      </Button>
      <div className="mt-8">
        <big>test account:</big> <br /> email : testaccount@mail.com <br />
        password : password
      </div>
    </div>
  );
}

export default Login;
