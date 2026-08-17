// import { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const Signup = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/auth/signup",
//         formData
//       );

//       toast.success(res.data.message);

//       navigate("/login");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100">
//       <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">

//         <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
//           Create Account
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">

//           <div>
//             <label className="block mb-2 font-medium">Full Name</label>

//             <input
//               type="text"
//               name="name"
//               placeholder="Enter Name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-2 font-medium">Email</label>

//             <input
//               type="email"
//               name="email"
//               placeholder="Enter Email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-2 font-medium">Password</label>

//             <input
//               type="password"
//               name="password"
//               placeholder="Enter Password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
//           >
//             Sign Up
//           </button>

//         </form>

//         <p className="text-center mt-5">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="text-blue-600 font-semibold"
//           >
//             Login
//           </Link>
//         </p>

//       </div>
//     </div>
//   );
// };

// export default Signup;




import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("user");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    shopName: "",
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
  // HANDLE SIGNUP
  // ==========================================

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);


      // ======================================
      // USER SIGNUP
      // ======================================

      if (accountType === "user") {

        const res = await axios.post(
          "http://localhost:5000/api/auth/signup",
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }
        );


        toast.success(
          res.data.message ||
          "User registered successfully"
        );


        // Go to login
        navigate("/login");

      }


      // ======================================
      // SELLER SIGNUP
      // ======================================

      else {

        const res = await axios.post(
          "http://localhost:5000/api/seller/signup",
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            shopName: formData.shopName,
          }
        );


        toast.success(
          res.data.message ||
          "Seller registered successfully"
        );


        // Go to login
        navigate("/login");

      }

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Signup failed"
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

          Create Account

        </h1>

        <p className="text-gray-500 text-center mt-2">

          Join our Ecommerce platform

        </p>


        {/* ================================= */}
        {/* ACCOUNT TYPE */}
        {/* ================================= */}

        <div className="grid grid-cols-2 gap-3 mt-8">

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
        {/* FORM */}
        {/* ================================= */}

        <form
          onSubmit={handleSignup}
          className="mt-8"
        >


          {/* NAME */}

          <div className="mb-4">

            <label className="block font-semibold mb-2">

              Name

            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>


          {/* SELLER ONLY - SHOP NAME */}

          {accountType === "seller" && (

            <div className="mb-4">

              <label className="block font-semibold mb-2">

                Shop Name

              </label>

              <input
                type="text"
                name="shopName"
                value={formData.shopName}
                onChange={handleChange}
                placeholder="Enter your shop name"
                required
                className="w-full border border-gray-300 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

          )}


          {/* SELLER ONLY - PHONE */}

          {accountType === "seller" && (

            <div className="mb-4">

              <label className="block font-semibold mb-2">

                Phone

              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
                className="w-full border border-gray-300 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

          )}


          {/* EMAIL */}

          <div className="mb-4">

            <label className="block font-semibold mb-2">

              Email

            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
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
              placeholder="Enter password"
              required
              minLength="6"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>


          {/* SUBMIT */}

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
              ? "Creating Account..."
              : accountType === "seller"
              ? "Create Seller Account"
              : "Create User Account"}

          </button>

        </form>


        {/* ================================= */}
        {/* LOGIN LINK */}
        {/* ================================= */}

        <p className="text-center text-gray-600 mt-6">

          Already have an account?

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-600 font-semibold ml-2 hover:underline"
          >

            Login

          </button>

        </p>

      </div>

    </div>

  );

};

export default Signup;