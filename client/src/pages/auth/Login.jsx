import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Layouts/Layouts";
import { userLoginAction } from "../../Redux/Actions/User";
import { useState, useEffect } from "react";
import { Preloader } from "../../Components/Preloader";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { loading, error, userInfo } = userLoginReducer;
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    setSubmitted(true);
    dispatch(userLoginAction(email, password));
  };

  useEffect(() => {
    // Reset submitted flag once userInfo is available (i.e. login successful)
    if (userInfo) {
      setSubmitted(false);
    }
  }, [userInfo]);

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
          {submitted && loading && <Preloader />}
          {error && <h1 className="text-center text-red-600">{error}</h1>}
          <form className="space-y-5" onSubmit={submitHandler}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
