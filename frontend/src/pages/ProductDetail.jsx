import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import Swal from "sweetalert2";

const ProductDetail = () => {
  const { id } = useParams();
  const { fetchCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Fetch Single Product
  const fetchProduct = async () => {
    setLoading(true);

    try {
      const res = await axios.get(
        `https://ecommerceweb-xxb1.onrender.com/api/products/${id}`,
        {
        withCredentials: true,
      }
      );

      setProduct(res.data.product);

      if (res.data.product.category?._id) {
        fetchRelatedProducts(res.data.product.category._id);
      }
    } catch (error) {
      console.log(error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Related Products
  const fetchRelatedProducts = async (categoryId) => {
    try {
      const res = await axios.get(
        `https://ecommerceweb-xxb1.onrender.com/api/products/category/${categoryId}`
      );

      const filteredProducts = res.data.products.filter(
        (item) => item._id !== id
      );

      setRelatedProducts(filteredProducts);
    } catch (error) {
      console.log(error);
    }
  };

  // Quantity
  const increaseQty = () => {
    if (quantity >= product.stock) {
      toast.error("Maximum stock reached");
      return;
    }

    setQuantity((prev) => prev + 1);
  };

  const decreaseQty = () => {
    if (quantity <= 1) return;

    setQuantity((prev) => prev - 1);
  };

  // Add To Cart
 // Add To Cart
const handleAddToCart = async () => {
  try {

    const res = await axios.post(
      "https://ecommerceweb-xxb1.onrender.com/api/cart",
      {
        productId: product._id,
        quantity,
      },
      {
        withCredentials: true,
      }
    );

    // SweetAlert2 Toast
    Swal.fire({
      icon: "success",
      title: "Added to Cart 🛒",
      text: res.data.message || "Product added to cart",
      position: "bottom-end",
      showConfirmButton: false,
      timer: 1800,
      timerProgressBar: true,
      toast: true,
    });

    await fetchCart();

  } catch (error) {

    Swal.fire({
      icon: "error",
      title: "Oops!",
      text:
        error.response?.data?.message ||
        "Failed to add cart",
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      toast: true,
    });

  }
};
  // Buy Now
  const handleBuyNow = () => {
    toast.success("Buy Now feature coming soon");
  };

  // Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">Loading Product...</h1>
      </div>
    );
  }

  // Product Not Found
  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">Product Not Found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">

      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-blue-600 font-semibold mb-8"
      >
        <FaArrowLeft />
        Back
      </Link>

      {/* Product Section */}
      <div className="grid md:grid-cols-2 gap-12">

        {/* Product Image */}
        <div>
          <img
            src={`https://ecommerceweb-xxb1.onrender.com/uploads/product-images/${product.images[0]}`}
            alt={product.name}
            className="w-full h-[500px] object-fit rounded-xl shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div>

          <h1 className="text-4xl font-bold">
            {product.name}
          </h1>

          <p className="text-3xl text-blue-600 font-bold mt-5">
            ₹{product.price}
          </p>

          <div className="mt-5">
            <span
              className={`px-4 py-2 rounded-full text-white ${
                product.stock > 0
                  ? "bg-green-600"
                  : "bg-red-600"
              }`}
            >
              {product.stock > 0
                ? "In Stock"
                : "Out Of Stock"}
            </span>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold">
              Category
            </h3>

            <p className="text-gray-600 mt-2">
              {product.category?.name}
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold">
              Description
            </h3>

            <p className="text-gray-600 leading-8 mt-3">
              {product.description}
            </p>
          </div>

          {/* Quantity */}
          <div className="mt-10">

            <h3 className="text-xl font-semibold mb-4">
              Quantity
            </h3>

            <div className="flex items-center gap-5">

              <button
                onClick={decreaseQty}
                className="w-12 h-12 rounded-lg bg-gray-200 hover:bg-gray-300 text-2xl"
              >
                -
              </button>

              <span className="text-2xl font-bold">
                {quantity}
              </span>

              <button
                onClick={increaseQty}
                className="w-12 h-12 rounded-lg bg-gray-200 hover:bg-gray-300 text-2xl"
              >
                +
              </button>

            </div>

          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-5">

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 py-4 rounded-xl text-lg font-semibold transition ${
                product.stock > 0
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-400 cursor-not-allowed text-white"
              }`}
            >
              Add To Cart
            </button>

            {/* <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className={`flex-1 py-4 rounded-xl text-lg font-semibold transition ${
                product.stock > 0
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-400 cursor-not-allowed text-white"
              }`}
            >
              Buy Now
            </button> */}

          </div>

        </div>

      </div>

      {/* Related Products */}

      <div className="mt-20">

        <h2 className="text-3xl font-bold mb-8">
          Related Products
        </h2>

        {relatedProducts.length === 0 ? (

          <div className="text-center py-10">
            <h3 className="text-xl">
              No Related Products
            </h3>
          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {relatedProducts.map((item) => (

              <Link
                key={item._id}
                to={`/product/${item._id}`}
                className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
              >

                <img
                  src={`https://ecommerceweb-xxb1.onrender.com/uploads/product-images/${item.images[0]}`}
                  alt={item.name}
                  className="w-full h-56 object-cover"
                />

                <div className="p-4">

                  <h3 className="font-bold text-lg">
                    {item.name}
                  </h3>

                  <p className="text-blue-600 font-bold mt-2">
                    ₹{item.price}
                  </p>

                </div>

              </Link>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default ProductDetail;