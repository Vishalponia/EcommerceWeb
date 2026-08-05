import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import Sidebar from "../../components/admin/Sidebar";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    status: "Active",
  });

  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [pr, cr] = await Promise.all([
          axios.get(`http://localhost:5000/api/products/${id}`),
          axios.get("http://localhost:5000/api/categories"),
        ]);

        const p = pr.data.product;

        setForm({
          name: p.name,
          description: p.description,
          price: p.price,
          stock: p.stock,
          category: p.category?._id || p.category,
          status: p.status,
        });

        setOldImages(p.images || []);
        setCategories(cr.data.categories || []);
      } catch {
        toast.error("Load failed");
      }
    })();
  }, []);

  const ch = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const sub = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();

      Object.entries(form).forEach(([k, v]) => fd.append(k, v));

      for (let i = 0; i < images.length; i++) {
        fd.append("images", images[i]);
      }

      await axios.put(
        `http://localhost:5000/api/products/${id}`,
        fd,
        {
          withCredentials: true,
        }
      );

      toast.success("Product updated");
      navigate("/admin/products");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-100 min-h-screen">
        <form
          onSubmit={sub}
          className="bg-white p-6 rounded-xl shadow max-w-3xl"
        >
          <h2 className="text-3xl font-bold mb-6">
            Edit Product
          </h2>

          <input
            className="w-full border p-3 mb-4"
            name="name"
            value={form.name}
            onChange={ch}
          />

          <textarea
            className="w-full border p-3 mb-4"
            rows="4"
            name="description"
            value={form.description}
            onChange={ch}
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              className="border p-3"
              type="number"
              name="price"
              value={form.price}
              onChange={ch}
            />

            <input
              className="border p-3"
              type="number"
              name="stock"
              value={form.stock}
              onChange={ch}
            />
          </div>

          <select
            className="w-full border p-3 my-4"
            name="category"
            value={form.category}
            onChange={ch}
          >
            <option value="">Select Category</option>

            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            className="w-full border p-3 mb-4"
            name="status"
            value={form.status}
            onChange={ch}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <div className="flex gap-2 flex-wrap mb-4">
            {oldImages.map((img, i) => (
              <img
                key={i}
                src={`http://localhost:5000/uploads/product-images/${img}`}
                className="w-24 h-24 object-cover rounded"
              />
            ))}
          </div>

          <input
            type="file"
            multiple
            onChange={(e) => setImages(e.target.files)}
            className="mb-6"
          />

          <button
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
}