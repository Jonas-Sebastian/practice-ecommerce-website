import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

export default function ProductCard({ product, onAddToCart }) {
    return (
        <div className="
            border 
            p-4 
            rounded-lg 
            shadow-md 
            hover:shadow-lg 
            transition-shadow 
            duration-300 
            max-w-xs 
            sm:max-w-sm 
            md:max-w-md 
            lg:max-w-lg 
            xl:max-w-xl 
            mx-auto
        ">
            <div className="w-full h-64 flex items-center justify-center mb-4 bg-gray-100 rounded-md">
                <img
                    src={product.image}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain"
                />
            </div>  
            <h2 className="text-xl font-semibold mb-2 text-center">{product.name}</h2>
            <p className="text-lg font-bold mb-2 text-center">${parseFloat(product.price).toFixed(2)}</p>
            
            <div className="flex flex-col items-center space-y-2">
                <button
                    onClick={() => onAddToCart(product)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition flex items-center gap-2 w-9/12"
                    disabled={product.stock <= 0}
                >
                    <FaShoppingCart className="text-white" />
                    {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <Link
                    to={`/products/${product.id}`}
                    className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition block text-center w-9/12"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}
