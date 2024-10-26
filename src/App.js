import React, {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Header from './components/ShopWebsite/PageLayout/Header';
import ProductPage from './components/ShopWebsite/ProductPage/ProductPage';
import ProductDetails from './components/ShopWebsite/ProductPage/ProductDetails';
import Footer from './components/ShopWebsite/PageLayout/Footer';
import Cart from './components/ShopWebsite/CartPage/Cart';
import { CartProvider } from './components/ShopWebsite/Context/CartContext';
import { ToastContainer } from 'react-toastify';

// Admin Page Imports
import AdminLayout from './components/AdminWebsite/AdminUI/AdminLayout';
import AdminLogin from './components/AdminWebsite/AdminAuthentication/AdminLogin';
import AdminMainPage from './components/AdminWebsite/AdminMainPage';
import AdminPendingUserList from './components/AdminWebsite/AdminUserManagement/AdminPendingUserList';
import AdminProductAdd from './components/AdminWebsite/AdminProductManagement/AdminProductAdd';
import AdminProductList from './components/AdminWebsite/AdminProductManagement/AdminProductList';
import AdminProductEdit from './components/AdminWebsite/AdminProductManagement/AdminProductEdit';
import AdminRegister from './components/AdminWebsite/AdminAuthentication/AdminRegister';
import AdminUserList from './components/AdminWebsite/AdminUserManagement/AdminUserList';
import AdminOrderList from './components/AdminWebsite/AdminOrderManagement/AdminOrderList';
import AdminCategoryAdd from './components/AdminWebsite/AdminCategoryManagement/AdminCategoryAdd';
import AdminCategoryList from './components/AdminWebsite/AdminCategoryManagement/AdminCategoryList';
import AdminCategoryEdit from './components/AdminWebsite/AdminCategoryManagement/AdminCategoryEdit';
import PrivateRoute from './components/AdminWebsite/AdminAuthentication/PrivateRoute';

// Shop Page Imports
import Contact from './components/ShopWebsite/ShopInfo/ContactPage';
import About from './components/ShopWebsite/ShopInfo/AboutPage';
import FeaturesRoadmap from './components/ShopWebsite/ShopInfo/FeaturesRoadmap';
import HomePage from './components/ShopWebsite/HomePage/HomePage';
import BackToTopButton from './components/ShopWebsite/PageLayout/BackToTop';
import Checkout from './components/ShopWebsite/CartPage/Checkout';
import 'react-toastify/dist/ReactToastify.css';
import DataLoadingMessage from './components/ShopWebsite/ShopInfo/DataLoadingMessage';

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
                    <Route path="/shop" element={<ProductPage />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/roadmap" element={<FeaturesRoadmap />} />
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
                    <Route path="users/pending" element={<AdminPendingUserList />} />
                    <Route path="products" element={<AdminProductList />} />
                    <Route path="products/add" element={<AdminProductAdd />} />
                    <Route path="products/:id" element={<AdminProductEdit />} />
                    <Route path="categories" element={<AdminCategoryList />} />
                    <Route path="categories/add" element={<AdminCategoryAdd />} />
                    <Route path="categories/:id" element={<AdminCategoryEdit />} />
                    <Route path="orders" element={<AdminOrderList />} />
                </Route>
            </Routes>
        </Router>
    );
}

const CartProviderWrapper = () => {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <CartProvider>
            <Header />
            <Outlet />
            <DataLoadingMessage open={open} handleClose={handleClose} />
            <Footer />
            <ToastContainer autoClose={1250} />
            <BackToTopButton />
        </CartProvider>
    );
};
