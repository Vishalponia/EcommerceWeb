import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const SellerProductList = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  // ==========================================
  // FETCH SELLER PRODUCTS
  // ==========================================

  const fetchProducts = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        "https://ecommerceweb-xxb1.onrender.com/api/seller/products",
        {
          withCredentials: true,
        }
      );
      console.log("SELLER API RESPONSE:", res.data);

      setProducts(res.data.products || []);

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to load products"
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
// DELETE PRODUCT
// ==========================================

const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });

  // User clicked Cancel
  if (!result.isConfirmed) {
    return;
  }

  try {
    const res = await axios.delete(
      `https://ecommerceweb-xxb1.onrender.com/api/seller/products/${id}`,
      {
        withCredentials: true,
      }
    );

    // Remove product from UI
    setProducts((prevProducts) =>
      prevProducts.filter(
        (product) => product._id !== id
      )
    );

    // Success alert
    Swal.fire({
      title: "Deleted!",
      text: res.data.message || "Product deleted successfully.",
      icon: "success",
      confirmButtonColor: "#3085d6",
    });

  } catch (error) {
    console.log("DELETE PRODUCT ERROR:", error);

    Swal.fire({
      title: "Error!",
      text:
        error.response?.data?.message ||
        "Failed to delete product.",
      icon: "error",
      confirmButtonColor: "#d33",
    });
  }
};

  useEffect(() => {

    fetchProducts();

  }, []);


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="text-center py-20">

        <p className="text-xl font-semibold">
          Loading products...
        </p>

      </div>

    );

  }


  return (

    <div className="min-h-screen bg-gray-100 py-10 px-5">

      <div className="max-w-7xl mx-auto">


        {/* HEADER */}

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-3xl font-bold">
              My Products
            </h1>

            <p className="text-gray-500 mt-1">
              Manage your products
            </p>

          </div>


          <Link
            to="/seller/add-product"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold"
          >
            + Add Product
          </Link>

        </div>


        {/* NO PRODUCTS */}

        {products.length === 0 ? (

          <div className="bg-white rounded-xl shadow p-12 text-center">

            <h2 className="text-2xl font-bold">
              No Products Yet
            </h2>

            <p className="text-gray-500 mt-2">
              Start adding products to your store.
            </p>

            <Link
              to="/seller/add-product"
              className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              Add Your First Product
            </Link>

          </div>

        ) : (

          /* PRODUCT GRID */

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {products.map((product) => (

              <div
                key={product._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
              >


                {/* IMAGE */}

                <div className="h-56 bg-gray-100">

                  {product.images?.length > 0 ? (

                    <img
                      src={`https://ecommerceweb-xxb1.onrender.com/uploads/product-images/${product.images[0]}`}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />

                  ) : (

                    <div className="h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>

                  )}

                </div>


                {/* DETAILS */}

                <div className="p-5">

                  <h2 className="text-xl font-bold truncate">
                    {product.name}
                  </h2>


                  {/* CATEGORY */}

                  <p className="text-sm text-gray-500 mt-2">

                    Category:{" "}

                    <span className="font-semibold text-gray-700">

                      {product.category?.name ||
                        "Unknown"}

                    </span>

                  </p>


                  {/* PRICE */}

                  <p className="text-xl font-bold text-blue-600 mt-3">

                    ₹{product.price}

                  </p>


                  {/* STOCK */}

<div className="mt-3">

  <span className="text-gray-500">
    Stock:
  </span>

  <span
    className={`ml-2 font-semibold ${
      product.stock > 0
        ? "text-green-600"
        : "text-red-600"
    }`}
  >
    {product.stock > 0
      ? `${product.stock} Available`
      : "Out of Stock"}
  </span>

</div>


                  {/* DESCRIPTION */}

                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">

                    {product.description}

                  </p>


                  {/* BUTTONS */}

                  <div className="flex gap-3 mt-5">

                    <Link
                      to={`/seller/edit-product/${product._id}`}
                      className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                    >
                      Edit
                    </Link>

                    <button
  type="button"
  onClick={() => handleDelete(product._id)}
  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
>
  Delete
</button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

};

export default SellerProductList;