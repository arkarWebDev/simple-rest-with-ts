import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store";

const Header = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  return (
    <nav className="flex my-10 items-center justify-between">
      <Link to={"/"} className="text-3xl font-bold">
        SimpleShare
      </Link>
      <div className=" space-x-4">
        {userInfo ? (
          <button
            type="button"
            className="text-white bg-red-600 py-2 px-4 border border-red-600"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="text-white bg-black py-2 px-4 border">
              Login
            </Link>
            <Link to="/register" className="border py-2 px-4">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
