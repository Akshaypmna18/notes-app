import img from "@/assets/404.png";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import Theme from "@/features/Theme";

function NotFound() {
  return (
    <section className="min-h-[100svh] grid place-items-center">
      <div className="flex justify-center flex-col items-center text-center mb-4 space-y-4 p-4">
        <Theme className="hidden" />
        <img src={img} alt="" className="w-[min(100%,25rem)]" />
        <h2 className="text-5xl font-semibold">Oops!</h2>
        <p className="text-[calc(1.25rem+0.75vw)]">
          We can't seem to find the page you're looking for.
        </p>
        <Link to="/">
          <Button className="text-[calc(1rem+0.5vw)] font-semibold tracking-wide uppercase hover:font-bold p-3 flex gap-2 items-center">
            <HomeIcon className="h-[calc(1rem+0.5vw)] w-[calc(1rem+0.5vw)]" />
            Go to Homepage
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
