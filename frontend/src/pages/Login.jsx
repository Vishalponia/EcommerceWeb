




import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("user");

  const [loading, setLoading] = useState(false);
  const {
  loginUser,
  loginSeller
} = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // HANDLE LOGIN
  // ==========================================

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // ======================================
      // USER LOGIN
      // ======================================

      if (accountType === "user") {
        const res = await axios.post(
          "https://ecommerceweb-xxb1.onrender.com/api/auth/login",
          {
            email: formData.email,
            password: formData.password,
          },
          {
            withCredentials: true,
          }
        );

        toast.success(
          res.data.message || "Login successful"
        );

        // Existing user data
        if (res.data.user) {
          // localStorage.setItem(
          //   "user",
          //   JSON.stringify(res.data.user)
          // );
          //   localStorage.removeItem("seller");
          loginUser(res.data.user);
        }

        navigate("/");
      }

      // ======================================
      // SELLER LOGIN
      // ======================================

      else {
        const res = await axios.post(
          "https://ecommerceweb-xxb1.onrender.com/api/seller/login",
          {
            email: formData.email,
            password: formData.password,
          },
          {
            withCredentials: true,
          }
        );

        toast.success(
          res.data.message || "Seller login successful"
        );

        // Store seller data
        if (res.data.seller) {
        //   localStorage.setItem(
        //     "seller",
        //     JSON.stringify(res.data.seller)
        //   );

        //  localStorage.removeItem("user");
         loginSeller(res.data.seller);
        }

         navigate("/seller/dashboard");
        
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-5 py-10">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* ================================= */}
        {/* TITLE */}
        {/* ================================= */}

        <h1 className="text-3xl font-bold text-center">
          Welcome Back
        </h1>

        <p className="text-gray-500 text-center mt-2">
          Login to your account
        </p>


        {/* ================================= */}
        {/* ACCOUNT TYPE */}
        {/* ================================= */}

        <div className="grid grid-cols-2 gap-3 mt-8">

          {/* USER */}

          <button
            type="button"
            onClick={() => setAccountType("user")}
            className={`py-3 rounded-lg font-semibold transition ${
              accountType === "user"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            👤 User
          </button>


          {/* SELLER */}

          <button
            type="button"
            onClick={() => setAccountType("seller")}
            className={`py-3 rounded-lg font-semibold transition ${
              accountType === "seller"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🏪 Seller
          </button>

        </div>


        {/* ================================= */}
        {/* LOGIN FORM */}
        {/* ================================= */}

        <form
          onSubmit={handleLogin}
          className="mt-8"
        >

          {/* EMAIL */}

          <div className="mb-5">

            <label className="block font-semibold mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>


          {/* PASSWORD */}

          <div className="mb-6">

            <label className="block font-semibold mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>


          {/* LOGIN BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >

            {loading
              ? "Logging in..."
              : accountType === "seller"
              ? "Login as Seller"
              : "Login as User"}

          </button>

        </form>


        {/* ================================= */}
        {/* SIGNUP */}
        {/* ================================= */}

        <p className="text-center text-gray-600 mt-6">

          Don't have an account?

          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-blue-600 font-semibold ml-2 hover:underline"
          >
            Sign Up
          </button>

        </p>

      </div>

    </div>
  );
};

export default Login;