import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");

  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState("");

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      const res = await axios.get(
        `https://ecommerceweb-xxb1.onrender.com/api/categories/${id}`
      );

      const category = res.data.category;

      setName(category.name);
      setDescription(category.description);
      setStatus(category.status);
      setOldImage(category.image);

    } catch (error) {
      toast.error("Category not found");
    }
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const updateCategory = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("status", status);

      if (image) {
        formData.append("image", image);
      }

      const res = await axios.put(
        `https://ecommerceweb-xxb1.onrender.com/api/categories/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(res.data.message);

      navigate("/admin/categories");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-8">

      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-2xl">

        <h2 className="text-3xl font-bold text-center mb-8">
          Edit Category
        </h2>

        <form
          onSubmit={updateCategory}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Category Name"
            className="w-full border p-3 rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            rows="4"
            placeholder="Description"
            className="w-full border p-3 rounded-lg"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="w-full border p-3 rounded-lg"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <div>

            <label className="font-semibold">
              Current Image
            </label>

            <img
              src={`https://ecommerceweb-xxb1.onrender.com/uploads/category-images/${oldImage}`}
              alt=""
              className="w-40 h-40 rounded-lg object-cover mt-3"
            />

          </div>

          <input
            type="file"
            onChange={handleImage}
          />

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            Update Category
          </button>

        </form>

      </div>

    </div>
  );
};

export default EditCategory;