import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
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
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../lib/firebase";
import firebaseAuthErrors from "../../lib/firebaseErrors";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Header } from "../components";

function Login() {
  const navigate = useNavigate();
  const form = useForm({ defaultValues: {} });
  const { toast } = useToast();
  const [visibility, setVisibility] = useState(false);
  const separatorClassNames = "w-[20%]";

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
    <section className="p-8 xl:max-w-[80%] xl:mx-auto font-[poppins]">
      <Header />
      <Toaster />
      <div className="space-y-2 mt-4">
        <h3 className="text-[calc(1.75rem+1vw)] font-semibold">Login</h3>
        <p>
          Don't have an account yet?
          <Link
            to="/signup"
            className="underline text-primaryColor ml-2 hover:font-bold"
          >
            SignUp
          </Link>
        </p>
      </div>
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
                      to="/forgetPassword"
                      className="underline text-primaryColor"
                    >
                      Forget Password
                    </Link>
                  </p>
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
                        className="absolute top-3 right-6 cursor-pointer"
                      />
                    ) : (
                      <EyeClosedIcon
                        onClick={() => setVisibility(!visibility)}
                        className="absolute top-3 right-6 cursor-pointer"
                      />
                    )}
                  </div>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center">
            <Checkbox className="mr-2 data-[state=checked]:bg-primaryColor data-[state=checked]:border-primaryColor" />
            Remember me?
          </div>
          <Button className="w-full" type="submit">
            Login
          </Button>
        </form>
      </Form>
      <p className="flex items-center mx-auto w-[80%] justify-center mt-8">
        <Separator className={separatorClassNames} />
        <span className="mx-2 whitespace-nowrap">Or Log in with</span>
        <Separator className={separatorClassNames} />
      </p>
      <div className="flex flex-wrap justify-center gap-x-4 mt-8 gap-y-2">
        <Button
          className="bg-secondary border-2 text-primaryColor hover:bg-secondary border-primaryColor hover:text-primary"
          onClick={handleGoogleLogin}
        >
          <FcGoogle className="mr-2" />
          Google
        </Button>
        <Button
          className="bg-secondary border-2 text-primaryColor hover:bg-secondary border-primaryColor hover:text-primary"
          onClick={handleTestAccountLogin}
        >
          Guest account
        </Button>
      </div>
    </section>
  );
}

export default Login;
