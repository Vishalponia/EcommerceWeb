// import { motion } from "framer-motion";
// import { FaArrowRight, FaStar } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const Hero = () => {
//   return (
//     <section className="relative overflow-hidden mt-1 bg-gradient-to-r from-blue-50 via-white to-orange-50 min-h-[90vh] flex items-center">
//       {/* Background Blur */}
//       <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full blur-[120px] opacity-30"></div>
//       <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-300 rounded-full blur-[120px] opacity-30"></div>

//       <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

//         {/* LEFT CONTENT */}
//         <motion.div
//           initial={{ opacity: 0, x: -80 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
//             🔥 New Collection 2026
//           </span>

//           <h1 className="mt-6 text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
//             Discover Your
//             <span className="text-blue-600 block">
//               Dream Shopping
//             </span>
//             Experience
//           </h1>

//           <p className="mt-6 text-gray-600 text-lg leading-8">
//             Explore thousands of premium products with amazing discounts,
//             secure payments, and lightning-fast delivery.
//           </p>

//           <div className="flex flex-wrap gap-5 mt-10">
//             <Link 
//             to="/shop"
//             className="bg-blue-600 text-white px-7 py-4 rounded-full font-semibold hover:bg-blue-700 transition flex items-center gap-2 shadow-lg">
//               Shop Now
//               <FaArrowRight />
//             </Link>

//             <button className="border-2 border-blue-600 text-blue-600 px-7 py-4 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition">
//               Explore Collection
//             </button>
//           </div>

//           <div className="flex items-center gap-8 mt-12">
//             <div>
//               <h2 className="text-3xl font-bold text-blue-600">10K+</h2>
//               <p className="text-gray-500">Happy Customers</p>
//             </div>

//             <div>
//               <h2 className="text-3xl font-bold text-orange-500">500+</h2>
//               <p className="text-gray-500">Premium Products</p>
//             </div>

//             <div>
//               <h2 className="text-3xl font-bold text-green-600">99%</h2>
//               <p className="text-gray-500">Positive Reviews</p>
//             </div>
//           </div>
//         </motion.div>

//         {/* RIGHT CONTENT */}
//         <motion.div
//           initial={{ opacity: 0, x: 80 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           className="relative"
//         >
//           {/* Main Image */}
//           <motion.img
//             animate={{ y: [0, -12, 0] }}
//             transition={{
//               repeat: Infinity,
//               duration: 4,
//             }}
//             src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700"
//             alt="Shopping"
//             className="rounded-3xl shadow-2xl w-full object-cover"
//           />

//           {/* Discount Card */}
//           <motion.div
//             animate={{ y: [0, -10, 0] }}
//             transition={{
//               repeat: Infinity,
//               duration: 3,
//             }}
//             className="absolute top-10 -left-10 bg-white rounded-2xl shadow-xl p-5"
//           >
//             <h2 className="text-3xl font-bold text-red-500">
//               50% OFF
//             </h2>

//             <p className="text-gray-600">
//               Mega Sale
//             </p>
//           </motion.div>

//           {/* Product Rating Card */}
//           <motion.div
//             animate={{ y: [0, 10, 0] }}
//             transition={{
//               repeat: Infinity,
//               duration: 4,
//             }}
//             className="absolute bottom-10 -right-10 bg-white rounded-2xl shadow-xl p-5 flex items-center gap-4"
//           >
//             <img
//               src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200"
//               alt="shoe"
//               className="w-16 h-16 rounded-xl object-cover"
//             />

//             <div>
//               <h3 className="font-bold">
//                 Nike Air Max
//               </h3>

//               <div className="flex text-yellow-500">
//                 <FaStar />
//                 <FaStar />
//                 <FaStar />
//                 <FaStar />
//                 <FaStar />
//               </div>

//               <p className="font-bold text-blue-600">
//                 ₹5,999
//               </p>
//             </div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Hero;



import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Headphones,
  Shirt,
  Sofa,
  Dumbbell,
  Smartphone,
  Watch,
  Camera,
  ShoppingBag,
  Sparkles,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headset,
} from "lucide-react";

const slides = [
  {
    id: 1,
    category: "ELECTRONICS",
    title: "Upgrade Your",
    highlight: "Everyday",
    description:
      "Discover the latest technology and smart gadgets that make life simpler, smarter and better.",
    number: "01",
    color: "from-blue-500 to-cyan-400",
    icon: Headphones,
  },
  {
    id: 2,
    category: "FASHION",
    title: "Define Your",
    highlight: "Style",
    description:
      "Find pieces that match your personality and create a style that feels uniquely yours.",
    number: "02",
    color: "from-purple-500 to-pink-400",
    icon: Shirt,
  },
  {
    id: 3,
    category: "HOME & LIVING",
    title: "Make Your",
    highlight: "Space Better",
    description:
      "Beautiful and practical products designed to make your everyday space feel even better.",
    number: "03",
    color: "from-emerald-500 to-teal-400",
    icon: Sofa,
  },
  {
    id: 4,
    category: "SPORTS",
    title: "Move. Perform.",
    highlight: "Repeat.",
    description:
      "Gear up with everything you need to stay active, perform better and keep moving.",
    number: "04",
    color: "from-orange-500 to-yellow-400",
    icon: Dumbbell,
  },
];

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const current = slides[activeSlide];

  // ==========================================
  // CHANGE SLIDE
  // ==========================================

  const changeSlide = (direction) => {
    if (isAnimating) return;

    setIsAnimating(true);

    setTimeout(() => {
      setActiveSlide((prev) => {
        if (direction === "next") {
          return (prev + 1) % slides.length;
        }

        return (prev - 1 + slides.length) % slides.length;
      });

      setIsAnimating(false);
    }, 250);
  };

  // ==========================================
  // AUTO SLIDE
  // ==========================================

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide("next");
    }, 6000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <section className="relative overflow-hidden  text-white bg-[#030712] pt-4 md:pt-8 lg:pt-12">
      {/* ==========================================
          BACKGROUND GLOW
      ========================================== */}

      <div className="absolute inset-0 overflow-hidden ">

        <div
          className={`absolute w-[500px] h-[500px] rounded-full blur-[140px] opacity-20 bg-gradient-to-r ${current.color} -top-40 -left-40 transition-all duration-1000`}
        />

        <div
          className={`absolute w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 bg-gradient-to-r ${current.color} bottom-[-250px] right-[-150px] transition-all duration-1000`}
        />

      </div>


      {/* ==========================================
          BACKGROUND GRID
      ========================================== */}

      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />


      {/* ==========================================
          MAIN CONTAINER
      ========================================== */}

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        <div className="min-h-[440px] lg:min-h-[480px] grid lg:grid-cols-2 gap-10 items-center py-8 md:py-10">

          {/* =====================================================
              LEFT SIDE
          ===================================================== */}

          <div
            key={current.id}
            className={`max-w-xl transition-all duration-500 ${
              isAnimating
                ? "opacity-0 translate-x-[-30px]"
                : "opacity-100 translate-x-0"
            }`}
          >

            {/* Welcome Badge */}

            <div className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.05] backdrop-blur-md rounded-full px-4 py-2 mb-7">

              <Sparkles
                size={15}
                className="text-purple-400"
              />

              <span className="text-sm text-gray-300">
                Welcome to our store
              </span>

            </div>


            {/* Main Heading */}

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight">

              Discover.

              <br />

              <span
                className={`text-transparent bg-clip-text bg-gradient-to-r ${current.color}`}
              >
                Shop.
              </span>

              <br />

              Love It.

            </h1>


            {/* Description */}

            <p className="mt-7 text-gray-400 text-base sm:text-lg leading-relaxed max-w-lg">

              {current.description}

            </p>


            {/* Buttons */}

            <div className="flex flex-wrap gap-4 mt-8">

              <Link
                to="/shop"
                className={`group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl font-semibold bg-gradient-to-r ${current.color} shadow-lg hover:scale-105 transition-all duration-300`}
              >

                Shop Now

                <span className="bg-white/20 rounded-full p-1 group-hover:rotate-45 transition-transform duration-300">

                  <ArrowUpRight size={17} />

                </span>

              </Link>


              <Link
                to="/categories"
                className="px-6 py-3.5 rounded-xl border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] transition-all duration-300 font-semibold"
              >
                Explore Categories
              </Link>

            </div>


            {/* ==========================================
                SLIDE INFO
            ========================================== */}

            <div className="flex items-center gap-6 mt-12">

              <span
                className={`text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r ${current.color}`}
              >
                {current.number}
              </span>

              <div className="h-10 w-px bg-white/20" />

              <div>

                <p className="text-xs tracking-[0.25em] text-gray-500">
                  CATEGORY
                </p>

                <p className="font-bold mt-1">
                  {current.category}
                </p>

              </div>

            </div>

          </div>


          {/* =====================================================
              RIGHT SIDE - ANIMATED SCENE
          ===================================================== */}

          <div className="relative h-[500px] sm:h-[560px] flex items-center justify-center">


            {/* Outer Orbit */}

            <div
              className={`absolute w-[360px] h-[360px] sm:w-[470px] sm:h-[470px] rounded-full border border-white/10 transition-all duration-700`}
            />

            <div
              className={`absolute w-[280px] h-[280px] sm:w-[390px] sm:h-[390px] rounded-full border border-dashed border-white/10 animate-[spin_25s_linear_infinite]`}
            />


            {/* Orbit dots */}

            <div
              className={`absolute w-4 h-4 rounded-full bg-gradient-to-r ${current.color} shadow-lg animate-[spin_8s_linear_infinite]`}
              style={{
                transformOrigin: "0 220px",
              }}
            />


            {/* ==========================================
                MAIN PLATFORM
            ========================================== */}

            <div className="absolute bottom-[45px] w-[280px] sm:w-[390px] h-[70px]">

              <div
                className={`absolute inset-0 rounded-[50%] bg-gradient-to-r ${current.color} opacity-30 blur-2xl`}
              />

              <div
                className={`relative w-full h-full rounded-[50%] border border-white/20 bg-gradient-to-b from-white/10 to-white/[0.02] backdrop-blur-md shadow-2xl`}
              >

                <div
                  className={`absolute inset-3 rounded-[50%] border border-white/10 bg-gradient-to-r ${current.color} opacity-20`}
                />

              </div>

            </div>


            {/* =====================================================
                ELECTRONICS
            ===================================================== */}

            {current.id === 1 && (
              <div className="relative w-full h-full animate-[fadeIn_0.6s_ease]">

                {/* Phone */}

                <div className="absolute top-[70px] left-1/2 -translate-x-1/2 rotate-[10deg] animate-[float_4s_ease-in-out_infinite]">

                  <div className="w-[125px] h-[245px] sm:w-[150px] sm:h-[290px] rounded-[28px] border-[5px] border-slate-700 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 shadow-[0_0_60px_rgba(59,130,246,0.35)]">

                    <div className="absolute inset-[6px] rounded-[22px] bg-gradient-to-br from-blue-400/80 via-purple-600 to-slate-950">

                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-4 bg-black rounded-full" />

                      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/30 rounded-full" />

                    </div>

                  </div>

                </div>


                {/* Headphones */}

                <div className="absolute top-[50px] left-[8%] sm:left-[5%] rotate-[-15deg] animate-[float_5s_ease-in-out_infinite]">

                  <div className="relative w-36 h-36">

                    <Headphones
                      size={140}
                      strokeWidth={1}
                      className="text-blue-400 drop-shadow-[0_0_25px_rgba(59,130,246,.5)]"
                    />

                  </div>

                </div>


                {/* Watch */}

                <div className="absolute bottom-[105px] left-[12%] sm:left-[18%] rotate-[-12deg] animate-[float_3.5s_ease-in-out_infinite]">

                  <div className="bg-slate-900 border border-blue-400/40 rounded-2xl p-4 shadow-[0_0_35px_rgba(59,130,246,.25)]">

                    <Watch
                      size={65}
                      strokeWidth={1.2}
                      className="text-cyan-300"
                    />

                  </div>

                </div>


                {/* Camera */}

                <div className="absolute bottom-[120px] right-[5%] rotate-[12deg] animate-[float_4.5s_ease-in-out_infinite]">

                  <div className="bg-slate-900 border border-purple-400/30 rounded-2xl p-4 shadow-xl">

                    <Camera
                      size={65}
                      strokeWidth={1.2}
                      className="text-purple-300"
                    />

                  </div>

                </div>

              </div>
            )}


            {/* =====================================================
                FASHION
            ===================================================== */}

            {current.id === 2 && (
              <div className="relative w-full h-full animate-[fadeIn_0.6s_ease]">

                <div className="absolute top-[90px] left-1/2 -translate-x-1/2 animate-[float_4s_ease-in-out_infinite]">

                  <div className="relative w-[190px] h-[240px]">

                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-purple-300 to-pink-500 shadow-xl" />

                    <div className="absolute top-14 left-1/2 -translate-x-1/2">

                      <Shirt
                        size={220}
                        strokeWidth={0.8}
                        className="text-purple-400 drop-shadow-[0_0_40px_rgba(168,85,247,.5)]"
                      />

                    </div>

                  </div>

                </div>


                {/* Floating circles */}

                <div className="absolute top-20 left-[12%] w-16 h-16 rounded-full border border-purple-400/30 animate-[float_3s_ease-in-out_infinite]" />

                <div className="absolute bottom-36 right-[10%] w-10 h-10 rounded-full bg-pink-400/20 animate-pulse" />

              </div>
            )}


            {/* =====================================================
                HOME
            ===================================================== */}

            {current.id === 3 && (
              <div className="relative w-full h-full animate-[fadeIn_0.6s_ease]">

                <div className="absolute top-[130px] left-1/2 -translate-x-1/2 animate-[float_4s_ease-in-out_infinite]">

                  <div className="bg-emerald-950/60 border border-emerald-400/20 rounded-3xl p-10 shadow-[0_0_60px_rgba(16,185,129,.25)]">

                    <Sofa
                      size={220}
                      strokeWidth={0.7}
                      className="text-emerald-400"
                    />

                  </div>

                </div>


                <div className="absolute top-24 left-[10%] text-emerald-300 animate-pulse">
                  ✦
                </div>

                <div className="absolute bottom-36 right-[12%] text-teal-300 animate-bounce">
                  ✦
                </div>

              </div>
            )}


            {/* =====================================================
                SPORTS
            ===================================================== */}

            {current.id === 4 && (
              <div className="relative w-full h-full animate-[fadeIn_0.6s_ease]">

                <div className="absolute top-[100px] left-1/2 -translate-x-1/2 animate-[float_3s_ease-in-out_infinite]">

                  <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-orange-500/30 to-yellow-400/10 border border-orange-400/30 flex items-center justify-center shadow-[0_0_80px_rgba(249,115,22,.25)]">

                    <Dumbbell
                      size={150}
                      strokeWidth={1}
                      className="text-orange-400 rotate-[-15deg]"
                    />

                  </div>

                </div>


                <div className="absolute top-20 left-[10%] w-12 h-12 rounded-full border border-orange-400/30 animate-[ping_3s_linear_infinite]" />

                <div className="absolute bottom-32 right-[10%] text-orange-400 text-3xl animate-bounce">
                  ✦
                </div>

              </div>
            )}


            {/* ==========================================
                ARROWS
            ========================================== */}

            <button
              onClick={() => changeSlide("prev")}
              className="absolute left-0 sm:left-[-10px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all z-20"
            >

              <ArrowLeft size={21} />

            </button>


            <button
              onClick={() => changeSlide("next")}
              className="absolute right-0 sm:right-[-10px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all z-20"
            >

              <ArrowRight size={21} />

            </button>

          </div>

        </div>


        {/* ==========================================
            SLIDE INDICATORS
        ========================================== */}

        <div className="flex justify-center gap-3 pb-8">

          {slides.map((slide, index) => (

            <button
              key={slide.id}
              onClick={() => {
                if (!isAnimating) {
                  setActiveSlide(index);
                }
              }}
              className="group"
            >

              <div
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  activeSlide === index
                    ? `w-14 bg-gradient-to-r ${slide.color}`
                    : "w-8 bg-white/15 group-hover:bg-white/30"
                }`}
              />

            </button>

          ))}

        </div>


        {/* ==========================================
            CATEGORY CARDS
        ========================================== */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pb-10">

          {slides.map((slide, index) => {

            const Icon = slide.icon;

            return (
              <button
                key={slide.id}
                onClick={() => setActiveSlide(index)}
                className={`text-left p-4 rounded-2xl border transition-all duration-300 ${
                  activeSlide === index
                    ? "border-white/20 bg-white/[0.07]"
                    : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05]"
                }`}
              >

                <div className="flex items-center gap-3">

                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${slide.color} bg-opacity-20`}
                  >

                    <Icon size={21} />

                  </div>

                  <div>

                    <p className="font-semibold text-sm">
                      {slide.category}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Explore collection
                    </p>

                  </div>

                </div>

              </button>
            );

          })}

        </div>


        {/* ==========================================
            BENEFITS
        ========================================== */}

        <div className="border-t border-white/[0.08] py-8">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="flex items-center gap-3">

              <ShieldCheck className="text-blue-400" size={28} />

              <div>
                <p className="font-semibold text-sm">
                  Secure Shopping
                </p>

                <p className="text-xs text-gray-500">
                  Your data is protected
                </p>
              </div>

            </div>


            <div className="flex items-center gap-3">

              <Truck className="text-blue-400" size={28} />

              <div>
                <p className="font-semibold text-sm">
                  Fast Delivery
                </p>

                <p className="text-xs text-gray-500">
                  Quick & reliable
                </p>
              </div>

            </div>


            <div className="flex items-center gap-3">

              <RotateCcw className="text-blue-400" size={28} />

              <div>
                <p className="font-semibold text-sm">
                  Easy Returns
                </p>

                <p className="text-xs text-gray-500">
                  Hassle-free returns
                </p>
              </div>

            </div>


            <div className="flex items-center gap-3">

              <Headset className="text-blue-400" size={28} />

              <div>
                <p className="font-semibold text-sm">
                  24/7 Support
                </p>

                <p className="text-xs text-gray-500">
                  We're here to help
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ==========================================
          CUSTOM ANIMATIONS
      ========================================== */}

      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }

            50% {
              transform: translateY(-18px);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scale(0.94);
            }

            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>

    </section>
  );
};

export default HeroSection;