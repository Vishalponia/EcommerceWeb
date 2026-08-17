import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);

  const [loading, setLoading] = useState(false);

  const clearCart = () => {
  setCart([]);
};

  const fetchCart = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/api/cart",
        {
          withCredentials: true,
        }
      );

      setCart(res.data.cart);

    } catch (error) {

      console.log(error);

      setCart([]);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    const user = localStorage.getItem("user");

    if (user) {
      fetchCart();
    }

  }, []);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (

    <CartContext.Provider
  value={{
    cart,
    setCart,
    fetchCart,
    cartCount,
    loading,
    clearCart,
  }}
>

      {children}

    </CartContext.Provider>

  );

};

export const useCart = () => useContext(CartContext);