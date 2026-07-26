import { Outlet } from "react-router";
import Navbar from "../components/public/common/Navbar";
import Footer from "../components/public/common/Footer";
import ScrollToTop from "../components/public/common/ScrollToTop";

const MainLayout = () => {
  return (
    <div className="min-w-full min-h-screen bg-[#f6f5f8] dark:bg-[#070a11] dark:text-slate-100 transition-colors duration-300">
      <ScrollToTop />
      <Navbar />
      <div className="max-md:pt-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
