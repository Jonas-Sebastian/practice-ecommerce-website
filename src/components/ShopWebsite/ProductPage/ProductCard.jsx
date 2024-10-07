import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

export default function ProductCard({ product, onAddToCart }) {
    return (
        <div className="
            bg-white
            hover:bg-gray-300 
            text-black
            p-4 
            rounded-lg 
            shadow-md 
            hover:shadow-lg 
            transition-shadow 
            duration-300 
            flex 
            flex-col 
            h-full 
            max-w-xs
        ">
            <div className="w-full h-64 flex items-center justify-center mb-4 rounded-md overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                />
            </div>  
            <h2 className="text-xl font-semibold mb-2 text-center">{product.name}</h2>
            <p className="text-lg font-bold mb-2 text-center">${parseFloat(product.price).toFixed(2)}</p>
            
            <div className="flex flex-col items-center space-y-2">
                <button
                    onClick={() => onAddToCart(product)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition w-9/12"
                    disabled={product.stock <= 0}
                >
                    <div className="flex items-center justify-center gap-2">
                        <FaShoppingCart className="text-white" />
                        <span className="text-center">{product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                    </div>
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
