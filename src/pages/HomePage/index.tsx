import { motion } from "motion/react";
import { NavLink } from "react-router-dom";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5,
    },
  },
  exit: {
    x: "-100vw",
    opacity: 0,
    transition: {
      ease: "easeInOut",
    },
  },
};
const childVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};
const HomePage: React.FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex gap-10 flex-col justify-center items-center min-h-screen"
    >
      <div className="text-6xl text-center leading-relaxed">
        <motion.p variants={childVariants}>Your Tech Partner</motion.p>
        <motion.p variants={childVariants}>in Real Estate</motion.p>
        <motion.p variants={childVariants}>Innovation</motion.p>
      </div>
      <motion.button
        variants={childVariants}
        className="btn btn-primary hover:scale-110 transition-all duration-300"
      >
        <NavLink to={"/notices?page=1"}>Explore Notices</NavLink>
      </motion.button>
    </motion.div>
  );
};

export default HomePage;
