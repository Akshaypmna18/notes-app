import ForgetPasswordForm from "@/features/authentication/ForgetPasswordForm";
import Header from "@/layouts/Header";

function ForgotPassword() {
  return (
    <section className="p-8 xl:max-w-[80%] xl:mx-auto space-y-8">
      <Header />
      <ForgetPasswordForm />
    </section>
  );
}

export default ForgotPassword;
