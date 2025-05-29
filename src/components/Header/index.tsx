import { NavLink } from "react-router-dom";
import ThemeToggler from "../ThemeToggler";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  return (
    <>
      <div className="navbar bg-accent-content shadow-md rounded-bl-box rounded-br-box sticky top-0 z-10">
        <div className="container justify-between items-center flex mx-auto">
          <motion.div
            initial={{ x: -250 }}
            animate={{ x: -10 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          >
            <NavLink
              to={"/"}
              className="btn btn-ghost text-xl font-black transition-all duration-500"
            >
              ||NicheSolutions
            </NavLink>
          </motion.div>
          <motion.div
            initial={{ x: 250 }}
            animate={{ x: 10 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
            className="flex  items-center gap-10"
          >
            <ThemeToggler />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Header;
