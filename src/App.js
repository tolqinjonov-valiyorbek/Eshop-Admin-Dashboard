import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/ForgotPassword";
import MainLayout from "./components/MainLayout";

import Orders from "./pages/Order";
import Customers from "./pages/Customers";
import Categorylist from "./pages/Categorylist";
import Brandlist from "./pages/Brandlist";
import Addcat from "./pages/Addcat";
import Addbrand from "./pages/Addbrand";
import Addproduct from "./pages/Addproduct";
import Productlist from "./pages/Productlist";
import Couponlist from "./pages/Couponlist";
import AddCoupon from "./pages/AddCoupon";
import ViewOrders from "./pages/ViewOrders";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="coupon-list" element={<Couponlist />} />
          <Route path="coupon" element={<AddCoupon />} />
          <Route path="coupon/:id" element={<AddCoupon />} />
          <Route path="product" element={<Addproduct />} />
          <Route path="orders" element={<Orders />} /> 
          <Route path="orders/:id" element={<ViewOrders />} /> 
          <Route path="customers" element={<Customers />} />
          <Route path="category-list" element={<Categorylist />} />
          <Route path="category" element={<Addcat />} />
          <Route path="category/: id" element={<Addcat />} />
          <Route path="list-brand" element={<Brandlist />} />
          <Route path="brand" element={<Addbrand />} />
          <Route path="brand: id" element={<Addbrand />} />
          <Route path="product-list" element={<Productlist />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
