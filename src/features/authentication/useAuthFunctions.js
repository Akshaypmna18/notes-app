import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import useAuth from "./useAuth";

const useAuthFunctions = () => {
  const { handleAuthentication } = useAuth();
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
    handleGoogleLogin,
    handleGoogleSignup,
    handleLogin,
    handleSignup,
    handleTestAccountLogin,
  };
};
export default useAuthFunctions;
