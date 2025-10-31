import { Lock, LockKeyhole } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
     <motion.nav
        className="fixed top-0 left-0 w-full bg-[#17244e] text-white border-b border-[#462875] px-8 py-5 flex items-center justify-between shadow-[0_1px_6px_rgba(191,132,250,0.6)]"
        variants={{
          hidden: { opacity: 0, y: -50 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 1 }}
      >
   
      {/* Logo */}
      <Link to="/" className="text-xl flex items-center gap-2 font-medium purple-text">
        <Lock  className="purple-text text-purple-500"/> <h2 className="purple-text text-purple-500">CRYPTOGRAPHY </h2>
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? " purple-text text-purple-500 border-b-2 font-medium border-purple-500 pb-1 drop-shadow-xl"
              : "hover:text-purple-500 font-medium translation-all duration-200 text-gray-500"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/algorithms"
          className={({ isActive }) =>
            isActive
              ? " purple-text border-b-2 text-purple-500 font-medium border-purple-500 pb-1 drop-shadow-xl"
              : "hover:text-purple-500 font-medium translation-all duration-200 text-gray-500"
          }
        >
           Algorithms
        </NavLink>
         <NavLink
          to="/comparison"
          className={({ isActive }) =>
            isActive
              ? "purple-text font-medium border-b-2 text-purple-500 border-purple-500 pb-1 drop-shadow-xl"
              : "hover:text-purple-500 font-medium text-gray-500 translation-all duration-200"
          }
        >
          Comparison
        </NavLink>
                <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive
              ? "purple-text font-medium border-b-2 border-purple-500 text-purple-500 pb-1 drop-shadow-xl"
              : "hover:text-purple-500 font-medium text-gray-500 translation-all duration-200"
          }
        >
          History
        </NavLink>
                <NavLink
          to="/recources"
          className={({ isActive }) =>
            isActive
              ? "purple-text font-medium border-b-2 border-purple-500 text-purple-500 pb-1 drop-shadow-xl"
              : "hover:text-purple-500 font-medium text-gray-500 translation-all duration-200"
          }
        >
          Recources
        </NavLink>


        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "purple-text font-medium border-b-2 text-purple-500 border-purple-500 pb-1 drop-shadow-xl"
              : "hover:text-purple-500 font-medium text-gray-500 translation-all duration-200"
          }
        >
          About
        </NavLink>
      </div>
    </motion.nav>
  );
}
