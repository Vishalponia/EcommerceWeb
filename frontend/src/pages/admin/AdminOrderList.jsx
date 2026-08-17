import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "https://ecommerceweb-xxb1.onrender.com/api/orders",
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

  const updateOrderStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `https://ecommerceweb-xxb1.onrender.com/api/orders/${id}`,
        {
          orderStatus: status,
        },
        {
          withCredentials: true,
        }
      );

      toast.success(res.data.message);

      fetchOrders();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update order"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-bold">
          Loading Orders...
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-8">
        Manage Orders
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <h2 className="text-2xl font-semibold">
            No Orders Found
          </h2>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="text-left p-4">
                  Customer
                </th>

                <th className="text-left p-4">
                  Products
                </th>

                <th className="text-center p-4">
                  Total
                </th>

                <th className="text-center p-4">
                  Status
                </th>

                <th className="text-center p-4">
                  Update
                </th>

              </tr>

            </thead>

            <tbody>
                              {orders.map((order) => (

                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50"
                >

                  {/* Customer */}

                  <td className="p-4 align-top">

                    <h3 className="font-bold">
                      {order.user?.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {order.user?.email}
                    </p>

                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>

                  </td>

                  {/* Products */}

                  <td className="p-4">

                    <div className="space-y-4">

                      {order.products.map((item) => (

                        <div
                          key={item._id}
                          className="flex items-center gap-3"
                        >

                          <img
                            src={`https://ecommerceweb-xxb1.onrender.com/uploads/product-images/${item.product.images[0]}`}
                            alt={item.product.name}
                            className="w-14 h-14 rounded-lg object-cover"
                          />

                          <div>

                            <h4 className="font-semibold">
                              {item.product.name}
                            </h4>

                            <p className="text-sm text-gray-500">
                              Qty : {item.quantity}
                            </p>

                            <p className="text-blue-600 font-semibold">
                              ₹{item.price}
                            </p>

                          </div>

                        </div>

                      ))}

                    </div>

                  </td>

                  {/* Total */}

                  <td className="text-center p-4 font-bold text-lg text-green-600">

                    ₹{order.totalAmount}

                  </td>

                  {/* Current Status */}

                  <td className="text-center p-4">

                    <span
                      className={`px-3 py-2 rounded-full text-white text-sm
                      ${
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

                  </td>

                  {/* Update Status */}

                  <td className="text-center p-4">

                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        updateOrderStatus(
                          order._id,
                          e.target.value
                        )
                      }
                      className="border rounded-lg px-3 py-2 outline-none"
                    >

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Confirmed">
                        Confirmed
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>

                    </select>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
};

export default AdminOrderList;
            