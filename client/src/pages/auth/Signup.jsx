import { useState } from "react";
import { validateForm } from "../../utils/authValidation";
import { Navigate, NavLink } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
import { FiAlertCircle } from "react-icons/fi";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const Signup = () => {
  const { isLoggedin, user } = useAuth();
  if (isLoggedin) {
    if (user?.role === "Host") return <Navigate to="/host/homes" replace />;
    return <Navigate to="/guest/home" replace />;
  }

  const { signup, err, setErr, isLoading } = useSignup();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "User",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setErr("");
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    const formErrors = validateForm(updatedFormData);
    setFormErrors(formErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    await signup(formData.name, formData.email, formData.password, formData.role);
  };

  return (
    <div className="min-h-[calc(100vh-68px)] flex items-center justify-center bg-gradient-to-tr from-red-50/30 to-white dark:from-[#090d16] dark:to-[#080c14] px-4 py-10">
      <div className="w-full max-w-md bg-white dark:bg-[#0e1422] rounded-2xl shadow-lg shadow-gray-150/40 dark:shadow-black/70 p-6 sm:p-10 border border-gray-50/50 dark:border-slate-800/80">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold font-outfit text-gray-900 dark:text-white tracking-tight">
            Create Account
          </h2>
          <p className="text-sm text-gray-400 dark:text-slate-400 mt-2 font-medium">
            Sign up to get started listing and booking homes
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1.5 font-ubuntu">Full Name</label>
            <div className="relative group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Kapil Yadav"
                className="w-full px-4 py-3 border border-gray-200/80 dark:border-slate-700/60 rounded-xl focus:bg-white dark:focus:bg-[#141b2d] focus:outline-none focus:ring-4 focus:ring-red-500/15 focus:border-red-500 hover:border-gray-300 dark:hover:border-slate-600 transition-all duration-300 font-inter text-sm bg-gray-50/50 dark:bg-[#141b2d]/60 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 shadow-sm shadow-gray-100/50 dark:shadow-black/40"
                required
              />
            </div>
            {formData.name && formErrors.nameErr && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1.5 font-medium">{formErrors.nameErr}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1.5 font-ubuntu">I want to...</label>
            <div className="flex gap-3 bg-gray-50/80 dark:bg-[#121827] p-1.5 rounded-xl border border-gray-100/80 dark:border-slate-800/80 shadow-inner">
              <label className={`flex-1 flex items-center justify-center gap-2 cursor-pointer font-inter text-sm font-semibold py-2.5 rounded-lg transition-all duration-300 ${formData.role === "User" ? "bg-white dark:bg-[#182030] text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 shadow-sm border border-gray-200/50 dark:border-slate-700/60" : "text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 hover:bg-gray-100/50 dark:hover:bg-slate-800/40"}`}>
                <input
                  type="radio"
                  name="role"
                  value="User"
                  checked={formData.role === "User"}
                  onChange={handleChange}
                  className="hidden"
                />
                Book a Home
              </label>
              <label className={`flex-1 flex items-center justify-center gap-2 cursor-pointer font-inter text-sm font-semibold py-2.5 rounded-lg transition-all duration-300 ${formData.role === "Host" ? "bg-white dark:bg-[#182030] text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 shadow-sm border border-gray-200/50 dark:border-slate-700/60" : "text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 hover:bg-gray-100/50 dark:hover:bg-slate-800/40"}`}>
                <input
                  type="radio"
                  name="role"
                  value="Host"
                  checked={formData.role === "Host"}
                  onChange={handleChange}
                  className="hidden"
                />
                Host a Home
              </label>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1.5 font-ubuntu">Email Address</label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 group-focus-within:text-red-500 transition-colors duration-300 text-sm">
                <FaEnvelope />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. kapil@example.com"
                className="w-full pl-11 pr-4 py-3 border border-gray-200/80 dark:border-slate-700/60 rounded-xl focus:bg-white dark:focus:bg-[#141b2d] focus:outline-none focus:ring-4 focus:ring-red-500/15 focus:border-red-500 hover:border-gray-300 dark:hover:border-slate-600 transition-all duration-300 font-inter text-sm bg-gray-50/50 dark:bg-[#141b2d]/60 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 shadow-sm shadow-gray-100/50 dark:shadow-black/40"
                required
              />
            </div>
            {formData.email && formErrors.emailErr && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1.5 font-medium">{formErrors.emailErr}</p>
            )}
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
                name="password"
                onChange={handleChange}
                value={formData.password}
                placeholder="Create a password"
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
            {formData.password && formErrors.passwordErr && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1.5 font-medium">
                {formErrors.passwordErr}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1.5 font-ubuntu">
              Confirm Password
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 group-focus-within:text-red-500 transition-colors duration-300 text-sm">
                <FaLock />
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full pl-11 pr-11 py-3 border border-gray-200/80 dark:border-slate-700/60 rounded-xl focus:bg-white dark:focus:bg-[#141b2d] focus:outline-none focus:ring-4 focus:ring-red-500/15 focus:border-red-500 hover:border-gray-300 dark:hover:border-slate-600 transition-all duration-300 font-inter text-sm bg-gray-50/50 dark:bg-[#141b2d]/60 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 shadow-sm shadow-gray-100/50 dark:shadow-black/40"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 transition-colors cursor-pointer text-sm"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {formData.confirmPassword && formErrors.confirmPasswordErr && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1.5 font-medium">
                {formErrors.confirmPasswordErr}
              </p>
            )}
          </div>

          {/* Terms */}
          <div className="text-xs font-medium text-gray-500 dark:text-slate-400">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" className="accent-red-650 h-4 w-4 rounded border-gray-300 dark:border-slate-700" required />
              <span className="flex items-center gap-1">
                I agree to the{" "}
                <NavLink to="/terms" className="text-red-655 dark:text-red-400 font-bold hover:underline">Terms &amp; Conditions</NavLink>
              </span>
            </label>
          </div>

          {/* Button */}
          <button
            disabled={isLoading}
            className="relative w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white py-3.5 rounded-xl cursor-pointer font-bold transition-all duration-300 text-sm font-outfit mt-4 shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 hover:-translate-y-0.5 active:scale-[0.98] active:shadow-md flex items-center justify-center overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-xl"></div>
            <span className="relative z-10">{isLoading ? "Signing up..." : "Sign Up"}</span>
          </button>
          
          {err && (
            <div className="flex items-center gap-2 bg-red-50 dark:bg-red-950/40 text-red-650 dark:text-red-400 border border-transparent dark:border-red-900/50 px-4 py-2.5 rounded-xl text-sm mt-3 animate-fade-in">
              <FiAlertCircle className="text-base flex-shrink-0" />
              <span className="font-medium">{err}</span>
            </div>
          )}
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center">
          <div className="flex-grow h-px bg-gray-200 dark:bg-slate-800/80"></div>
          <span className="px-3 text-xs text-gray-400 dark:text-slate-500 font-semibold tracking-wider">OR</span>
          <div className="flex-grow h-px bg-gray-200 dark:bg-slate-800/80"></div>
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-500 dark:text-slate-400 font-medium">
          Already have an account?{" "}
          <NavLink
            to="/login"
            viewTransition
            className="text-red-650 dark:text-red-400 font-semibold hover:text-red-750 dark:hover:text-red-300 hover:underline transition"
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
