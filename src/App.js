import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Header from './components/PageLayout/Header';
import ProductList from './components/ProductPage/ProductList';
import ProductDetails from './components/ProductPage/ProductDetails';
import Footer from './components/PageLayout/Footer';
import Cart from './components/CartPage/Cart';
import { CartProvider } from './components/Context/CartContext';
import { ToastContainer } from 'react-toastify';

// Admin Page Imports
import AdminLayout from './components/AdminPage/AdminUI/AdminLayout';
import AdminLogin from './components/AdminPage/AdminAuthentication/AdminLogin';
import AdminMainPage from './components/AdminPage/AdminMainPage';
import AdminProductList from './components/AdminPage/AdminProductManagement/AdminProductList';
import AdminRegister from './components/AdminPage/AdminAuthentication/AdminRegister';
import AdminUserList from './components/AdminPage/AdminUserManagement/AdminUserList';
import PrivateRoute from './components/AdminPage/AdminAuthentication/PrivateRoute';

// Shop Page Imports
import Contact from './components/ShopInfo/ContactPage';
import About from './components/ShopInfo/AboutPage';
import HomePage from './components/HomePage/HomePage';
import BackToTopButton from './components/PageLayout/BackToTop';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
    return (
        <Router>
            <Routes>
                {/* Shop Routes */}
                <Route element={<CartProviderWrapper />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/shop" element={<ProductList />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin" element={localStorage.getItem('adminToken') ? (<Navigate to="/admin/main" />) : 
                    (<Navigate to="/admin/login" />)} />
                <Route path="/admin/login" element={localStorage.getItem('adminToken') ? (<Navigate to="/admin/main" />) : 
                    (<AdminLogin />)} />
                <Route path="/admin/register" element={localStorage.getItem('adminToken') ? (<Navigate to="/admin/main" />) : 
                    (<AdminRegister />)} />

                <Route path="/admin/*" element={<PrivateRoute component={AdminLayout} />}>
                    <Route path="main" element={<AdminMainPage />} />
                    <Route path="users" element={<AdminUserList />} />
                    <Route path="products" element={<AdminProductList />} />
                    {/* Add more admin routes as needed */}
                </Route>
            </Routes>
        </Router>
    );
}

const CartProviderWrapper = () => {
    return (
        <CartProvider>
            <Header />
            <Outlet />
            <Footer />
            <ToastContainer autoClose={1250} />
            <BackToTopButton />
        </CartProvider>
    );
};
