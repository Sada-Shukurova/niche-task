import { NavLink } from "react-router-dom";
import ThemeToggler from "../ThemeToggler";

const Header: React.FC = () => {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm sticky top-0 z-10">
        <div className="container justify-between items-center flex mx-auto">
          <div>
            <NavLink to={"/"} className="btn btn-ghost text-xl">
              NicheSolutions
            </NavLink>
          </div>
          <div className="flex  items-center gap-10">
            <NavLink to={"/notices?page=1"}>Notices</NavLink>
            <ThemeToggler />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
