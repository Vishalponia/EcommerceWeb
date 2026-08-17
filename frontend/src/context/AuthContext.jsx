import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  const [seller, setSeller] = useState(() => {
    const storedSeller = localStorage.getItem("seller");

    try {
      return storedSeller ? JSON.parse(storedSeller) : null;
    } catch {
      localStorage.removeItem("seller");
      return null;
    }
  });

  const loginUser = (userData) => {

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    localStorage.removeItem("seller");

    setUser(userData);
    setSeller(null);
  };

  const loginSeller = (sellerData) => {

    localStorage.setItem(
      "seller",
      JSON.stringify(sellerData)
    );

    localStorage.removeItem("user");

    setSeller(sellerData);
    setUser(null);
  };

  const logout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("seller");

    setUser(null);
    setSeller(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        seller,
        loginUser,
        loginSeller,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);