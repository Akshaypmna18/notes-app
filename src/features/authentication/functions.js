import firebaseAuthErrors from "@/lib/firebaseErrors";

export const handleError = (error, toast) => {
  const errorCode = error.code;
  const errorMessage =
    firebaseAuthErrors[errorCode] || "An unexpected error occurred.";
  toast({
    variant: "destructive",
    title: "Uh oh! Something went wrong.",
    description: errorMessage,
  });
};
