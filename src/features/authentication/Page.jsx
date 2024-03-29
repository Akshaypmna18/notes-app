import CommonHeader from "@/layouts/Header";
import { Link } from "react-router-dom";

function Page({ children, isSignup }) {
  return (
    <main className="md:flex">
      <section className="hidden md:flex flex-col justify-end md:w-[50%] bg-secondary p-8 min-h-[100svh]">
        <div className="sticky bottom-[8%]">
          <p className="font-semibold">
            <big>
              “You are the author of your own life; do not surrender the pen to
              anyone else."
            </big>
          </p>
          <p className="mt-2">Hugh Prather</p>
        </div>
      </section>
      <section className="p-4 min-[300px]:p-8 sm:max-w-[80%] sm:mx-auto md:w-[40%] font-[poppins]">
        <CommonHeader />
        <div className="space-y-2 mt-4">
          <h3 className="text-[calc(1.75rem+1vw)] font-semibold">
            {isSignup ? "Signup" : "Login"}
          </h3>
          <p>
            Already have an account?
            <Link
              to={isSignup ? "/login" : "/signup"}
              className="underline text-primaryColor ml-2 hover:font-bold"
            >
              {isSignup ? "Login" : "Signup"}
            </Link>
          </p>
        </div>
        {children}
      </section>
    </main>
  );
}

export default Page;
