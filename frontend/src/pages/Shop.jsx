// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import toast from "react-hot-toast";
// import { useSearchParams } from "react-router-dom";

// const Shop = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   //const [search, setSearch] = useState("");
//   const [searchParams] = useSearchParams();

// const searchFromUrl = searchParams.get("search") || "";

// const [search, setSearch] = useState(searchFromUrl);

  
//   // ==========================================
//   // FETCH ALL PRODUCTS
//   // ==========================================
// const fetchProducts = async (searchText = "") => {
//   try {
//     setLoading(true);

//     let url = "https://ecommerceweb-xxb1.onrender.com/api/products";

//     if (searchText.trim()) {
//       url = `https://ecommerceweb-xxb1.onrender.com/api/products/search?search=${encodeURIComponent(
//         searchText
//       )}`;
//     }

//     const res = await axios.get(url);

//     console.log("PRODUCT RESPONSE:", res.data);

//     setProducts(res.data.products || []);

//   } catch (error) {
//     console.log("SEARCH PRODUCTS ERROR:", error);

//     toast.error(
//       error.response?.data?.message ||
//       "Failed to load products"
//     );

//   } finally {
//     setLoading(false);
//   }
// };
//   // ==========================================
//   // USE EFFECT
//   // ==========================================

//   useEffect(() => {
//     fetchProducts();
//   }, []);


//     useEffect(() => {

//     setSearch(searchFromUrl);

//   }, [searchFromUrl]);



//   useEffect(() => {
//   const timer = setTimeout(() => {
//     fetchProducts(search);
//   }, 400);

//   return () => clearTimeout(timer);
// }, [search]);


  
//   // ==========================================
//   // LOADING
//   // ==========================================

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <h2 className="text-2xl font-semibold">
//           Loading products...
//         </h2>
//       </div>
//     );
//   }

//   // ==========================================
//   // SHOP
//   // ==========================================

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-5">

//       <div className="max-w-7xl mx-auto">

//         {/* HEADER */}






//         <div className="mb-10">

//           <h1 className="text-4xl font-bold">
//             Shop
//           </h1>

//           <p className="text-gray-500 mt-2">
//             Explore all our products
//           </p>

//         </div>

//         <div className="mb-8">




//             <input
//   type="text"
//   value={search}
//   onChange={(e) => setSearch(e.target.value)}
//   placeholder="Search products..."
//   className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
// />

  

// </div>






//         {/* NO PRODUCTS */}

//         {filteredProducts.length === 0 ? (

//           <div className="bg-white rounded-xl shadow p-12 text-center">

//             <h2 className="text-2xl font-bold">
//               No Products Available
//             </h2>

//             <p className="text-gray-500 mt-2">
//               Products will appear here soon.
//             </p>

//           </div>

//         ) : (

//           /* PRODUCT GRID */

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

//             {filteredProducts.map((product) => (

//               <div
//                 key={product._id}
//                 className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
//               >

//                 {/* IMAGE */}

//                 <Link to={`/product/${product._id}`}>

//                   <div className="h-60 bg-gray-100">

//                     {product.images?.length > 0 ? (

//                       <img
//                         src={`https://ecommerceweb-xxb1.onrender.com/uploads/product-images/${product.images[0]}`}
//                         alt={product.name}
//                         className="w-full h-full object-cover hover:scale-105 transition duration-300"
//                       />

//                     ) : (

//                       <div className="h-full flex items-center justify-center text-gray-400">
//                         No Image
//                       </div>

//                     )}

//                   </div>

//                 </Link>


//                 {/* DETAILS */}

//                 <div className="p-5">

//                   {/* CATEGORY */}

//                   <p className="text-sm text-blue-600 font-medium">
//                     {product.category?.name || "Category"}
//                   </p>


//                   {/* NAME */}

//                   <h2 className="text-xl font-bold mt-2 truncate">
//                     {product.name}
//                   </h2>


//                   {/* DESCRIPTION */}

//                   <p className="text-gray-500 text-sm mt-2 line-clamp-2">
//                     {product.description}
//                   </p>


//                   {/* PRICE */}

//                   <div className="flex justify-between items-center mt-5">

//                     <p className="text-xl font-bold text-blue-600">
//                       ₹{product.price}
//                     </p>

//                     {product.stock > 0 ? (

//                       <span className="text-sm text-green-600 font-semibold">
//                         In Stock
//                       </span>

//                     ) : (

//                       <span className="text-sm text-red-600 font-semibold">
//                         Out of Stock
//                       </span>

//                     )}

//                   </div>


//                   {/* VIEW PRODUCT */}

//                   <Link
//                     to={`/product/${product._id}`}
//                     className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg mt-5 font-semibold"
//                   >
//                     View Product
//                   </Link>

//                 </div>

//               </div>

//             ))}

//           </div>

//         )}

//       </div>

//     </div>
//   );
// };

// export default Shop;






import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();

  // ==========================================
  // GET SEARCH FROM NAVBAR URL
  // ==========================================

  const searchFromUrl = searchParams.get("search") || "";

  // ==========================================
  // FETCH ALL PRODUCTS
  // ==========================================

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://ecommerceweb-xxb1.onrender.com/api/products"
      );

      console.log("ALL PRODUCTS:", res.data);

      setProducts(res.data.products || []);

    } catch (error) {
      console.log("FETCH PRODUCTS ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load products"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // FETCH PRODUCTS ONLY ONCE
  // ==========================================

  useEffect(() => {
    fetchProducts();
  }, []);

  // ==========================================
  // UPDATE SEARCH WHEN NAVBAR SEARCH CHANGES
  // ==========================================

  useEffect(() => {
    setSearch(searchFromUrl);
  }, [searchFromUrl]);

  // ==========================================
  // FILTER PRODUCTS
  // ==========================================

  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase().trim();

    // If search is empty → show all products
    if (!searchText) {
      return true;
    }

    const productName =
      product.name?.toLowerCase() || "";

    const productDescription =
      product.description?.toLowerCase() || "";

    const categoryName =
      product.category?.name?.toLowerCase() || "";

    return (
      productName.includes(searchText) ||
      productDescription.includes(searchText) ||
      categoryName.includes(searchText)
    );
  });

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold">
          Loading products...
        </h2>
      </div>
    );
  }

  // ==========================================
  // SHOP
  // ==========================================

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">

      <div className="max-w-7xl mx-auto">

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold">
            Shop
          </h1>

          <p className="text-gray-500 mt-2">
            Explore all our products
          </p>

        </div>

        {/* =====================================
            SEARCH BOX
        ===================================== */}

        {/* <div className="mb-8">

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div> */}

        {/* =====================================
            SEARCH RESULT INFO
        ===================================== */}

        {search.trim() && (
          <div className="mb-6">

            {/* <p className="text-gray-600">

              Search results for:

              <span className="font-bold text-gray-900 ml-2">
                "{search}"
              </span>

            </p>

            <p className="text-sm text-gray-500 mt-1">
              {filteredProducts.length} product(s) found
            </p> */}

          </div>
        )}

        {/* =====================================
            NO PRODUCTS
        ===================================== */}

        {filteredProducts.length === 0 ? (

          <div className="bg-white rounded-xl shadow p-12 text-center">

            <h2 className="text-2xl font-bold">
              No Products Found
            </h2>

            <p className="text-gray-500 mt-2">
              We couldn't find any product matching
              "{search}".
            </p>

          </div>

        ) : (

          /* =====================================
             PRODUCT GRID
          ===================================== */

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {filteredProducts.map((product) => (

              <div
                key={product._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
              >

                {/* =================================
                    IMAGE
                ================================= */}

                <Link to={`/product/${product._id}`}>

                  <div className="h-60 bg-gray-100">

                    {product.images?.length > 0 ? (

                      <img
                        src={`https://ecommerceweb-xxb1.onrender.com/uploads/product-images/${product.images[0]}`}
                        alt={product.name}
                        className="w-full h-full object-fit hover:scale-105 transition duration-300"
                      />

                    ) : (

                      <div className="h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>

                    )}

                  </div>

                </Link>

                {/* =================================
                    DETAILS
                ================================= */}

                <div className="p-5">

                  {/* CATEGORY */}

                  <p className="text-sm text-blue-600 font-medium">
                    {product.category?.name || "Category"}
                  </p>

                  {/* NAME */}

                  <h2 className="text-xl font-bold mt-2 truncate">
                    {product.name}
                  </h2>

                  {/* DESCRIPTION */}

                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  {/* PRICE */}

                  <div className="flex justify-between items-center mt-5">

                    <p className="text-xl font-bold text-blue-600">
                      ₹{product.price}
                    </p>

                    {product.stock > 0 ? (

                      <span className="text-sm text-green-600 font-semibold">
                        In Stock
                      </span>

                    ) : (

                      <span className="text-sm text-red-600 font-semibold">
                        Out of Stock
                      </span>

                    )}

                  </div>

                  {/* VIEW PRODUCT */}

                  <Link
                    to={`/product/${product._id}`}
                    className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg mt-5 font-semibold"
                  >
                    View Product
                  </Link>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default Shop;