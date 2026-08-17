import Sidebar from "../components/admin/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";


const AdminDashboard = () => {
  const [stats, setStats] = useState({
  categories: 0,
  products: 0,
  orders: 0,
  users: 0,
});


useEffect(() => {
  fetchStats();
}, []);

const fetchStats = async () => {
  try {
    const res = await axios.get(
      "https://ecommerceweb-xxb1.onrender.com/api/dashboard/stats",
      {
        withCredentials: true,
      }
    );

    setStats(res.data.stats);
  } catch (error) {
    console.log(error);
  }
};
   

  const user = JSON.parse(localStorage.getItem("user"));

  return (

    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <div className="bg-white shadow px-8 py-5 flex justify-between">

          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <div>

            Welcome,

            <span className="font-bold ml-2">

              {user.name}

            </span>

          </div>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 p-8">

          <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-gray-500">
              Categories
            </h2>

            <p className="text-4xl font-bold mt-3">
              {stats.categories}
            </p>

          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-gray-500">
              Products
            </h2>

            <p className="text-4xl font-bold mt-3">
              {stats.products}
            </p>

          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-gray-500">
              Orders
            </h2>
            <p className="text-4xl font-bold mt-3">
              {stats.orders}
            </p>

          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-gray-500">
              Users
            </h2>

            <p className="text-4xl font-bold mt-3">
               {stats.users}
            </p>

          </div>

        </div>

      </div>

    </div>

  );

};

export default AdminDashboard;