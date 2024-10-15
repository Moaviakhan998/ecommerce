import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Policy from "./Pages/Policy";
import Pagenotfound from "./Pages/Pagenotfound";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import PrivateRoute from "./Components/Route/Authroute";
import ForgetPassword from "./Pages/ForgetPassword";
import AdminRoute from "./Components/Route/AdminRoute";
import AdminDashboard from "./Pages/AdminDashboard";
import CreateCategory from "./Pages/CreateCategory";
import CreateProduct from "./Pages/CreateProduct";
import AllUsers from "./Pages/AllUsers";
import UserProfile from "./Pages/UserProfile";
import AllOrders from "./Pages/AllOrders";
import Product from "./Pages/Admin/Product";
import UpdateProduct from "./Pages/Admin/UpdateProduct";
import SearchPage from "./Pages/SearchPage";
import ProductDetail from "./Pages/ProductDetail";
import Categories from "./Pages/Categories";
import CategoryProduct from "./Pages/CategoryProduct";
import CartPage from "./Pages/CartPage";
import AllAdminOrder from "./Pages/Admin/AllAdminOrder";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/productdetail/:slug" element={<ProductDetail/>}/>
        <Route path="/search" element={<SearchPage/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/category/:slug" element={<CategoryProduct/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/dashboard" element={<PrivateRoute/>}>
          <Route path="user/" element={<Dashboard/>}/>
          <Route path="user/profile" element={<UserProfile/>}/>
          <Route path="user/orders" element={<AllOrders/>}/>
        </Route>
        <Route path="/dashboard" element={<AdminRoute/>}>
          <Route path="admin/" element={<AdminDashboard/>}/>
          <Route path="admin/create-category" element={<CreateCategory/>}/>
          <Route path="admin/create-product" element={<CreateProduct/>}/>
          <Route path="admin/product/:slug" element={<UpdateProduct/>}/>
          <Route path="admin/products" element={<Product/>}/>
          <Route path="admin/users" element={<AllUsers/>}/>
          <Route path="admin/allorders" element={<AllAdminOrder/>}/>
        </Route>
        <Route path="/about" element={<About/>}/>
        <Route path="/policy" element={<Policy/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgetpassword" element={<ForgetPassword/>}/>
        <Route path="/*" element={<Pagenotfound/>}/>

      </Routes>
    </>
  );
}

export default App;
