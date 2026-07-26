import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import Hero from "../../components/public/home/Hero";
import PopularStays from "../../components/public/home/PopularStays";
import Features from "../../components/public/home/Features";
import HowItWorks from "../../components/public/home/HowItWorks";
import Contact from "../../components/public/home/Contact";
import FAQ from "../../components/public/home/FAQ";
import CTA from "../../components/public/home/CTA";

const HomePage = () => {
  const navigate = useNavigate();
  const { isLoggedin, user } = useAuth();
  
  useEffect(() => {
    if (isLoggedin && user?.role === "User") {
      navigate("/guest/home", { replace: true });
    }
  }, [isLoggedin, user, navigate]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-hidden">
      <Hero />
      <PopularStays />
      <Features />
      <HowItWorks />
      <Contact />
      <FAQ />
      <CTA />
    </div>
  );
};

export default HomePage;
