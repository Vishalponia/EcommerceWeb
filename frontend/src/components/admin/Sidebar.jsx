import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaList,
  FaPlus,
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";

const Sidebar = () => {

const navigate = useNavigate();
//logout function handle here

  const handleLogout = async () => {

  try {

    const res = await axios.post(
      "https://ecommerceweb-xxb1.onrender.com/api/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );

    toast.success(res.data.message);

    localStorage.removeItem("user");

    navigate("/");

    window.location.reload();

  } catch (error) {

    console.log(error);

  }

};


  return (
    <div className="w-72 bg-slate-900 text-white min-h-screen">

      <div className="text-center py-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">
          Admin Panel
        </h1>
      </div>

      <div className="mt-6 flex flex-col">

        <NavLink
          to="/admin"
          end
          className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800"
        >
          <FaTachometerAlt />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/add-category"
          className="flex items-center gap-3 px-6 py-4 rounded-lg hover:bg-green-500"
        >
          <FaPlus />
          Add Category
        </NavLink>

        <NavLink
          to="/admin/categories"
          className="flex items-center gap-3 px-6 py-4 rounded-lg hover:bg-green-500"
        >
          <FaList />
          Categories
        </NavLink>

        <NavLink
          to="/admin/add-product"
          className="flex items-center gap-3 px-6 py-4 rounded-lg hover:bg-green-500"
        >
          <FaBox />
          Add Product
        </NavLink>

        <NavLink
          to="/admin/products"
          className="flex items-center gap-3 px-6 py-4 rounded-lg hover:bg-green-500"
        >
          <FaBox />
          Products
        </NavLink>

        {/* <NavLink
          to="/admin/orders"
          className="flex items-center gap-3 px-6 py-4 hover:bg-slate-800"
        >
          <FaShoppingCart />
          Orders
        </NavLink> */}


        <NavLink
  to="/admin/orders"
  className={({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "hover:bg-green-500"
    }`
  }
>
  <FaShoppingCart />
  Orders
</NavLink>

        <NavLink
          to="/admin/users"
          className="flex items-center gap-3 px-6 py-4 rounded-lg hover:bg-green-500"
        >
          <FaUsers />
          Users
        </NavLink>

        <button onClick={handleLogout}
        className="flex items-center gap-3 px-6 py-4 rounded-lg hover:bg-red-600 mt-auto">
        
          <FaSignOutAlt />
          Logout
        </button>

      </div>
    </div>
  );
};

export default Sidebar;