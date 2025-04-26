import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { useLogoutMutation } from "../slices/userApi";
import { clearUserInfo } from "../slices/auth";

const Header = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [logut, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logut({});
      dispatch(clearUserInfo());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

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
            onClick={logoutHandler}
            disabled={isLoading}
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
