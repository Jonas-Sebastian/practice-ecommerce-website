import React, { useState } from 'react';
import ProductList from './ProductList';
import ProductFilter from './ProductFilter';
import './ProductPage.css';

export default function ProductPage() {
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategories(prev => {
            if (prev.includes(categoryId)) {
                return prev.filter(id => id !== categoryId);
            } else {
                return [...prev, categoryId];
            }
        });
    };

    return (
        <div className="xl:w-3/4 lg:w-full w-full mx-auto py-8 custom-product-page-width">
            <h1 className="text-2xl font-bold mb-6">Products</h1>

            <div className="flex flex-col md:flex-row">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="bg-blue-500 text-white px-4 py-2 mb-4 rounded-md md:hidden"
                >
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>

                <div className={`bg-gray-100 p-4 ${showFilters ? '' : 'hidden'} sm:block xl:w-1/6 lg:w-1/4 md:w-1/3 w-full custom-filter-width mr-4 mb-4 md:mb-0`}>
                    <h2 className="text-xl font-semibold mb-4">Filters</h2>
                    <ProductFilter 
                        onCategoryChange={handleCategoryChange} 
                        selectedCategories={selectedCategories} 
                    />
                </div>

                <div className={`bg-gray-100 p-4 ${showFilters ? 'w-full xl:w-5/6 lg:w-3/4' : 'w-full'}`}>
                    <ProductList selectedCategories={selectedCategories} />
                </div>
            </div>
        </div>
    );
}
