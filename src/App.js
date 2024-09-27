import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Header from './components/ShopWebsite/PageLayout/Header';
import ProductList from './components/ShopWebsite/ProductPage/ProductList';
import ProductDetails from './components/ShopWebsite/ProductPage/ProductDetails';
import Footer from './components/ShopWebsite/PageLayout/Footer';
import Cart from './components/ShopWebsite/CartPage/Cart';
import { CartProvider } from './components/ShopWebsite/Context/CartContext';
import { ToastContainer } from 'react-toastify';

// Admin Page Imports
import AdminLayout from './components/AdminWebsite/AdminUI/AdminLayout';
import AdminLogin from './components/AdminWebsite/AdminAuthentication/AdminLogin';
import AdminMainPage from './components/AdminWebsite/AdminMainPage';
import AdminProductAdd from './components/AdminWebsite/AdminProductManagement/AdminProductAdd';
import AdminProductList from './components/AdminWebsite/AdminProductManagement/AdminProductList';
import AdminProductEdit from './components/AdminWebsite/AdminProductManagement/AdminProductEdit';
import AdminRegister from './components/AdminWebsite/AdminAuthentication/AdminRegister';
import AdminUserList from './components/AdminWebsite/AdminUserManagement/AdminUserList';
import PrivateRoute from './components/AdminWebsite/AdminAuthentication/PrivateRoute';

// Shop Page Imports
import Contact from './components/ShopWebsite/ShopInfo/ContactPage';
import About from './components/ShopWebsite/ShopInfo/AboutPage';
import HomePage from './components/ShopWebsite/HomePage/HomePage';
import BackToTopButton from './components/ShopWebsite/PageLayout/BackToTop';
import Checkout from './components/ShopWebsite/CartPage/Checkout';
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
                    <Route path="/checkout" element={<Checkout />} />
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
                    <Route path="products/add" element={<AdminProductAdd />} />
                    <Route path="products/:id" element={<AdminProductEdit />} />
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
