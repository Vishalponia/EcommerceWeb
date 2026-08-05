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

function App() {
  return (
    <BrowserRouter>
      <Navbar />
  

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
       
       
       
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;