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
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
    return (
        <CartProvider>
            <Router>
                <div className="App">
                    <Header />
                    <main>
                        <Routes>
                            <Route path="/" element={<ProductList />} />
                            <Route path="/products/:id" element={<ProductDetails />} />
                            <Route path="/cart" element={<Cart />} />
                        </Routes>
                    </main>
                    <ToastContainer 
                        autoClose={1250}
                    />
                    <Footer />
                </div>
            </Router>
        </CartProvider>
    );
}