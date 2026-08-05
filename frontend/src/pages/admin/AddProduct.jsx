import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Active");

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/categories"
      );

      setCategories(res.data.categories);
    } catch (error) {
      toast.error("Unable to load categories");
    }
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    setImages(files);

    const imagePreview = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreview(imagePreview);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !description ||
      !price ||
      !stock ||
      !category
    ) {
      return toast.error("Please fill all fields");
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category", category);
    formData.append("status", status);

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const res = await axios.post(
        "http://localhost:5000/api/products",
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
      setPrice("");
      setStock("");
      setCategory("");
      setStatus("Active");
      setImages([]);
      setPreview([]);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add product"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h2 className="text-3xl font-bold mb-8">
          Add Product
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            type="text"
            placeholder="Product Name"
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

          <div className="grid grid-cols-2 gap-5">

            <input
              type="number"
              placeholder="Price"
              className="border p-3 rounded-lg"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              type="number"
              placeholder="Stock"
              className="border p-3 rounded-lg"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />

          </div>

          <select
            className="w-full border p-3 rounded-lg"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">
              Select Category
            </option>

            {categories.map((cat) => (

              <option
                key={cat._id}
                value={cat._id}
              >
                {cat.name}
              </option>

            ))}

          </select>

          <select
            className="w-full border p-3 rounded-lg"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImages}
          />

          {preview.length > 0 && (

            <div className="grid grid-cols-5 gap-4">

              {preview.map((img, index) => (

                <img
                  key={index}
                  src={img}
                  alt=""
                  className="w-28 h-28 rounded-lg object-cover"
                />

              ))}

            </div>

          )}

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            Add Product
          </button>

        </form>

      </div>

    </div>
  );
};

export default AddProduct;