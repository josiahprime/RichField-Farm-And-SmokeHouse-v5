import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { Toaster } from "react-hot-toast";
import Layout from './Components/Layout.jsx';
import Home from './pages/Home/Home.jsx';
import About from './pages/About/About.jsx';
import Contact from './pages/Contact/Contact.jsx';
import Product from './pages/Product/Product.jsx';
import Cart from './Components/Cart/Cart.jsx';
import Checkout from './pages/Checkout/Checkout.jsx';
import Signup from './pages/signup/Signup.jsx';
import VerifyEmail from './pages/VerifyEmail/VerifyEmail.jsx';
import Login from './pages/login/Login.jsx';
import ResetPassword from './pages/resetPassword/resetPassword.jsx';
import RequestResetPassword from './pages/requestReset/requestReset.jsx';
import AuthProtectedRoute from './Components/ProtectedRoute/AuthProtectedRoute.jsx';
import RoleProtectedRoute from './Components/ProtectedRoute/RoleProtectedRoute.jsx';
import { useAuthStore } from './store/useAuthStore.js';
import PaymentVerification from './pages/PaymentVerification/PaymentVerification.jsx';
import ProductDetails from './pages/ProductDetails/ProductDetails.jsx';

//dashboard routes 
import DashboardLayout from './AdminDashboard/DashboardLayout.jsx';
import DashboardHome from "./AdminDashboard/pages/home/Home.jsx";
import LoginPage from './AdminDashboard/pages/login/Login.jsx';
import Logout from './AdminDashboard/components/logout/Logout.jsx'
import { productInputs, userInputs } from "./AdminDashboard/formSource";
import "./AdminDashboard/style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./AdminDashboard/context/darkModeContext";
import ProductsForm from './AdminDashboard/pages/ProductsForm/ProductsForm.jsx';
import OrderDetails from './AdminDashboard/pages/delivery/OrderDetails.jsx'
import DeliveryComponent from './AdminDashboard/pages/delivery/delivery.jsx';
import SettingsPage from './AdminDashboard/pages/settings/settings.jsx';
// import Signup from './components/AdminDashboard/pages/signup/signup.jsx';
import Products from './AdminDashboard/pages/products/Products.jsx';
import EditProduct from './AdminDashboard/components/EditProducts/EditProducts.jsx';
import Notifications from './AdminDashboard/pages/notifications/Notifications.jsx';
import SystemHealth from './AdminDashboard/pages/systemHealth/SystemHealth.jsx';
import Logs from './AdminDashboard/pages/logs/Logs.jsx';
import Profile from './AdminDashboard/pages/profile/Profile.jsx';
import Stats from './AdminDashboard/pages/stats/Stats.jsx';
import Orders from './AdminDashboard/pages/orders/orders.jsx';
import Messages from './AdminDashboard/pages/messages/Messages.jsx';
import UsersPage from './AdminDashboard/pages/usersPage/UsersPage.jsx';
import AddUser from './AdminDashboard/pages/usersPage/AddUser.jsx';
import EditUser from './AdminDashboard/pages/usersPage/EditUser.jsx';



function App() {
  const location = useLocation();
  console.log("Current Route:", location.pathname);

  const { authUser, checkAuth, isCheckingAuth, fetchUser } = useAuthStore();


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (authUser?.isGoogleUser) {
      fetchUser(); // Fetch Google user only when logged in with Google
    }
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }


  

  return (
    <>

      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="product" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetails />}></Route>
          <Route path="cart" element={<Cart />} />
          <Route
            path="cart/checkout"
            element={
              <AuthProtectedRoute>
                <Checkout />
              </AuthProtectedRoute>
            }
          />

          <Route
          path='payment-success'
          element={
            <AuthProtectedRoute>
              <PaymentVerification/>
            </AuthProtectedRoute>
          }
          />
          <Route path="login" element={<Login />} />
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="signup" element={<Signup />} />
          <Route path="request-reset-password" element={<RequestResetPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Route>

      
      
        {/* dashboard routes */}
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          
          {/* Admin-only pages */}
          <Route path="users">
            <Route index element={<UsersPage />} />
            <Route path="addUser" element={<AddUser />} />
            <Route path="editUser" element={<EditUser />} />
          </Route>

          <Route path="products">
            <Route index element={<Products />} />
            <Route path="addProducts" element={<ProductsForm />} />
            <Route path="edit/:id" element={<EditProduct />} />
          </Route>

          <Route path='delivery'>
            <Route index element={<DeliveryComponent/>}/>
            <Route path='details/:id' element={<OrderDetails/>}/>
          </Route>

          {/* Orders accessible to admins and customers */}
          <Route path="orders">
            <Route index element={<Orders />} />
          </Route>

          {/* Admin-only sections */}
          <Route path="systemHealth" element={<SystemHealth />} />
          <Route path="logs" element={<Logs />} />
          <Route path="stats" element={<Stats />} />
          <Route path="notifications" element={<Notifications/>}/>

          {/* Accessible to all authenticated users */}
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="logout" element={<Logout />} />
        </Route>

        {/* <Route
          path="/dashboard"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <Dashboard />
            </RoleProtectedRoute>
          }
        /> */}

      {/* end of routing */}
      </Routes>
      </>
  );
}

export default App;
