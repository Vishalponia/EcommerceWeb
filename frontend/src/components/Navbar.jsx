import {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaSearch, FaBars, FaTimes, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);


  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-blue-600">
          Ecommerece 
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-8 font-medium text-gray-700">
          <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
          <li><Link to="/shop" className="hover:text-blue-600">Shop</Link></li>
          <li><Link to="/categories" className="hover:text-blue-600">Categories</Link></li>
          <li><Link to="/about" className="hover:text-blue-600">About</Link></li>
          <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
        </ul>

        {/* Search */}
        <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2 w-72">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search Products..."
            className="bg-transparent outline-none ml-3 w-full"
          />
        </div>

        {/* Icons */}
        <div className="hidden lg:flex items-center gap-5">
          <Link to="/wishlist" className="relative">
            <FaHeart size={22} className="hover:text-red-500 transition" />
            <span className="absolute -top-2 -right-2  text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
              
            </span>
          </Link>

          <Link to="/cart" className="relative">
            <FaShoppingCart size={22} className="hover:text-blue-600 transition" />
            <span className="absolute -top-2 -right-2  text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
              
            </span>
          </Link>

          






 {/* condition for if  user login then show a profile of user if user does not login show a login button */}


{/* <div className="hidden lg:flex items-center gap-5">

 {user ? (

    <Link
      to="/profile"
      className="flex items-center gap-3"
    >

      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
        {user.name.charAt(0).toUpperCase()}
      </div>

      <span className="font-semibold">
        {user.name}
      </span>

    </Link>

  ) : (

    <Link
      to="/login"
      className="bg-blue-600 text-white px-5 py-2 rounded-lg"
    >
      Login
    </Link>

  )} 

</div>

 */}




<div className="hidden lg:flex items-center gap-5">

  {user ? (

    <Link
      to={user.role === "admin" ? "/admin" : "/profile"}
      className="flex items-center gap-3"
    >

      <div
        className={`w-10 h-10 rounded-full text-white flex items-center justify-center font-bold ${
          user.role === "admin" ? "bg-orange-500" : "bg-blue-600"
        }`}
      >
        {user.name.charAt(0).toUpperCase()}
      </div>

      <div className="flex flex-col">
        <span className="font-semibold">{user.name}</span>

        <span className="text-xs text-black">
          {user.role === "admin" ? "Admin" : "User"}
        </span>
      </div>

    </Link>

  ) : (

    <Link
      to="/login"
      className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
    >
      Login
    </Link>

  )}

</div>

          
          
        </div> 

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden bg-white shadow-lg px-6 py-5"
        >
          <div className="flex flex-col gap-5 text-lg">

            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>

            <Link to="/shop" onClick={() => setIsOpen(false)}>Shop</Link>

            <Link to="/categories" onClick={() => setIsOpen(false)}>Categories</Link>

            <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>

            <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>

            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mt-2">
              <FaSearch />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none ml-3 w-full"
              />
            </div>


   {/* condition for if  user login then show a profile of user if user does not login show a login button */}         

            {user ? (

  <>
    <Link
      to={user.role === "admin" ? "/admin" : "/profile"}
      onClick={() => setIsOpen(false)}
      className="flex items-center gap-3 border rounded-lg p-3"
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
          user.role === "admin"
            ? "bg-orange-500"
            : "bg-blue-600"
        }`}
      >
        {user.name.charAt(0).toUpperCase()}
      </div>

      <div>
        <p className="font-semibold">{user.name}</p>
        <p className="text-sm text-gray-500">
          {user.role === "admin" ? "Admin" : "User"}
        </p>
      </div>
    </Link>
  </>

) : (

  <Link
    to="/login"
    onClick={() => setIsOpen(false)}
    className="bg-blue-600 text-white py-2 rounded text-center"
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