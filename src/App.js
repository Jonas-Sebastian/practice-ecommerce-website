import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/PageLayout/Header';
import ProductList from './components/ProductPage/ProductList';
import ProductDetails from './components/ProductPage/ProductDetails';
import Footer from './components/PageLayout/Footer';
import Cart from './components/CartPage/Cart';
import { CartProvider } from './components/Context/CartContext';
import { ToastContainer } from 'react-toastify';
import AdminLogin from './components/AdminPage/AdminLogin';
import AdminDashboard from './components/AdminPage/AdminDashboard';
import PrivateRoute from './components/AdminPage/PrivateRoute';
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
                </Route>

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<PrivateRoute component={AdminDashboard} />} />
            </Routes>
        </Router>
    );
}

const CartProviderWrapper = ({ children }) => {
    return (
        <CartProvider>
            <Header />
            {children}
            <Footer />
            <ToastContainer autoClose={1250} />
        </CartProvider>
    );
};
