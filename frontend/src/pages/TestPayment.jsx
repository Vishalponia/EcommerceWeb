import axios from "axios";
import toast from "react-hot-toast";

const TestPayment = () => {

  const createOrder = async () => {

    try {

      // ==========================================
      // STEP 1: CREATE RAZORPAY ORDER
      // ==========================================

      const res = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        {
          amount: 500,
        }
      );


      console.log("RAZORPAY ORDER:", res.data);


      if (!res.data.success) {

        toast.error("Failed to create payment order");

        return;

      }


      const order = res.data.order;


      // ==========================================
      // STEP 2: RAZORPAY CHECKOUT OPTIONS
      // ==========================================

      const options = {

        key: "rzp_test_TPbmTqUSzoMS9Y",

        amount: order.amount,

        currency: order.currency,

        name: "Your Ecommerce Store",

        description: "Test Payment",

        order_id: order.id,


        // ==========================================
        // PAYMENT SUCCESS
        // ==========================================

        handler: function (response) {

          console.log(
            "PAYMENT SUCCESS:",
            response
          );


          toast.success(
            "Payment successful!"
          );

        },


        // ==========================================
        // PREFILL
        // ==========================================

        prefill: {

          name: "Test User",

          email: "test@example.com",

          contact: "9999999999",

        },


        // ==========================================
        // THEME
        // ==========================================

        theme: {

          color: "#2563eb",

        },

      };


      // ==========================================
      // STEP 3: OPEN RAZORPAY
      // ==========================================

      const razorpay =
        new window.Razorpay(options);


      razorpay.open();


    } catch (error) {

      console.log(
        "PAYMENT ERROR:",
        error.response?.data ||
        error.message
      );


      toast.error(
        error.response?.data?.message ||
        "Payment failed"
      );

    }

  };


  return (

    <div className="min-h-screen flex items-center justify-center">

      <button
        onClick={createOrder}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold"
      >
        Pay ₹500
      </button>

    </div>

  );

};


export default TestPayment;