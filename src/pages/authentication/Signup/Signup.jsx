import SignupForm from "@/features/authentication/SignupForm";
import Page from "@/features/authentication/Page";

function Signup() {
  return (
    <Page isSignup={true}>
      <SignupForm />
    </Page>
  );
}

export default Signup;
