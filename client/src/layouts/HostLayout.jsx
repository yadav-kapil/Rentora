import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import HostTopbar from "../components/app/host/HostTopbar";
import ScrollToTop from "../components/public/common/ScrollToTop";

const HostLayout = () => {
  const { isLoggedin, user } = useAuth();

  if (!isLoggedin) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "Host") {
    return <Navigate to="/guest/home" replace />;
  }

  return (
    <div className="min-w-full min-h-screen bg-[#f6f5f8] dark:bg-[#090d16]">
      <ScrollToTop />
      <HostTopbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default HostLayout;
