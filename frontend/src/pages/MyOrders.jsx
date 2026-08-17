import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "https://ecommerceweb-xxb1.onrender.com/api/orders/my-orders",
        {
          withCredentials: true,
        }
      );

      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-bold">
          Loading...
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-5">

      <h1 className="text-4xl font-bold mb-10">
        My Orders
      </h1>

      {orders.length === 0 ? (

        <div className="text-center py-20">

          <h2 className="text-3xl font-bold">
            No Orders Yet
          </h2>

          <p className="text-gray-500 mt-4">
            Start shopping to place your first order.
          </p>

        </div>

      ) : (

        orders.map((order) => (

          <div
            key={order._id}
            className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden"
          >

            {/* Order Header */}

            <div className="bg-gray-100 px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

              <div>

                <p className="font-bold">
                  Order ID
                </p>

                <p className="text-gray-600 text-sm break-all">
                  {order._id}
                </p>

              </div>

              <div>

                <p className="font-bold">
                  Date
                </p>

                <p>
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>

              </div>

              <div>

                <span
                  className={`px-4 py-2 rounded-full text-white ${
                    order.orderStatus === "Pending"
                      ? "bg-yellow-500"
                      : order.orderStatus === "Confirmed"
                      ? "bg-blue-600"
                      : order.orderStatus === "Shipped"
                      ? "bg-purple-600"
                      : order.orderStatus === "Delivered"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {order.orderStatus}
                </span>

              </div>

            </div>

            {/* Products */}

            <div className="p-6">

              {order.products.map((item) => (

                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row gap-5 border-b py-5"
                >

                  <img
                    src={`https://ecommerceweb-xxb1.onrender.com/uploads/product-images/${item.product.images[0]}`}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  <div className="flex-1">

                    <h2 className="text-xl font-bold">
                      {item.product.name}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Quantity : {item.quantity}
                    </p>

                    <p className="font-bold mt-2 text-blue-600">
                      ₹{item.price}
                    </p>

                  </div>

                </div>

              ))}

              {/* Shipping Address */}

              <div className="mt-6">

                <h3 className="text-lg font-bold">
                  Shipping Address
                </h3>

                <p className="text-gray-600 mt-2">
                  {order.shippingAddress.fullName}
                </p>

                <p className="text-gray-600">
                  {order.shippingAddress.address}
                </p>

                <p className="text-gray-600">
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.state} -{" "}
                  {order.shippingAddress.pincode}
                </p>

                <p className="text-gray-600">
                  {order.shippingAddress.phone}
                </p>

              </div>

              {/* Order Summary */}

              <div className="flex justify-between items-center mt-8 flex-wrap gap-4">

                <div>

                  <p className="text-gray-500">
                    Payment Method
                  </p>

                  <p className="font-semibold">
                    {order.paymentMethod}
                  </p>

                </div>

                <h2 className="text-2xl font-bold">
                  Total : ₹{order.totalAmount}
                </h2>

              </div>

            </div>

          </div>

        ))

      )}

    </div>
  );
};

export default MyOrders;