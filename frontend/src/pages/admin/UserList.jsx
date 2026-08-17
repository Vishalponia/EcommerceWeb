import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/admin/Sidebar";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "https://ecommerceweb-xxb1.onrender.com/api/users",
        {
          withCredentials: true,
        }
      );

      setUsers(res.data.users);

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch users"
      );

    } finally {

      setLoading(false);

    }
  };

  const filteredUsers = useMemo(() => {

    return users.filter((user) =>

      user.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      user.email
        .toLowerCase()
        .includes(search.toLowerCase())

    );

  }, [users, search]);








  const deleteUser = async (id) => {
  const result = await Swal.fire({
    title: "Delete User?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, Delete",
    cancelButtonText: "Cancel",
    reverseButtons: true,
  });

  if (!result.isConfirmed) return;

  try {
    const res = await axios.delete(
      `https://ecommerceweb-xxb1.onrender.com/api/users/${id}`,
      {
        withCredentials: true,
      }
    );

    Swal.fire({
      title: "Deleted!",
      text: res.data.message,
      icon: "success",
      timer: 1800,
      showConfirmButton: false,
    });

    fetchUsers(); // Refresh user list
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: error.response?.data?.message || "Delete failed",
      icon: "error",
    });
  }
};
  return (

    <div className="flex">

      <Sidebar />

      <div className="flex-1 min-h-screen bg-gray-100 p-8">

        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <div>

            <h1 className="text-3xl font-bold">
              Users
            </h1>

            <p className="text-gray-500 mt-1">
              Total Users : {filteredUsers.length}
            </p>

          </div>

          <input
            type="text"
            placeholder="Search user..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full md:w-80 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Card */}

        <div className="bg-white rounded-xl shadow">

          {
            loading ? (

              <div className="py-20 text-center">

                <h2 className="text-xl font-semibold">
                  Loading Users...
                </h2>

              </div>

            ) : filteredUsers.length === 0 ? (

              <div className="py-20 text-center">

                <h2 className="text-xl font-semibold">
                  No Users Found
                </h2>

              </div>

            ) : (

              <div className="overflow-x-auto">

                {/* TABLE WILL COME IN PART 2 */}


                <table className="min-w-full">

  <thead className="bg-slate-100">

    <tr>

      <th className="px-5 py-4 text-left">
        User
      </th>

      <th className="px-5 py-4 text-left">
        Email
      </th>

      <th className="px-5 py-4 text-center">
        Role
      </th>

      <th className="px-5 py-4 text-center">
        Joined
      </th>

      <th className="px-5 py-4 text-center">
        Action
      </th>

    </tr>

  </thead>

  <tbody>

    {filteredUsers.map((user) => (

      <tr
        key={user._id}
        className="border-t hover:bg-gray-50 transition"
      >

        {/* Avatar + Name */}

        <td className="px-5 py-4">

          <div className="flex items-center gap-4">

            <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">

              {user.name.charAt(0).toUpperCase()}

            </div>

            <div>

              <h3 className="font-semibold">

                {user.name}

              </h3>

            </div>

          </div>

        </td>

        {/* Email */}

        <td className="px-5 py-4">

          {user.email}

        </td>

        {/* Role */}

        <td className="px-5 py-4 text-center">

          <span
            className={`px-4 py-1 rounded-full text-white text-sm font-semibold
            ${
              user.role === "admin"
                ? "bg-purple-600"
                : "bg-green-600"
            }`}
          >

            {user.role}

          </span>

        </td>

        {/* Joined */}

        <td className="px-5 py-4 text-center">

          {new Date(
            user.createdAt
          ).toLocaleDateString()}

        </td>

        {/* Actions */}

        <td className="px-5 py-4">

          <div className="flex justify-center gap-3">

            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
            >
              Edit
            </button>

            <button onClick={() => deleteUser(user._id)}className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200">
                    Delete
            </button>

          </div>

        </td>

      </tr>

    ))}

  </tbody>

</table>

              </div>

            )
          }

        </div>

      </div>

    </div>

  );

};

export default UserList;