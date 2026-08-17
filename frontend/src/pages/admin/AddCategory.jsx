import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !image) {
      return toast.error("All fields are required");
    }

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("status", status);
      formData.append("image", image);

      const res = await axios.post(
        "https://ecommerceweb-xxb1.onrender.com/api/categories",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(res.data.message);

      setName("");
      setDescription("");
      setStatus("Active");
      setImage(null);
      setPreview("");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-8">

      <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl p-8">

        <h2 className="text-3xl font-bold mb-8 text-center">
          Add New Category
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="font-semibold">
              Category Name
            </label>

            <input
              type="text"
              placeholder="Enter Category Name"
              className="w-full mt-2 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">
              Description
            </label>

            <textarea
              rows="4"
              placeholder="Enter Description"
              className="w-full mt-2 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">
              Status
            </label>

            <select
              className="w-full mt-2 border rounded-lg p-3"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">
              Category Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full mt-2"
            />
          </div>

          {preview && (
            <div className="flex justify-center">
              <img
                src={preview}
                alt="preview"
                className="w-40 h-40 object-cover rounded-lg border"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Add Category
          </button>

        </form>

      </div>

    </div>
  );
};

export default AddCategory;