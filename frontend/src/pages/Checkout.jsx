import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Checkout = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "COD",
  });

  useEffect(() => {
    fetchCart();
    fetchAddress();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        "https://ecommerceweb-xxb1.onrender.com/api/cart",
        {
          withCredentials: true,
        }
      );

      setCart(res.data.cart);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData({
    ...formData,
    [name]: value,
  });

  setErrors({
    ...errors,
    [name]: "",
  });
};

  

 const placeOrder = async () => {

  if (!validateAddress()) {
    return;
  }

  const result = await Swal.fire({
    title: "Place Order?",
    text: "Do you want to place this order with Cash on Delivery?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, Place Order",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#dc2626",
  });

  // User clicked Cancel
  if (!result.isConfirmed) {
    return;
  }

  try {

    const res = await axios.post(
      "https://ecommerceweb-xxb1.onrender.com/api/orders",
      {
        ...formData,
        paymentMethod: "COD",
      },
      {
        withCredentials: true,
      }
    );

    await Swal.fire({
      title: "Order Placed! 🎉",
      text: "Your order has been placed successfully.",
      icon: "success",
      confirmButtonText: "View My Orders",
      confirmButtonColor: "#2563eb",
    });

    navigate("/my-orders");

  } catch (error) {

    console.log(error);

    Swal.fire({
      title: "Order Failed",
      text:
        error.response?.data?.message ||
        "Failed to place order",
      icon: "error",
      confirmButtonColor: "#dc2626",
    });

  }
};



const fetchAddress = async () => {

    try {

        const res = await axios.get(

            "https://ecommerceweb-xxb1.onrender.com/api/users/address",

            {

                withCredentials: true,

            }

        );

        if (res.data.address) {

            setFormData({

                ...formData,

                ...res.data.address,

                paymentMethod: "COD",

            });

        }

    } catch (error) {

        console.log(error);

    }

};


const validateAddress = () => {
  const newErrors = {};

  if (!formData.fullName.trim()) {
    newErrors.fullName = "Please enter your name";
  }

  if (!formData.phone.trim()) {
    newErrors.phone = "Please enter your phone number";
  } else if (!/^[0-9]{10}$/.test(formData.phone)) {
    newErrors.phone = "Please enter a valid 10-digit phone number";
  }

  if (!formData.address.trim()) {
    newErrors.address = "Please enter your address";
  }

  if (!formData.city.trim()) {
    newErrors.city = "Please enter your city";
  }

  if (!formData.state.trim()) {
    newErrors.state = "Please enter your state";
  }

  if (!formData.pincode.trim()) {
    newErrors.pincode = "Please enter your pincode";
  } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
    newErrors.pincode = "Please enter a valid 6-digit pincode";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};


const saveAddress = async () => {

  // Validate first
  if (!validateAddress()) {
    return;
  }

  try {

    await axios.put(
      "https://ecommerceweb-xxb1.onrender.com/api/users/address",
      {
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },
      {
        withCredentials: true,
      }
    );

    toast.success("Address Saved");

  } catch (error) {

    console.log(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to save address"
    );

  }
};





const handlePayment = async () => {

    if (!validateAddress()) {
    return;
  }

  try {
    // Create Razorpay order using actual cart total
    const res = await axios.post(
      "https://ecommerceweb-xxb1.onrender.com/api/payment/create-order",
      {
        amount: total,
      },
      {
        withCredentials: true,
      }
    );

    const order = res.data.order;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,

      amount: order.amount,
      currency: order.currency,

      name: "My E-Commerce Store",
      description: "Order Payment",

      order_id: order.id,

      handler: async function (response) {
        try {
          const verifyRes = await axios.post(
            "https://ecommerceweb-xxb1.onrender.com/api/payment/verify",
            {
              razorpay_order_id:
                response.razorpay_order_id,

              razorpay_payment_id:
                response.razorpay_payment_id,

              razorpay_signature:
                response.razorpay_signature,
            },
            {
              withCredentials: true,
            }
          );

          if (verifyRes.data.success) {
            toast.success(
              "Payment successful 🎉"
            );

            // Now create actual order
            await axios.post(
              "https://ecommerceweb-xxb1.onrender.com/api/orders",
              {
                ...formData,
                paymentMethod: "Razorpay",
              },
              {
                withCredentials: true,
              }
            );

            toast.success(
              "Order placed successfully 🎉"
            );

            navigate("/my-orders");
          }

        } catch (error) {

          console.log(
            "PAYMENT VERIFICATION ERROR:",
            error
          );

          toast.error(
            error.response?.data?.message ||
            "Payment verification failed"
          );
        }
      },

      prefill: {
        name: formData.fullName,
        contact: formData.phone,
      },

      theme: {
        color: "#2563eb",
      },
    };

    const razorpay =
      new window.Razorpay(options);

    razorpay.open();

  } catch (error) {

    console.log(
      "PAYMENT ERROR:",
      error
    );

    toast.error(
      error.response?.data?.message ||
      "Unable to start payment"
    );
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

  const total = cart.reduce(
    (sum, item) =>
      sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">

      <h1 className="text-4xl font-bold mb-10">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-3 gap-10">

        {/* Left Side */}

        <div className="lg:col-span-2 bg-white shadow rounded-xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Shipping Address
          </h2>

          <div className="mb-4">

  <input
    type="text"
    name="fullName"
    placeholder="Full Name"
    value={formData.fullName}
    onChange={handleChange}
    className={`w-full border p-3 rounded-lg outline-none ${
      errors.fullName
        ? "border-red-500"
        : "border-gray-300"
    }`}
  />

  {errors.fullName && (
    <p className="text-red-500 text-sm mt-1">
      {errors.fullName}
    </p>
  )}

</div>
          <div className="mb-4">

  <input
    type="text"
    name="phone"
    placeholder="Phone Number"
    value={formData.phone}
    onChange={handleChange}
    className={`w-full border p-3 rounded-lg outline-none ${
      errors.phone
        ? "border-red-500"
        : "border-gray-300"
    }`}
  />

  {errors.phone && (
    <p className="text-red-500 text-sm mt-1">
      {errors.phone}
    </p>
  )}

</div>

          <div className="mb-4">

  <textarea
    name="address"
    rows="3"
    placeholder="Address"
    value={formData.address}
    onChange={handleChange}
    className={`w-full border p-3 rounded-lg outline-none ${
      errors.address
        ? "border-red-500"
        : "border-gray-300"
    }`}
  />

  {errors.address && (
    <p className="text-red-500 text-sm mt-1">
      {errors.address}
    </p>
  )}

</div>
          <div className="grid md:grid-cols-3 gap-4">

  {/* CITY */}

  <div>

    <input
      type="text"
      name="city"
      placeholder="City"
      value={formData.city}
      onChange={handleChange}
      className={`w-full border p-3 rounded-lg outline-none ${
        errors.city
          ? "border-red-500"
          : "border-gray-300"
      }`}
    />

    {errors.city && (
      <p className="text-red-500 text-sm mt-1">
        {errors.city}
      </p>
    )}

  </div>


  {/* STATE */}

  <div>

    <input
      type="text"
      name="state"
      placeholder="State"
      value={formData.state}
      onChange={handleChange}
      className={`w-full border p-3 rounded-lg outline-none ${
        errors.state
          ? "border-red-500"
          : "border-gray-300"
      }`}
    />

    {errors.state && (
      <p className="text-red-500 text-sm mt-1">
        {errors.state}
      </p>
    )}

  </div>


  {/* PINCODE */}

  <div>

    <input
      type="text"
      name="pincode"
      placeholder="Pincode"
      value={formData.pincode}
      onChange={handleChange}
      className={`w-full border p-3 rounded-lg outline-none ${
        errors.pincode
          ? "border-red-500"
          : "border-gray-300"
      }`}
    />

    {errors.pincode && (
      <p className="text-red-500 text-sm mt-1">
        {errors.pincode}
      </p>
    )}

  </div>


  



</div>

        </div>

        {/* Right Side */}

        <div className="bg-white shadow rounded-xl p-6 h-fit">

          <h2 className="text-2xl font-bold">
            Order Summary
          </h2>

          {cart.map((item) => (

            <div
              key={item._id}
              className="flex justify-between mt-5"
            >

              <div>

                <p className="font-semibold">
                  {item.product.name}
                </p>

                <p className="text-sm text-gray-500">
                  Qty : {item.quantity}
                </p>

              </div>

              <p className="font-semibold">
                ₹{item.product.price * item.quantity}
              </p>

            </div>

          ))}

          <hr className="my-5" />

          <div className="flex justify-between text-xl font-bold">

            <span>Total</span>

            <span className="text-blue-600">
              ₹{total}
            </span>

          </div>

         <div className="mt-6">

  <h3 className="font-bold mb-4 text-lg">
    Payment Method
  </h3>

  {/* COD */}

  <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer mb-3 hover:bg-gray-50">

    <input
      type="radio"
      name="paymentMethod"
      value="COD"
      checked={formData.paymentMethod === "COD"}
      onChange={handleChange}
      className="w-5 h-5"
    />

    <div>
      <p className="font-semibold">
        Cash On Delivery
      </p>

      <p className="text-sm text-gray-500">
        Pay when your order arrives
      </p>
    </div>

  </label>


  {/* Razorpay */}

  <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">

    <input
      type="radio"
      name="paymentMethod"
      value="Razorpay"
      checked={
        formData.paymentMethod === "Razorpay"
      }
      onChange={handleChange}
      className="w-5 h-5"
    />

    <div>
      <p className="font-semibold">
        Razorpay / UPI / Card
      </p>

      <p className="text-sm text-gray-500">
        Pay securely using UPI, Card or Net Banking
      </p>
    </div>

  </label>

</div>
          

          {/* SAVE ADDRESS */}

<button
  onClick={saveAddress}
  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl mt-6"
>
  Save Address
</button>


{/* PAYMENT BUTTON */}

{formData.paymentMethod === "COD" ? (

  <button
    onClick={placeOrder}
    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl mt-4 font-semibold transition"
  >
    Place Order
  </button>

) : (

  <button
    onClick={handlePayment}
    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl mt-4 font-semibold transition"
  >
    Pay ₹{total}
  </button>

)}

        </div>

      </div>

    </div>
  );
};

export default Checkout;