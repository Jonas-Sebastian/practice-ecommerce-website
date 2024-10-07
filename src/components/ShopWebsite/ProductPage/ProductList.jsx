import React, { useEffect, useState } from 'react';
import ProductService from '../../../services/ProductService';
import ProductCard from './ProductCard';
import { useCart } from '../Context/CartContext';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

export default function ProductList() {
    const { handleAddToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await ProductService.getAllProducts();
                setProducts(response.data);
                setFilteredProducts(response.data); // Initialize filtered products
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('search');

        if (query) {
            const lowercasedQuery = query.toLowerCase();
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(lowercasedQuery)
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products); // Reset to all products if no query
        }
    }, [location.search, products]);

    const addToCart = (product) => {
        handleAddToCart(product);
        toast.success('Product added to cart!');
    };

    return (
        <div className="xl:w-3/4 lg:w-full w-full mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Products</h1>

            <div className="flex flex-col md:flex-row">
                {/* Toggle Button for Filter Visibility (Only on mobile) */}
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="bg-blue-500 text-white px-4 py-2 mb-4 rounded-md md:hidden"
                >
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>

                {/* Filter Component Box (Always visible on larger screens) */}
                <div className={`bg-gray-100 p-4 ${showFilters ? '' : 'hidden'} sm:block xl:w-1/6 lg:w-1/4 w-full mr-4 mb-4 md:mb-0`}>
                    <h2 className="text-xl font-semibold mb-4">Filters</h2>
                    {/* Add your filter component here */}
                </div>

                {/* Product Cards Box */}
                <div className={`bg-gray-100 p-4 ${showFilters ? 'w-full xl:w-5/6 lg:w-3/4' : 'w-full'}`}>
                    <div className="flex justify-center">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map(product => (
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
                    </div>
                </div>
            </div>
        </div>
    );
}
