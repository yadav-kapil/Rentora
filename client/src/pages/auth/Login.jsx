import { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { FiAlertCircle } from "react-icons/fi";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { isLoggedin, user } = useAuth();
  if (isLoggedin) {
    if (user?.role === "Host") return <Navigate to="/host/homes" replace />;
    return <Navigate to="/guest/home" replace />;
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, err, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-[calc(100vh-68px)] flex items-center justify-center bg-gradient-to-tr from-red-50/30 to-white dark:from-[#090d16] dark:to-[#080c14] px-4 py-10">
      <div className="w-full max-w-md bg-white dark:bg-[#0e1422] rounded-2xl shadow-lg shadow-gray-150/40 dark:shadow-black/70 p-6 sm:p-10 border border-gray-50/50 dark:border-slate-800/80">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold font-outfit text-gray-900 dark:text-white tracking-tight">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-400 dark:text-slate-400 mt-2 font-medium">
            Please login to access your Rentora account
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1.5 font-ubuntu">Email Address</label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 group-focus-within:text-red-500 transition-colors duration-300 text-sm">
                <FaEnvelope />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. kapil@example.com"
                className="w-full pl-11 pr-4 py-3 border border-gray-200/80 dark:border-slate-700/60 rounded-xl focus:bg-white dark:focus:bg-[#141b2d] focus:outline-none focus:ring-4 focus:ring-red-500/15 focus:border-red-500 hover:border-gray-300 dark:hover:border-slate-600 transition-all duration-300 font-inter text-sm bg-gray-50/50 dark:bg-[#141b2d]/60 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 shadow-sm shadow-gray-100/50 dark:shadow-black/40"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1.5 font-ubuntu">Password</label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 group-focus-within:text-red-500 transition-colors duration-300 text-sm">
                <FaLock />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-11 py-3 border border-gray-200/80 dark:border-slate-700/60 rounded-xl focus:bg-white dark:focus:bg-[#141b2d] focus:outline-none focus:ring-4 focus:ring-red-500/15 focus:border-red-500 hover:border-gray-300 dark:hover:border-slate-600 transition-all duration-300 font-inter text-sm bg-gray-50/50 dark:bg-[#141b2d]/60 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 shadow-sm shadow-gray-100/50 dark:shadow-black/40"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 transition-colors cursor-pointer text-sm"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-xs font-medium text-gray-500 dark:text-slate-400">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                className="accent-red-650 cursor-pointer h-4 w-4 rounded border-gray-300 dark:border-slate-700"
              />
              Remember me
            </label>

            <a href="/reset" className="text-red-650 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <button
            disabled={isLoading}
            className="relative w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white py-3.5 rounded-xl cursor-pointer font-bold transition-all duration-300 text-sm font-outfit mt-4 shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 hover:-translate-y-0.5 active:scale-[0.98] active:shadow-md flex items-center justify-center overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-xl"></div>
            <span className="relative z-10">{isLoading ? "Logging In ..." : "Login"}</span>
          </button>
          
          {err && (
            <div className="flex items-center gap-2.5 bg-red-50 dark:bg-red-950/40 text-red-650 dark:text-red-400 border border-transparent dark:border-red-900/50 px-4 py-3 rounded-xl text-sm mt-3 animate-fade-in">
              <FiAlertCircle className="text-lg flex-shrink-0" />
              <span className="font-medium">{err}</span>
            </div>
          )}
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-grow h-px bg-gray-100 dark:bg-slate-800/80"></div>
          <span className="px-3 text-xs text-gray-400 dark:text-slate-500 font-bold tracking-wider">OR</span>
          <div className="flex-grow h-px bg-gray-100 dark:bg-slate-800/80"></div>
        </div>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-500 dark:text-slate-400 font-medium">
          Don’t have an account?{" "}
          <NavLink
            to="/signup"
            viewTransition
            className="text-red-650 dark:text-red-400 font-bold hover:text-red-700 dark:hover:text-red-300 hover:underline transition"
          >
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
