import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SellerAddProduct = () => {

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

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

  useEffect(() => {

    fetchCategories();

  }, []);


  const fetchCategories = async () => {

    try {

      const res = await axios.get(
        "https://ecommerceweb-xxb1.onrender.com/api/categories"
      );

      setCategories(res.data.categories);

    } catch (error) {

      console.log(error);

      toast.error("Failed to load categories");

    }

  };


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
  // HANDLE IMAGE
  // ==========================================

  const handleImages = (e) => {

    setImages(Array.from(e.target.files));

  };


  // ==========================================
  // ADD PRODUCT
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);

      data.append(
        "description",
        formData.description
      );

      data.append("price", formData.price);
      data.append("stock", formData.stock);

      data.append(
        "category",
        formData.category
      );


      images.forEach((image) => {

        data.append("images", image);

      });


      const res = await axios.post(

        "https://ecommerceweb-xxb1.onrender.com/api/seller/products",

        data,

        {
          withCredentials: true,
        }

      );


      toast.success(
        res.data.message ||
        "Product added successfully"
      );


      // Reset form

      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
      });

      setImages([]);


      // Redirect

      navigate("/seller/dashboard");


    } catch (error) {

      console.log(error);

      toast.error(

        error.response?.data?.message ||

        "Failed to add product"

      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="min-h-screen bg-gray-100 py-10 px-5">

      <div className="max-w-3xl mx-auto">

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h1 className="text-3xl font-bold mb-2">

            Add Product

          </h1>

          <p className="text-gray-500 mb-8">

            Add a new product to your store

          </p>


          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Product Name */}

            <div>

              <label className="block font-semibold mb-2">

                Product Name

              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


            {/* Description */}

            <div>

              <label className="block font-semibold mb-2">

                Description

              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows="5"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


            {/* Price */}

            <div>

              <label className="block font-semibold mb-2">

                Price

              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                min="1"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>





            {/* Stock */}

<div>

  <label className="block font-semibold mb-2">
    Stock
  </label>

  <input
    type="number"
    name="stock"
    value={formData.stock}
    onChange={handleChange}
    placeholder="Enter available stock"
    min="0"
    required
    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
  />

</div>


            {/* Category */}

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


            {/* Images */}

            <div>

              <label className="block font-semibold mb-2">

                Product Images

              </label>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImages}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />

              <p className="text-sm text-gray-500 mt-2">

                You can select up to 5 images.

              </p>

            </div>


            {/* Button */}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-lg text-white font-semibold transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >

              {loading
                ? "Adding Product..."
                : "Add Product"}

            </button>

          </form>

        </div>

      </div>

    </div>

  );

};

export default SellerAddProduct;