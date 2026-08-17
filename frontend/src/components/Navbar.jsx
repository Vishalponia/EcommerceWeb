// import {useEffect, useState } from "react";
// import { Link,useNavigate } from "react-router-dom";
// import { FaShoppingCart, FaHeart, FaSearch, FaBars, FaTimes, FaUser } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";


// const Navbar = () => {
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);
//    const [search, setSearch] = useState("");
//    const {
//     user,
//     seller,
//   } = useAuth();

//   const { cartCount } = useCart();

//   // remaining code...
//   // const { cartCount, fetchCart } = useCart();
//   // console.log("Cart Count:", cartCount);
  
//   const handleSearch = (e) => {

//   e.preventDefault();

//   const value = search.trim();

//   if (!value) {
//     navigate("/shop");
//     return;
//   }

//   navigate(`/shop?search=${encodeURIComponent(value)}`);

// };



//   return (
//     <motion.nav
//       initial={{ y: -80 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="bg-white shadow-md sticky top-0 z-50"
//     >
//       <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        
//         {/* Logo */}
//         {/* <Link to="/" className="text-3xl font-bold text-blue-600">
//           Ecommerece 
//         </Link> */}


       

//        {/* Logo / Mobile Search */}
// <div className="flex items-center flex-1">

//   {/* Desktop Logo */}
//   <Link
//     to="/"
//     className="hidden lg:block text-3xl font-bold text-blue-600"
//   >
//     Ecommerece
//   </Link>

//   {/* Mobile Search */}
//   <form
//     onSubmit={(e) => {
//       handleSearch(e);
//       setIsOpen(false);
//     }}
//     className="lg:hidden flex items-center w-full mr-4"
//   >
//     <div className="flex items-center bg-gray-100 border border-gray-200 rounded-xl px-3 py-2 w-full">

//       <FaSearch className="text-gray-500 shrink-0" />

//       <input
//         type="text"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         placeholder="Search products..."
//         className="bg-transparent outline-none ml-2 w-full text-sm"
//       />

//     </div>
//   </form>

// </div>



             
//         {/* Desktop Menu */}
//         <ul className="hidden lg:flex items-center gap-8 font-medium text-gray-700">
//           <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
//           <li><Link to="/shop" className="hover:text-blue-600">Shop</Link></li>
//           <li><Link to="/categories" className="hover:text-blue-600">Categories</Link></li>
//           <li><Link to="/about" className="hover:text-blue-600">About</Link></li>
//           <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
//         </ul>

//         {/* Search */}
//         <div className="hidden lg:flex items-center  rounded-lg px-4 py-2 w-72">
         


// <form
//   onSubmit={handleSearch}
//   className="flex items-center w-full max-w-xl"
// >
//   <input
//     type="text"
//     value={search}
//     onChange={(e) => setSearch(e.target.value)}
//     placeholder="Search products..."
//     className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg outline-none focus:ring-2 focus:ring-blue-500"
//   />

//   <button
//     type="submit"
//     className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-r-lg hover:bg-blue-700 transition"
//   >
//     Search
//   </button>
// </form>

//         </div>

//         {/* Icons */}
//         <div className="hidden lg:flex items-center gap-5">
//           <Link to="/wishlist" className="relative">
//             <FaHeart size={22} className="hover:text-red-500 transition" />
//             <span className="absolute -top-2 -right-2  text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
              
//             </span>
//           </Link> 

          


//     <Link
//   to="/cart"
//   className="relative"
// >

//   <FaShoppingCart className="text-2xl  hover:text-red-500" />

//   {
//     cartCount > 0 && (

//       <span
//         className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
//       >

//         {cartCount}

//       </span>

//     )
//   }

// </Link>
          






//  {/* condition for if  user login then show a profile of user if user does not login show a login button */}





// <div className="hidden lg:flex items-center gap-5">

  
//   {seller ? (

//     <Link
//       to="/seller/dashboard"
//       className="flex items-center gap-3"
//     >

//       <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
//         {seller.name?.charAt(0).toUpperCase()}
//       </div>

//       <div className="flex flex-col">

//         <span className="font-semibold">
//           {seller.name}
//         </span>

//         <span className="text-xs text-black">
//           Seller
//         </span>

//       </div>

//     </Link>

//   ) : user ? (

//     <Link
//       to={user.role === "admin" ? "/admin" : "/profile"}
//       className="flex items-center gap-3"
//     >

//       <div
//         className={`w-10 h-10 rounded-full text-white flex items-center justify-center font-bold ${
//           user.role === "admin"
//             ? "bg-orange-500"
//             : "bg-blue-600"
//         }`}
//       >
//         {user.name?.charAt(0).toUpperCase()}
//       </div>

//       <div className="flex flex-col">

//         <span className="font-semibold">
//           {user.name}
//         </span>

//         <span className="text-xs text-black">
//           {user.role === "admin" ? "Admin" : "User"}
//         </span>

//       </div>

//     </Link>

//   ) : (

//     <Link
//       to="/login"
//       className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
//     >
//       Login
//     </Link>

//   )}


// </div>

          
          
//         </div> 

//         {/* Mobile Menu Button */}
//         <button
//           className="lg:hidden"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <motion.div
//           initial={{ x: 300 }}
//           animate={{ x: 0 }}
//           transition={{ duration: 0.3 }}
//           className="lg:hidden bg-white shadow-lg px-6 py-5"
//         >
//           <div className="flex flex-col gap-5 text-lg">

//             <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>

//             <Link to="/shop" onClick={() => setIsOpen(false)}>Shop</Link>

//             <Link to="/categories" onClick={() => setIsOpen(false)}>Categories</Link>

//             <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>

//             <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>

            


//    {/* condition for if  user login then show a profile of user if user does not login show a login button */}         

//             {seller ? (

//   <Link
//     to="/seller/dashboard"
//     onClick={() => setIsOpen(false)}
//     className="flex items-center gap-3 border rounded-lg p-3"
//   >

//     <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">

//       {seller.name?.charAt(0).toUpperCase()}

//     </div>

//     <div>

//       <p className="font-semibold">
//         {seller.name}
//       </p>

//       <p className="text-sm text-gray-500">
//         Seller
//       </p>

//     </div>

//   </Link>

// ) : user ? (

//   <Link
//     to={user.role === "admin" ? "/admin" : "/profile"}
//     onClick={() => setIsOpen(false)}
//     className="flex items-center gap-3 border rounded-lg p-3"
//   >

//     <div
//       className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
//         user.role === "admin"
//           ? "bg-orange-500"
//           : "bg-blue-600"
//       }`}
//     >

//       {user.name?.charAt(0).toUpperCase()}

//     </div>

//     <div>

//       <p className="font-semibold">
//         {user.name}
//       </p>

//       <p className="text-sm text-gray-500">
//         {user.role === "admin" ? "Admin" : "User"}
//       </p>

//     </div>

//   </Link>

// ) : (

//   <Link
//     to="/login"
//     onClick={() => setIsOpen(false)}
//     className="bg-blue-600 text-white py-2 rounded text-center"
//   >
//     Login
//   </Link>

// )}

//           </div>
//         </motion.div>
//       )}
//     </motion.nav>
//   );
// };

// export default Navbar;














import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaShoppingCart,
  FaHeart,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { motion } from "framer-motion";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { user, seller } = useAuth();
  const { cartCount } = useCart();

  // ==========================================
  // SEARCH
  // ==========================================

  const handleSearch = (e) => {
    e.preventDefault();

    const value = search.trim();

    if (!value) {
      navigate("/shop");
      return;
    }

    navigate(
      `/shop?search=${encodeURIComponent(value)}`
    );

    // Close mobile menu
    setIsOpen(false);
  };

  // ==========================================
  // CLOSE MOBILE MENU
  // ==========================================

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md sticky top-0 z-50"
    >

      {/* =====================================================
          MAIN NAVBAR
      ===================================================== */}

      <div className="max-w-7xl mx-auto px-4 sm:px-5 py-3">

        <div className="flex items-center gap-4">


          {/* =================================================
              LOGO
          ================================================= */}

          <div className="flex items-center shrink-0">

            <Link
              to="/"
              className="hidden lg:block text-3xl font-bold text-blue-600"
            >
              Ecommerece
            </Link>

          </div>


          {/* =================================================
              MOBILE SEARCH
          ================================================= */}

          <form
            onSubmit={handleSearch}
            className="lg:hidden flex-1 min-w-0"
          >

            <div className="flex items-center bg-gray-100 border border-gray-200 rounded-xl px-3 py-2">

              <FaSearch
                size={16}
                className="text-gray-500 shrink-0"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search products..."
                className="bg-transparent outline-none ml-2 w-full text-sm"
              />

            </div>

          </form>


          {/* =================================================
              DESKTOP MENU
          ================================================= */}

          <ul className="hidden lg:flex items-center gap-7 font-medium text-gray-700 ml-8">

            <li>
              <Link
                to="/"
                className="hover:text-blue-600 transition"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/shop"
                className="hover:text-blue-600 transition"
              >
                Shop
              </Link>
            </li>

            <li>
              <Link
                to="/categories"
                className="hover:text-blue-600 transition"
              >
                Categories
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="hover:text-blue-600 transition"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="hover:text-blue-600 transition"
              >
                Contact
              </Link>
            </li>

          </ul>


          {/* =================================================
              DESKTOP SEARCH
          ================================================= */}

        

<form
  onSubmit={handleSearch}
  className="hidden lg:flex items-center w-56 xl:w-64 ml-auto"
>
  <div className="relative w-full">

    <FaSearch
      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      size={15}
    />

    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search products..."
      className="
        w-full
        bg-gray-100
        border border-transparent
        rounded-lg
        pl-10 pr-4 py-2.5
        text-sm
        outline-none
        transition
        focus:bg-white
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-100
      "
    />

  </div>
</form>

          {/* =================================================
              DESKTOP ICONS
          ================================================= */}

          <div className="hidden lg:flex items-center gap-5 ml-4">


            {/* Wishlist */}

            <Link
              to="/wishlist"
              className="relative group"
            >

              <FaHeart
                size={22}
                className="text-gray-700 group-hover:text-red-500 transition"
              />

            </Link>


            {/* Cart */}

            <Link
              to="/cart"
              className="relative group"
            >

              <FaShoppingCart
                size={23}
                className="text-gray-700 group-hover:text-blue-600 transition"
              />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">

                  {cartCount}

                </span>
              )}

            </Link>


            {/* User / Seller */}

            {seller ? (

              <Link
                to="/seller/dashboard"
                className="flex items-center gap-3"
              >

                <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">

                  {seller.name
                    ?.charAt(0)
                    .toUpperCase()}

                </div>

                <div className="flex flex-col">

                  <span className="font-semibold text-sm">
                    {seller.name}
                  </span>

                  <span className="text-xs text-gray-500">
                    Seller
                  </span>

                </div>

              </Link>

            ) : user ? (

              <Link
                to={
                  user.role === "admin"
                    ? "/admin"
                    : "/profile"
                }
                className="flex items-center gap-3"
              >

                <div
                  className={`w-10 h-10 rounded-full text-white flex items-center justify-center font-bold ${
                    user.role === "admin"
                      ? "bg-orange-500"
                      : "bg-blue-600"
                  }`}
                >

                  {user.name
                    ?.charAt(0)
                    .toUpperCase()}

                </div>

                <div className="flex flex-col">

                  <span className="font-semibold text-sm">
                    {user.name}
                  </span>

                  <span className="text-xs text-gray-500">
                    {user.role === "admin"
                      ? "Admin"
                      : "User"}
                  </span>

                </div>

              </Link>

            ) : (

              <Link
                to="/login"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </Link>

            )}

          </div>


          {/* =================================================
              MOBILE CART
          ================================================= */}

          <div className="lg:hidden flex items-center gap-4 shrink-0">

            <Link
              to="/cart"
              className="relative"
            >

              <FaShoppingCart
                size={22}
                className="text-gray-700"
              />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">

                  {cartCount}

                </span>
              )}

            </Link>


            {/* =================================================
                MOBILE MENU BUTTON
            ================================================= */}

            <button
              onClick={() =>
                setIsOpen(!isOpen)
              }
              className="text-gray-700"
            >

              {isOpen ? (
                <FaTimes size={27} />
              ) : (
                <FaBars size={27} />
              )}

            </button>

          </div>

        </div>

      </div>


      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      {isOpen && (

        <motion.div
          initial={{
            opacity: 0,
            height: 0,
          }}
          animate={{
            opacity: 1,
            height: "auto",
          }}
          transition={{
            duration: 0.3,
          }}
          className="lg:hidden bg-white border-t shadow-lg px-6 py-5"
        >

          <div className="flex flex-col gap-5 text-lg">


            {/* Navigation */}

            <Link
              to="/"
              onClick={closeMenu}
              className="hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              to="/shop"
              onClick={closeMenu}
              className="hover:text-blue-600"
            >
              Shop
            </Link>

            <Link
              to="/categories"
              onClick={closeMenu}
              className="hover:text-blue-600"
            >
              Categories
            </Link>

            <Link
              to="/about"
              onClick={closeMenu}
              className="hover:text-blue-600"
            >
              About
            </Link>

            <Link
              to="/contact"
              onClick={closeMenu}
              className="hover:text-blue-600"
            >
              Contact
            </Link>


            {/* =================================================
                MOBILE USER / SELLER
            ================================================= */}

            {seller ? (

              <Link
                to="/seller/dashboard"
                onClick={closeMenu}
                className="flex items-center gap-3 border rounded-xl p-3"
              >

                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">

                  {seller.name
                    ?.charAt(0)
                    .toUpperCase()}

                </div>

                <div>

                  <p className="font-semibold">
                    {seller.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    Seller
                  </p>

                </div>

              </Link>

            ) : user ? (

              <Link
                to={
                  user.role === "admin"
                    ? "/admin"
                    : "/profile"
                }
                onClick={closeMenu}
                className="flex items-center gap-3 border rounded-xl p-3"
              >

                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    user.role === "admin"
                      ? "bg-orange-500"
                      : "bg-blue-600"
                  }`}
                >

                  {user.name
                    ?.charAt(0)
                    .toUpperCase()}

                </div>

                <div>

                  <p className="font-semibold">
                    {user.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {user.role === "admin"
                      ? "Admin"
                      : "User"}
                  </p>

                </div>

              </Link>

            ) : (

              <Link
                to="/login"
                onClick={closeMenu}
                className="bg-blue-600 text-white py-2.5 rounded-lg text-center font-semibold"
              >
                Login
              </Link>

            )}

          </div>

        </motion.div>

      )}

    </motion.nav>
  );
};

export default Navbar;