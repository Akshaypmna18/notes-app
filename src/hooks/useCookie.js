import { useCookies } from "react-cookie";
const useCookie = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  return {
    cookies,
    setCookie,
    removeCookie,
  };
};
export default useCookie;
