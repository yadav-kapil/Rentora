import { useState } from "react";
import { Link } from "react-router-dom";
import { FaLinkedinIn, FaInstagram, FaGithub, FaWhatsapp, FaHome } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/newsletter/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Successfully subscribed!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Failed to subscribe.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An error occurred. Please try again.");
    }

    setTimeout(() => {
      setStatus("idle");
      setMessage("");
    }, 4000);
  };

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 pt-16 pb-8 mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
        
        {/* Brand Column */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex gap-2.5 items-center font-bold select-none group mb-4">
            <FaHome className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 text-xl" />
            <span className="font-outfit text-xl text-gray-900 dark:text-white tracking-tight">
              Rentora
            </span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed max-w-xs">
            Find unique places to stay and make unforgettable memories.
          </p>
          <div className="flex gap-3 pt-2">
            <a href="https://www.linkedin.com/in/kapilyadav9560/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-500 transition-colors">
              <FaLinkedinIn size={14} />
            </a>
            <a href="https://www.instagram.com/_yadav__kapil_" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-500 transition-colors">
              <FaInstagram size={14} />
            </a>
            <a href="https://github.com/yadav-kapil" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-9 h-9 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-500 transition-colors">
              <FaGithub size={14} />
            </a>
            <a href="https://wa.me/919560340701" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-9 h-9 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-500 transition-colors">
              <FaWhatsapp size={14} />
            </a>
          </div>
        </div>

        {/* Links Columns (Company & Support on one row in mobile) */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-8">
          <div>
            <h4 className="font-bold font-outfit text-gray-900 dark:text-white mb-4">Company</h4>
            <ul className="space-y-3 text-sm font-medium text-gray-500 dark:text-gray-400">
              <li><Link to="/about" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-500 transition-colors">About Us</Link></li>
              <li><Link to="/signup" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-500 transition-colors">Host a Home</Link></li>
              <li><a href="/#faqs" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-500 transition-colors">FAQs</a></li>
              <li><Link to="/categories" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-500 transition-colors">Find a Home</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold font-outfit text-gray-900 dark:text-white mb-4">Support</h4>
            <ul className="space-y-3 text-sm font-medium text-gray-500 dark:text-gray-400">
              <li><a href="/#how-it-works" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-500 transition-colors">How it works</a></li>
              <li><a href="/#contact" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-500 transition-colors">Contact Us</a></li>
              <li><Link to="/terms" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-500 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-500 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Column */}
        <div className="lg:col-span-4">
          <h4 className="font-bold font-outfit text-gray-900 dark:text-white mb-4">Subscribe to Newsletter</h4>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed mb-4">
            Get the latest updates and offers directly in your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-gradient-to-r from-red-600 to-orange-500 hover:bg-red-700 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {status === "loading" ? "..." : "Subscribe"}
              </button>
            </div>
            {message && (
              <p className={`text-xs font-medium ${status === "success" ? "text-green-600 dark:text-green-400" : "text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500"}`}>
                {message}
              </p>
            )}
          </form>
        </div>

      </div>
      
      <div className="max-w-7xl mx-auto px-6 border-t border-gray-100 dark:border-gray-800 pt-8 text-center text-xs font-medium text-gray-400 dark:text-gray-500">
        © {new Date().getFullYear()} Rentora. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
