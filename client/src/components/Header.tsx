import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="flex my-10 items-center justify-between">
      <Link to={"/"} className="text-3xl font-bold">
        SimpleShare
      </Link>
      <div className=" space-x-4">
        <Link to="/login" className="text-white bg-black py-2 px-4 border">
          Login
        </Link>
        <Link to="/register" className="border py-2 px-4">
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Header;
