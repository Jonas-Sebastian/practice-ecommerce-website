import React, { useEffect, useState } from 'react';
import ProductService from '../../../services/ProductService';
import ProductCard from './ProductCard';
import { useCart } from '../Context/CartContext';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import orderService from '../../../services/OrderService';
import ProductSorting from './ProductSort';

const ITEMS_PER_PAGE = 20;

export default function ProductList({ selectedCategories, filteredMinPrice, filteredMaxPrice }) {
    const { handleAddToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [jumpToPage, setJumpToPage] = useState('');
    const [sortOrder, setSortOrder] = useState('product-id-asc');
    const [bestSellers, setBestSellers] = useState({});
    const location = useLocation();

    useEffect(() => {
        const fetchBestSellers = async () => {
            try {
                const orders = await orderService.getOrders();
                const productSales = {};

                orders.forEach(order => {
                    if (order.order_items) {
                        order.order_items.forEach(item => {
                            const { product, quantity } = item;
                            productSales[product] = (productSales[product] || 0) + quantity;
                        });
                    }
                });
                setBestSellers(productSales);
            } catch (error) {
                console.error('Error fetching best-sellers:', error);
            }
        };

        fetchBestSellers();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await ProductService.getAllProducts();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('search')?.toLowerCase() || '';

        const filtered = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(query);
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
            const matchesPrice = product.price >= filteredMinPrice && product.price <= filteredMaxPrice;
            return matchesSearch && matchesCategory && matchesPrice;
        });

        let sortedProducts = [...filtered];

        switch (sortOrder) {
            case 'product-id-asc':
                sortedProducts.sort((a, b) => a.id - b.id);
                break;
            case 'product-id-desc':
                sortedProducts.sort((a, b) => b.id - a.id);
                break;
            case 'best-seller':
                sortedProducts.sort((a, b) => (bestSellers[b.id] || 0) - (bestSellers[a.id] || 0));
                break;
            case 'price-asc':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }

        setFilteredProducts(sortedProducts);
    }, [location.search, products, selectedCategories, filteredMinPrice, filteredMaxPrice, sortOrder, bestSellers]);

    const addToCart = (product) => {
        handleAddToCart(product);
        toast.success('Product added to cart!');
    };

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const currentProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handleJumpToPage = () => {
        const pageNum = parseInt(jumpToPage);
        if (pageNum > 0 && pageNum <= totalPages) {
            setCurrentPage(pageNum);
        }
        setJumpToPage('');
    };

    return (
        <>
            {/* Pagination and Sorting Section */}
            <div className="flex flex-col lg:flex-row justify-between mb-4">
                <div className="flex items-center">
                    <ProductSorting 
                        sortOrder={sortOrder} 
                        setSortOrder={setSortOrder} 
                    />
                </div>

                {/* Pagination Controls */}
                <div className="bg-white p-2 rounded shadow-sm">
                    <div className="flex items-center flex-col xl:flex-row">
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={(event, value) => setCurrentPage(value)}
                            variant="outlined"
                            shape="rounded"
                            color="primary"
                            style={{ margin: '0 20px', marginTop: window.innerWidth <= 1024 ? '8px' : '0px' }}
                            showFirstButton 
                            showLastButton
                        />
                        <div className="flex items-center my-2 justify-center lg:justify-start">
                            <TextField
                                type="number"
                                value={jumpToPage}
                                onChange={(e) => setJumpToPage(e.target.value)}
                                placeholder="Go to page"
                                style={{ width: window.innerWidth <= 1024 ? '25vw' : '5vw', marginLeft: '20px' }}
                            />
                            <Button onClick={handleJumpToPage} disabled={!jumpToPage} style={{ marginLeft: '10px' }}>
                                Go
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {currentProducts.length > 0 ? (
                    currentProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={addToCart}
                        />
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </>
    );
}
