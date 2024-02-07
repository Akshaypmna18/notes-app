import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Login from "./pages/authentication/Login";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import Signup from "./pages/authentication/Signup";
import Notes from "./pages/Notes";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import useCookie from "./hooks/useCookie";

function App() {
  const { cookies } = useCookie();
  const user = cookies.user;

  const ProtectedRoutes = () => {
    return user ? <Outlet /> : <Navigate to="/login" />;
  };
  const PublicRoutes = () => {
    return user ? <Navigate to="/notes" /> : <Outlet />;
  };
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route path="/notes" element={<Notes />} />
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
