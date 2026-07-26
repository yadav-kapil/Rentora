import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import GuestTopbar from "../components/app/guest/GuestTopbar";
import ScrollToTop from "../components/public/common/ScrollToTop";

const GuestLayout = () => {
  const { isLoggedin, user } = useAuth();

  if (!isLoggedin) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role === "Host") {
    return <Navigate to="/host/homes" replace />;
  }

  return (
    <div className="min-w-full min-h-screen bg-[#f6f5f8] dark:bg-[#090d16]">
      <ScrollToTop />
      <GuestTopbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default GuestLayout;
