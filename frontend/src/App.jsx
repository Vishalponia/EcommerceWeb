import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AddCategory from "./pages/admin/AddCategory.jsx";
import CategoryList from "./pages/admin/CategoryList";
import EditCategory from "./pages/admin/EditCategory"
import AddProduct from "./pages/admin/AddProduct";
import ProductList from "./pages/admin/ProductList";
import CategoryProducts from "./pages/CategoryProducts";
import EditProduct from "./pages/admin/EditProduct";
import UserList from "./pages/admin/UserList";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import Checkout from "./pages/Checkout.jsx";
import MyOrders from "./pages/MyOrders";
import AdminOrderList from "./pages/admin/AdminOrderList";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import About from "./pages/About.jsx";
import Footer from "./components/Footer.jsx";
import Contact from "./pages/Contact.jsx";
import SellerDashboard from "./pages/SellerDashboard";
import SellerAddProduct from "./pages/SellerAddProduct";
import SellerProductList from "./pages/SellerProductList";
import SellerEditProduct from "./pages/SellerEditProduct";
import Shop from "./pages/Shop";
import TestPayment from "./pages/TestPayment"



import AIChatTest from "./components/AIChatTest";
function App() {
  return (
    <CartProvider>
    <BrowserRouter>
      <Navbar />
  
     <AIChatTest/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        {/* <Route path="/login" element={<h1 className="text-4xl p-10">Login</h1>} />
       <Route path="/signup" element={<h1 className="text-4xl p-10">Signup</h1>} />  */}
       <Route path="/signup" element={<Signup />} />
        <Route path="/login"element={<Login/>}/> 
        <Route path="/profile" element={ <ProtectedRoute> <Profile/></ProtectedRoute>} />
       <Route path="/admin"element={<AdminRoute><AdminDashboard/></AdminRoute> }/>
       <Route path="/admin/add-category"element={ <AdminRoute><AddCategory /></AdminRoute>}/>
       <Route path="/admin/categories"element={<AdminRoute><CategoryList /></AdminRoute>}/>
       <Route path="/admin/edit-category/:id" element={<AdminRoute><EditCategory /></AdminRoute>}/>
       <Route path="/admin/add-product" element={ <AdminRoute><AddProduct /></AdminRoute> }/>
       <Route path="/admin/products" element={ <AdminRoute><ProductList /></AdminRoute> }/>
       <Route path="/category/:categoryId" element={<CategoryProducts />}/>
       <Route path="/admin/edit-product/:id" element={<AdminRoute> <EditProduct /> </AdminRoute> }/>
       <Route path="/admin/users" element={<AdminRoute><UserList /></AdminRoute>}/>
       <Route path="/product/:id" element={<ProductDetail />}/>
       <Route path="/cart"  element={<ProtectedRoute><Cart /></ProtectedRoute>}/>
       <Route path="/checkout" element={ <ProtectedRoute><Checkout/></ProtectedRoute> }/>
       <Route path="/my-orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute> }/>
        <Route path="/admin/orders" element={<AdminRoute><AdminOrderList /></AdminRoute> }/>
        <Route path="/seller/dashboard" element={<SellerDashboard /> }/>
        <Route path="/seller/add-product" element={<SellerAddProduct /> }/>
        <Route path="/seller/products" element={<SellerProductList /> }/>
        <Route path="/seller/edit-product/:id" element={<SellerEditProduct /> }/>
        

       <Route path="/categories" element={<CategoriesPage />} />
       <Route path="/about" element={<About />} />
       <Route path="/contact" element={<Contact />} />
       <Route path="/shop" element={<Shop />} />
       <Route
  path="/test-payment"
  element={<TestPayment />}
/>




<Route path="/ai-test" element={<AIChatTest />} />
       
       
       
        

      </Routes>
      
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;