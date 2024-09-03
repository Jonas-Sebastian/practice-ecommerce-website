import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
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
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-lg font-bold mb-2">${product.price}</p>
            <Link
                to={`/products/${product.id}`}
                className="text-blue-500 hover:underline text-sm"
            >
                View Details
            </Link>
        </div>
    );
}
