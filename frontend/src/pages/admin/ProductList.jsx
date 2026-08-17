// import { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../../components/admin/Sidebar";

// const ProductList = () => {
//   const [products, setProducts] = useState([]);

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get(
//         "https://ecommerceweb-xxb1.onrender.com/api/products"
//       );

//       setProducts(res.data.products);

//     } catch (error) {

//       console.log(error);

//     } finally {

//       setLoading(false);

//     }
//   };

//   if (loading) {
//     return (
//       <h1 className="text-center text-3xl mt-20">
//         Loading...
//       </h1>
//     );
//   }

//   return (
//     <div className="flex">

//       <Sidebar />

//       <div className="flex-1 bg-gray-100 min-h-screen p-8">

//         <div className="bg-white rounded-xl shadow-lg p-6">

//           <h2 className="text-3xl font-bold mb-6">
//             All Products
//           </h2>

//           <table className="w-full">

//             <thead>

//               <tr className="bg-gray-200">

//                 <th className="p-3">
//                   Image
//                 </th>

//                 <th className="p-3">
//                   Product
//                 </th>

//                 <th className="p-3">
//                   Category
//                 </th>

//                 <th className="p-3">
//                   Price
//                 </th>

//                 <th className="p-3">
//                   Stock
//                 </th>

//                 <th className="p-3">
//                   Status
//                 </th>

//                 <th className="p-3">
//                   Action
//                 </th>

//               </tr>

//             </thead>

//             <tbody>

//               {products.map((product) => (

//                 <tr
//                   key={product._id}
//                   className="border-b text-center"
//                 >

//                   <td className="p-3">

//                     <img
//                       src={`https://ecommerceweb-xxb1.onrender.com/uploads/product-images/${product.images[0]}`}
//                       alt={product.name}
//                       className="w-20 h-20 object-cover rounded-lg mx-auto"
//                     />

//                   </td>

//                   <td className="font-semibold">
//                     {product.name}
//                   </td>

//                   <td>
//                     {product.category?.name}
//                   </td>

//                   <td>
//                     ₹ {product.price}
//                   </td>

//                   <td>
//                     {product.stock}
//                   </td>

//                   <td>

//                     {product.status === "Active" ? (

//                       <span className="bg-green-500 text-white px-3 py-1 rounded-full">

//                         Active

//                       </span>

//                     ) : (

//                       <span className="bg-red-500 text-white px-3 py-1 rounded-full">

//                         Inactive

//                       </span>

//                     )}

//                   </td>

//                   <td>

//                     <button
//                       className="bg-blue-600 text-white px-4 py-1  rounded-lg mr-2"
//                     >
//                       Edit
//                     </button>

//                     <button
//                       className="bg-red-600 text-white px-4 py-1  rounded-lg"
//                     >
//                       Delete
//                     </button>

//                   </td>

//                 </tr>

//               ))}

//             </tbody>

//           </table>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default ProductList;






import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://ecommerceweb-xxb1.onrender.com/api/products");
      setProducts(res.data.products || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    return products.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);




  const deleteProduct = async (id) => {
  const result = await Swal.fire({
    title: "Delete Product?",
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
      `https://ecommerceweb-xxb1.onrender.com/api/products/${id}`,
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

    fetchProducts();
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: error.response?.data?.message || "Delete failed",
      icon: "error",
    });
  }
};
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100 min-h-screen p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-gray-500">Total Products: {filtered.length}</p>
          </div>
          <Link to="/admin/add-product" className="bg-blue-600 text-white px-5 py-2 rounded-lg">
            + Add Product
          </Link>
        </div>

        <input
          className="w-full md:w-80 border rounded-lg px-4 py-2 mb-6"
          placeholder="Search product..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

        <div className="bg-white rounded-xl shadow overflow-x-auto">
          {loading ? (
            <div className="p-10 text-center">Loading...</div>
          ) : filtered.length===0 ? (
            <div className="p-10 text-center">No Products Found</div>
          ) : (
            <table className="min-w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-3">Image</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(product=>(
                  <tr key={product._id} className="border-t text-center">
                    <td className="p-3">
                      <img
                        src={`https://ecommerceweb-xxb1.onrender.com/uploads/product-images/${product.images?.[0]}`}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded mx-auto"
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.category?.name}</td>
                    <td>₹{product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                      <span className={`px-3 py-1 rounded-full text-white ${product.status==="Active"?"bg-green-600":"bg-red-600"}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="space-x-2">
                      <Link to={`/admin/edit-product/${product._id}`} className="bg-yellow-500 text-white px-3 py-2 rounded">
                                      Edit
                     </Link>
                      <button onClick={() => deleteProduct(product._id)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;