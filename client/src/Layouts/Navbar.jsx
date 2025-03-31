import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { UserDropdown } from "../Components/Dropdown";
import { userLogoutAction } from "../Redux/Actions/User";
import { IoCartOutline } from "react-icons/io5";

const Navbar = () => {
  const dispatch = useDispatch();

  // Get user and cart data from Redux
  const { userInfo } = useSelector((state) => state.userLoginReducer);
  const { cartItems } = useSelector((state) => state.cartReducer);

  const logoutHandler = () => {
    dispatch(userLogoutAction());
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 shadow-md dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="ml-2 text-2xl font-semibold text-gray-800 dark:text-white">
                Afro Shop
              </span>
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <div className=" md:flex space-x-8 ">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-700 font-medium"
            >
              Home
            </Link>
            {userInfo && (
              <Link
                to="/orders"
                className="text-gray-700 hover:text-blue-700 font-medium"
              >
                My Orders
              </Link>
            )}
          </div>

          {/* Right: Cart & User Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-blue-700"
            >
              <IoCartOutline size={28} />
              {cartItems?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* User Login/Signup or User Dropdown */}
            {!userInfo ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-700 font-medium text-sm"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <UserDropdown logoutHandler={logoutHandler} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
