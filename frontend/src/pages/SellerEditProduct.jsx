import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const SellerEditProduct = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const [images, setImages] = useState([]);


  // ==========================================
  // FETCH CATEGORIES
  // ==========================================

  const fetchCategories = async () => {

    try {

      const res = await axios.get(
        "https://ecommerceweb-xxb1.onrender.com/api/categories"
      );

      setCategories(
        res.data.categories || []
      );

    } catch (error) {

      console.log(error);

      toast.error("Failed to load categories");

    }

  };


  // ==========================================
  // FETCH PRODUCT
  // ==========================================

  const fetchProduct = async () => {

    try {

      const res = await axios.get(
        `https://ecommerceweb-xxb1.onrender.com/api/seller/products/${id}`,
        {
          withCredentials: true,
        }
      );

      const product = res.data.product;

      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        stock: product.stock ?? "",
        category: product.category?._id || "",
      });

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to load product"
      );

      navigate("/seller/products");

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // USE EFFECT
  // ==========================================

  useEffect(() => {

    fetchCategories();
    fetchProduct();

  }, [id]);


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
  // HANDLE IMAGES
  // ==========================================

  const handleImages = (e) => {

    setImages(
      Array.from(e.target.files)
    );

  };


  // ==========================================
  // UPDATE PRODUCT
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);

      const data = new FormData();

      data.append(
        "name",
        formData.name
      );

      data.append(
        "description",
        formData.description
      );

      data.append(
        "price",
        formData.price
      );

      data.append(
        "stock",
        formData.stock
      );

      data.append(
        "category",
        formData.category
      );


      images.forEach((image) => {

        data.append(
          "images",
          image
        );

      });


      const res = await axios.put(

        `https://ecommerceweb-xxb1.onrender.com/api/seller/products/${id}`,

        data,

        {
          withCredentials: true,
        }

      );


      toast.success(
        res.data.message ||
        "Product updated successfully"
      );


      navigate("/seller/products");


    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to update product"
      );

    } finally {

      setSaving(false);

    }

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <h2 className="text-2xl font-bold">
          Loading Product...
        </h2>

      </div>

    );

  }


  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="min-h-screen bg-gray-100 py-10 px-5">

      <div className="max-w-3xl mx-auto">

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h1 className="text-3xl font-bold">
            Edit Product
          </h1>

          <p className="text-gray-500 mt-2 mb-8">
            Update your product details
          </p>


          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >


            {/* PRODUCT NAME */}

            <div>

              <label className="block font-semibold mb-2">
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


            {/* DESCRIPTION */}

            <div>

              <label className="block font-semibold mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


            {/* PRICE + STOCK */}

            <div className="grid md:grid-cols-2 gap-5">


              {/* PRICE */}

              <div>

                <label className="block font-semibold mb-2">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="1"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>


              {/* STOCK */}

              <div>

                <label className="block font-semibold mb-2">
                  Stock
                </label>

                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>


            {/* CATEGORY */}

            <div>

              <label className="block font-semibold mb-2">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              >

                <option value="">
                  Select Category
                </option>

                {categories.map((category) => (

                  <option
                    key={category._id}
                    value={category._id}
                  >
                    {category.name}
                  </option>

                ))}

              </select>

            </div>


            {/* IMAGES */}

            <div>

              <label className="block font-semibold mb-2">
                Replace Product Images
              </label>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImages}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />

              <p className="text-sm text-gray-500 mt-2">
                Leave empty to keep existing images.
              </p>

            </div>


            {/* BUTTONS */}

            <div className="flex gap-4">

              <button
                type="button"
                onClick={() =>
                  navigate("/seller/products")
                }
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold"
              >
                Cancel
              </button>


              <button
                type="submit"
                disabled={saving}
                className={`flex-1 py-3 rounded-lg text-white font-semibold ${
                  saving
                    ? "bg-gray-400"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >

                {saving
                  ? "Updating..."
                  : "Update Product"}

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

};

export default SellerEditProduct;