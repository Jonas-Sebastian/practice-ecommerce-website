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
import AdminLogin from './components/AdminPage/AdminLogin';
import AdminDashboard from './components/AdminPage/AdminDashboard';
import AdminRegister from './components/AdminPage/AdminRegister';
import PrivateRoute from './components/AdminPage/PrivateRoute';
import Contact from './components/ShopInfo/ContactPage';
import About from './components/ShopInfo/AboutPage';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
    return (
        <Router>
            <Routes>
                {/* Shop Routes */}
                <Route element={<CartProviderWrapper />}>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/shop" element={<ProductList />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin" element={localStorage.getItem('adminToken') ? (<Navigate to="/admin/dashboard" />) : 
                    (<Navigate to="/admin/login" />)}/>
                <Route path="/admin/login" element={localStorage.getItem('adminToken') ? (<Navigate to="/admin/dashboard" />) : 
                    (<AdminLogin />)}/>
                <Route path="/admin/register" element={localStorage.getItem('adminToken') ? (<Navigate to="/admin/dashboard" />) : 
                    (<AdminRegister />)}/>
                {/* Protected route */}
                <Route path="/admin/dashboard" element={<PrivateRoute component={AdminDashboard} />} />
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
        </CartProvider>
    );
};
