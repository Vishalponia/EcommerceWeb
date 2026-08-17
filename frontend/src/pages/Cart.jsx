// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const Cart = () => {
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { fetchCart } = useCart();


//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const fetchCart = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/cart",
//         {
//           withCredentials: true,
//         }
//       );

//       setCart(res.data.cart);
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to load cart");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const increaseQuantity = async (item) => {

//   try {

//     await axios.put(

//       `http://localhost:5000/api/cart/${item._id}`,

//       {
//         quantity: item.quantity + 1,
//       },

//       {
//         withCredentials: true,
//       }

//     );

//     fetchCart();

//   } catch (error) {

//     toast.error(error.response?.data?.message);

//   }

// };

// const decreaseQuantity = async (item) => {

//   if (item.quantity === 1) return;

//   try {

//     await axios.put(

//       `http://localhost:5000/api/cart/${item._id}`,

//       {
//         quantity: item.quantity - 1,
//       },

//       {
//         withCredentials: true,
//       }

//     );

//     fetchCart();

//   } catch (error) {

//     toast.error(error.response?.data?.message);

//   }

// };

// const removeItem = async (id) => {

//   try {

//     await axios.delete(

//       `http://localhost:5000/api/cart/${id}`,

//       {
//         withCredentials: true,
//       }

//     );

//     toast.success("Removed");

//     fetchCart();

//   } catch (error) {

//     toast.error(error.response?.data?.message);

//   }

// };

//   // Loading State
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <h2 className="text-2xl font-bold">Loading Cart...</h2>
//       </div>
//     );
//   }

//   // Total Price
//   const total = cart.reduce((sum, item) => {
//     return sum + item.product.price * item.quantity;
//   }, 0);

//   return (
//     <div className="max-w-7xl mx-auto py-10 px-5">

//       <h1 className="text-4xl font-bold mb-10">
//         My Cart
//       </h1>

//       {cart.length === 0 ? (

//         <div className="text-center py-20">
//           <h2 className="text-3xl font-bold">
//             Your Cart is Empty
//           </h2>

//           <p className="text-gray-500 mt-3">
//             Add some products to continue shopping.
//           </p>
//         </div>

//       ) : (

//         <div className="grid lg:grid-cols-3 gap-8">

//           {/* Cart Items */}
//           <div className="lg:col-span-2 space-y-6">

//             {cart.map((item) => (

//               <div
//                 key={item._id}
//                 className="bg-white shadow rounded-xl p-5 flex flex-col sm:flex-row gap-5"
//               >

//                 <img
//                   src={`http://localhost:5000/uploads/product-images/${item.product.images[0]}`}
//                   alt={item.product.name}
//                   className="w-full sm:w-36 h-36 rounded-lg object-cover"
//                 />

//                 <div className="flex-1">

//                   <h2 className="text-2xl font-bold">
//                     {item.product.name}
//                   </h2>

//                   <p className="text-gray-500 mt-2">
//                     {item.product.category?.name}
//                   </p>

//                   <p className="text-blue-600 text-2xl font-bold mt-3">
//                     ₹{item.product.price}
//                   </p>

//                   <div className="flex items-center gap-3 mt-4">

//   <button
//     onClick={() => decreaseQuantity(item)}
//     className="w-9 h-9 bg-gray-200 rounded"
//   >
//     -
//   </button>

//   <span className="font-bold">

//     {item.quantity}

//   </span>

//   <button
//     onClick={() => increaseQuantity(item)}
//     className="w-9 h-9 bg-gray-200 rounded"
//   >
//     +
//   </button>

// </div>

//                   <p className="mt-2 font-semibold">
//                     Subtotal :
//                     <span className="text-green-600 ml-2">
//                       ₹{item.product.price * item.quantity}
//                     </span>
//                   </p>

//                 </div>

//               </div>

//             ))}

//           </div>

//           {/* Order Summary */}
//           <div className="bg-white shadow rounded-xl p-6 h-fit sticky top-24">

//             <h2 className="text-2xl font-bold mb-6">
//               Order Summary
//             </h2>

//             <div className="flex justify-between mb-4">
//               <span>Total Products</span>
//               <span>{cart.length}</span>
//             </div>

//             <div className="flex justify-between mb-4">
//               <span>Total Quantity</span>
//               <span>
//                 {cart.reduce((sum, item) => sum + item.quantity, 0)}
//               </span>
//             </div>

//             <div className="flex justify-between mb-4">
//               <span>Shipping</span>
//               <span className="text-green-600">
//                 Free
//               </span>
//             </div>

//             <hr className="my-4" />

//             <div className="flex justify-between text-xl font-bold">
//               <span>Total</span>
//               <span className="text-blue-600">
//                 ₹{total}
//               </span>
//             </div>

//             <button
//               className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg mt-8"
//             >
//               Proceed To Checkout
//             </button>

//           </div>

//         </div>

//       )}

//     </div>
//   );
// };

// export default Cart;















import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext"; // apna path sahi rakhna
import { Link } from "react-router-dom";

const Cart = () => {

  const {
    cart,
    fetchCart,
    loading,
  } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  const increaseQuantity = async (item) => {
    try {

      await axios.put(
        `http://localhost:5000/api/cart/${item._id}`,
        {
          quantity: item.quantity + 1,
        },
        {
          withCredentials: true,
        }
      );

      fetchCart();

    } catch (error) {

      toast.error(error.response?.data?.message);

    }
  };

  const decreaseQuantity = async (item) => {

    if (item.quantity === 1) return;

    try {

      await axios.put(
        `http://localhost:5000/api/cart/${item._id}`,
        {
          quantity: item.quantity - 1,
        },
        {
          withCredentials: true,
        }
      );

      fetchCart();

    } catch (error) {

      toast.error(error.response?.data?.message);

    }
  };

  const removeItem = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/cart/${id}`,
        {
          withCredentials: true,
        }
      );

      toast.success("Item removed");

      fetchCart();

    } catch (error) {

      toast.error(error.response?.data?.message);

    }

  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-bold">
          Loading Cart...
        </h2>
      </div>
    );
  }

  const total = cart.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  return (
    <div className="max-w-7xl mx-auto py-10 px-5">

      <h1 className="text-4xl font-bold mb-10">
        My Cart
      </h1>

      {cart.length === 0 ? (

        <div className="text-center py-20">

          <h2 className="text-3xl font-bold">
            Your Cart is Empty
          </h2>

        </div>

      ) : (

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Side */}
          <div className="lg:col-span-2 space-y-6">

            {cart.map((item) => (

              <div
                key={item._id}
                className="bg-white rounded-xl shadow p-5 flex flex-col sm:flex-row gap-5"
              >

                <img
                  src={`http://localhost:5000/uploads/product-images/${item.product.images[0]}`}
                  alt={item.product.name}
                  className="w-full sm:w-36 h-36 object-cover rounded-lg"
                />

                <div className="flex-1">

                  <h2 className="text-2xl font-bold">
                    {item.product.name}
                  </h2>

                  <p className="text-blue-600 text-xl font-bold mt-2">
                    ₹{item.product.price}
                  </p>

                  {/* Quantity */}

                  <div className="flex items-center gap-3 mt-5">

                    <button
                      onClick={() => decreaseQuantity(item)}
                      className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                      -
                    </button>

                    <span className="font-bold text-lg">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item)}
                      className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                      +
                    </button>

                  </div>

                  <p className="mt-5 font-semibold">
                    Subtotal :
                    <span className="text-green-600 ml-2">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </p>

                  <button
                    onClick={() => removeItem(item._id)}
                    className="mt-5 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

          {/* Right Side */}

          <div className="bg-white rounded-xl shadow p-6 h-fit">

            <h2 className="text-2xl font-bold">
              Order Summary
            </h2>

            <div className="flex justify-between mt-6">
              <span>Total Products</span>
              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between mt-4">
              <span>Total Quantity</span>
              <span>
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>

            <div className="flex justify-between mt-4">
              <span>Shipping</span>
              <span className="text-green-600">
                Free
              </span>
            </div>

            <hr className="my-5" />

            <div className="flex justify-between text-xl font-bold">

              <span>Total</span>

              <span className="text-blue-600">
                ₹{total}
              </span>

            </div>

            <Link
                 to="/checkout"
                className="w-full block text-center bg-blue-600 text-white py-4 rounded-xl">
                  Proceed To Checkout
            </Link>

          </div>

        </div>

      )}

    </div>
  );
};

export default Cart;