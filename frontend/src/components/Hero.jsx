import { motion } from "framer-motion";
import { FaArrowRight, FaStar } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative overflow-hidden mt-1 bg-gradient-to-r from-blue-50 via-white to-orange-50 min-h-[90vh] flex items-center">
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full blur-[120px] opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-300 rounded-full blur-[120px] opacity-30"></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
            🔥 New Collection 2026
          </span>

          <h1 className="mt-6 text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
            Discover Your
            <span className="text-blue-600 block">
              Dream Shopping
            </span>
            Experience
          </h1>

          <p className="mt-6 text-gray-600 text-lg leading-8">
            Explore thousands of premium products with amazing discounts,
            secure payments, and lightning-fast delivery.
          </p>

          <div className="flex flex-wrap gap-5 mt-10">
            <button className="bg-blue-600 text-white px-7 py-4 rounded-full font-semibold hover:bg-blue-700 transition flex items-center gap-2 shadow-lg">
              Shop Now
              <FaArrowRight />
            </button>

            <button className="border-2 border-blue-600 text-blue-600 px-7 py-4 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition">
              Explore Collection
            </button>
          </div>

          <div className="flex items-center gap-8 mt-12">
            <div>
              <h2 className="text-3xl font-bold text-blue-600">10K+</h2>
              <p className="text-gray-500">Happy Customers</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-orange-500">500+</h2>
              <p className="text-gray-500">Premium Products</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-green-600">99%</h2>
              <p className="text-gray-500">Positive Reviews</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Main Image */}
          <motion.img
            animate={{ y: [0, -12, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4,
            }}
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700"
            alt="Shopping"
            className="rounded-3xl shadow-2xl w-full object-cover"
          />

          {/* Discount Card */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
            className="absolute top-10 -left-10 bg-white rounded-2xl shadow-xl p-5"
          >
            <h2 className="text-3xl font-bold text-red-500">
              50% OFF
            </h2>

            <p className="text-gray-600">
              Mega Sale
            </p>
          </motion.div>

          {/* Product Rating Card */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4,
            }}
            className="absolute bottom-10 -right-10 bg-white rounded-2xl shadow-xl p-5 flex items-center gap-4"
          >
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200"
              alt="shoe"
              className="w-16 h-16 rounded-xl object-cover"
            />

            <div>
              <h3 className="font-bold">
                Nike Air Max
              </h3>

              <div className="flex text-yellow-500">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p className="font-bold text-blue-600">
                ₹5,999
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;