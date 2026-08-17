import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const SellerDashboard = () => {
  const navigate = useNavigate();

  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // FETCH SELLER PROFILE
  // ==========================================

  const fetchSellerProfile = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/seller/profile",
      {
        withCredentials: true,
      }
    );

    console.log("SELLER PROFILE:", res.data);

    setSeller(res.data.seller);

  } catch (error) {

    console.log(
      "PROFILE ERROR:",
      error.response?.status,
      error.response?.data
    );

    toast.error(
      error.response?.data?.message ||
      "Failed to load seller profile"
    );

    // TEMPORARILY REMOVE THIS
    // navigate("/login");
  }
};

  // ==========================================
  // FETCH SELLER PRODUCTS
  // ==========================================



  const fetchSellerProducts = async () => {
  try {

    const res = await axios.get(
      "http://localhost:5000/api/seller/products",
      {
        withCredentials: true,
      }
    );

    setProducts(res.data.products);

  } catch (error) {

    console.log(
      "SELLER PRODUCTS ERROR:",
      error.response?.data || error.message
    );

    toast.error("Failed to load products");
  }
};

  const getSellerProfile = async (req, res) => {
  try {

    const seller = await Seller.findById(
      req.seller.id
    ).select("-password");

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    res.status(200).json({
      success: true,
      seller,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

  // ==========================================
  // USE EFFECT
  // ==========================================

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);

      await fetchSellerProfile();
      await fetchSellerProducts();

      setLoading(false);
    };

    loadDashboard();
  }, []);


  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/seller/logout",
        {},
        {
          withCredentials: true,
        }
      );

      localStorage.removeItem("seller");

      toast.success("Seller logged out");

      navigate("/login");

    } catch (error) {
      console.log(error);

      toast.error("Logout failed");
    }
  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">

        <h2 className="text-2xl font-bold">
          Loading Dashboard...
        </h2>

      </div>
    );
  }


  // ==========================================
  // DASHBOARD
  // ==========================================

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================================= */}
      {/* NAVBAR */}
      {/* ================================= */}

      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-blue-600">
          Seller Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>


      {/* ================================= */}
      {/* MAIN */}
      {/* ================================= */}

      <div className="max-w-7xl mx-auto px-5 py-10">

        {/* WELCOME */}

        <div className="bg-white rounded-2xl shadow p-8 mb-8">

          <h2 className="text-3xl font-bold">

            Welcome,
            {" "}
            {seller?.name || "Seller"} 👋

          </h2>

          <p className="text-gray-500 mt-2">

            {seller?.shopName
              ? `Manage your ${seller.shopName} products`
              : "Manage your products"}

          </p>

        </div>


        {/* ================================= */}
        {/* STATS */}
        {/* ================================= */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">


          {/* TOTAL PRODUCTS */}

          <div className="bg-white rounded-2xl shadow p-6">

            <p className="text-gray-500">
              Total Products
            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-2">
              {products.length}
            </h2>

          </div>


          {/* ADD PRODUCT */}

          <div
            onClick={() => navigate("/seller/add-product")}
            className="bg-white rounded-2xl shadow p-6 cursor-pointer hover:shadow-xl transition"
          >

            <p className="text-gray-500">
              Product Management
            </p>

            <Link
  to="/seller/add-product"
  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
>
  + Add Product
</Link>

          </div>















     {/* MY PRODUCTS */}

<div
            onClick={() => navigate("/seller/products")}
            className="bg-white rounded-2xl shadow p-6 cursor-pointer hover:shadow-xl transition"
          >

            <p className="text-gray-500">
                 Manage Product
            </p>

            <Link
  to="/seller/products"
  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
>
  My Products
</Link>

          </div>


          

        </div>


        {/* ================================= */}
        {/* QUICK ACTIONS */}
        {/* ================================= */}

        {/* <div className="bg-white rounded-2xl shadow p-8"> */}

          {/* <h2 className="text-2xl font-bold mb-6">
            Quick Actions
          </h2> */}


          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-5"> */}

{/* 
            <button
              onClick={() =>
                navigate("/seller/add-product")
              }
              className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold"
            >
              + Add Product
            </button> */}


            {/* <button
              onClick={() =>
                navigate("/seller/products")
              }
              className="bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold"
            >
              My Products
            </button> */}


            {/* <button
              onClick={() =>
                navigate("/seller/profile")
              }
              className="bg-gray-800 hover:bg-gray-900 text-white py-4 rounded-xl font-semibold"
            >
              Seller Profile
            </button> */}

          {/* </div>

        </div> */}

      </div>

    </div>
  );
};

export default SellerDashboard;