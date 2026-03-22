import { FaHome } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full border-b bg-white shadow-sm sticky top-0 z-50">
      
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

        {/* Logo */}
        <Link to="/" className="text-2xl flex gap-2.5 items-center">
          <FaHome className="text-red-600" />
          <p className="font-bold font-outfit tracking-wide">
            Rentora
          </p>
        </Link>

        {/* Navigation */}
        <ul className="flex items-center gap-8 text-sm font-medium font-ubuntu text-gray-700">
          <li>
            <NavLink
              to="/"
              className="hover:text-red-600 transition-colors [&.active]:text-red-600"
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/homes/new"
              className="hover:text-red-600 transition-colors [&.active]:text-red-600"
            >
              Add Home
            </NavLink>
          </li>
        </ul>

        {/* Button */}
        <button className="bg-red-600 text-white px-4 py-1.5 cursor-pointer rounded-xl font-outfit text-sm font-semibold shadow-sm hover:bg-red-500 hover:scale-95 transition-transform duration-200">
          Demo
        </button>

      </div>

    </nav>
  );
};

export default Navbar;