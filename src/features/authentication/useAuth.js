import { useNotes } from "@/store";
import firebaseAuthErrors from "@/lib/firebaseErrors";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import { useToast } from "@/components/ui/use-toast";

const useAuth = () => {
  const { setUser } = useNotes((state) => state);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSuccess = () => {
    navigate("/notes");
    setUser(true);
  };
  const handleError = (error) => {
    const errorCode = error.code;
    const errorMessage =
      firebaseAuthErrors[errorCode] || "An unexpected error occurred.";
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: errorMessage,
    });
  };

  const handleAuthentication = async (authFunction) => {
    try {
      await authFunction();
      handleSuccess();
    } catch (error) {
      handleError(error);
    }
  };

  const handleLogin = async (data) => {
    const { email, password } = data;
    handleAuthentication(() =>
      signInWithEmailAndPassword(auth, email, password)
    );
  };
  const handleGoogleLogin = async () => {
    handleAuthentication(() => signInWithPopup(auth, provider));
  };
  const handleTestAccountLogin = async () => {
    const email = "testaccount@mail.com";
    const password = "password";
    handleAuthentication(() =>
      signInWithEmailAndPassword(auth, email, password)
    );
  };

  const handleSignup = async (data) => {
    const { email, password } = data;
    handleAuthentication(() =>
      createUserWithEmailAndPassword(auth, email, password)
    );
  };
  const handleGoogleSignup = async () => {
    handleAuthentication(() => signInWithPopup(auth, provider));
  };

  return {
    handleLogin,
    handleGoogleLogin,
    handleTestAccountLogin,
    handleSignup,
    handleGoogleSignup,
    handleError,
  };
};

export default useAuth;
