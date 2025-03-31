import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/CheckOut";
import Order from "./pages/Order";
import ProtectedRoute from "./Components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;

  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products/:id" element={<ProductDetail />} />
          <Route
            exact
            path="/login"
            element={userInfo ? <Navigate to="/" /> : <Login />}
          />
          <Route exact path="/cart" element={<Cart />} />
          <Route
            exact
            path="/register"
            element={userInfo ? <Navigate to="/" /> : <Register />}
          />

          {/* Protected Routes */}
          <Route
            exact
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/orders"
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
