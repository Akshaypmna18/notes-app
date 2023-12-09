import { Input } from "../../../components/ui/input";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import Theme from "../theme";
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
} from "../../../components/ui/form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../components/ui/alert";
import firebaseAuthErrors from "../../firebaseErrors";

function Login() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const form = useForm();

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
        setAlert(
          <Alert className="max-w-fit mx-auto" variant="destructive">
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        );
        setTimeout(() => setAlert(null), 3000);
      });
  };

  return (
    <div className="space-y-8">
      <Theme />
      {alert}
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
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <p>
        Don't have an account?{" "}
        <Link to="/signup" className="underline">
          SignUp
        </Link>
      </p>
    </div>
  );
}

export default Login;
