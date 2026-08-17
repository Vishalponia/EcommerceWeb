import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CategoryList = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/categories",
        {
          withCredentials: true,
        }
      );

      setCategories(res.data.categories);
    } catch (error) {
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };



  const deleteCategory = async (id) => {

  const result = await Swal.fire({
    title: "Delete Category?",
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
      `http://localhost:5000/api/categories/${id}`,
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

    getCategories();

  } catch (error) {

    Swal.fire({
      title: "Error!",
      text: error.response?.data?.message || "Delete failed",
      icon: "error",
    });

  }

};

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="bg-white shadow-lg rounded-xl p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-bold">
            Category List
          </h2>

          <span className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Total : {categories.length}
          </span>

        </div>

        {loading ? (

          <h2 className="text-center text-xl">
            Loading...
          </h2>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-blue-600 text-white">

                <tr>

                  <th className="py-4">Image</th>

                  <th>Name</th>

                  <th>Description</th>

                  <th>Status</th>
                   <th> Created by</th>
                  <th> Updated by</th>

                  <th>Actions</th>
                 

                </tr>

              </thead>

              <tbody>

                {categories.map((category) => (

                  <tr
                    key={category._id}
                    className="border-b text-center hover:bg-gray-50"
                  >

                    <td className="py-4">

                      <img
                        src={`http://localhost:5000/uploads/category-images/${category.image}`}
                        alt={category.name}
                        className="w-20 h-20 rounded-lg object-cover mx-auto"
                      />

                    </td>

                    <td className="font-semibold">
                      {category.name}
                    </td>

                    <td>
                      {category.description}
                    </td>

                    <td>

                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${
                          category.status === "Active"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {category.status}
                      </span>

                    </td>
                    <td className="px-4 py-3">
  {category.createdBy?.name || "-"}
</td>

<td className="px-4 py-3">
  {category.updatedBy?.name || "-"}
</td>

                    <td>

                      <div className="flex justify-center gap-4">

                    <button
                            onClick={() =>navigate(`/admin/edit-category/${category._id}`)}
                            className="bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600"
                     >
                           <FaEdit />
                     </button>

                        <button
                           onClick={() => deleteCategory(category._id)}
                          className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600"
                        >
                          <FaTrash />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
};

export default CategoryList;