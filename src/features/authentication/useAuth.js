import firebaseAuthErrors from "@/lib/firebaseErrors";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import useCookie from "@/hooks/useCookie";

const useAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setCookie } = useCookie();

  const handleSuccess = () => {
    navigate("/notes");
    setCookie("user", true);
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

  return {
    handleError,
    handleAuthentication,
  };
};

export default useAuth;
