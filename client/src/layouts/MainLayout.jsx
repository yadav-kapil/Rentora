import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
const MainLayout = () => {
  return (
    <div className="min-w-full min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
