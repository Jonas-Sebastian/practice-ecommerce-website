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
        // Get the search query from the URL
        const query = new URLSearchParams(location.search).get('search');

        // Filter products based on the search query
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
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Products</h1>
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
    );
}
