import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';
import ProductFilter from './ProductFilter';
import ProductService from '../../../services/ProductService';
import './ProductPage.css';

export default function ProductPage() {
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [maxPrice, setMaxPrice] = useState(100);
    const [filteredPriceRange, setFilteredPriceRange] = useState([0, 100]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await ProductService.getAllProducts();
                const prices = data.map(product => product.price);
                const max = Math.max(...prices);
                setMaxPrice(max);
                setFilteredPriceRange([0, max]);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const toggleCategory = (categoryId) => {
        setSelectedCategories(prev => 
            prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]
        );
    };

    const handlePriceChange = (newMinPrice, newMaxPrice) => {
        setFilteredPriceRange([newMinPrice, newMaxPrice]);
    };

    return (
        <div className="xl:w-3/4 lg:w-full w-full mx-auto py-8 custom-product-page-width">
            <h1 className="text-2xl font-bold mb-2 p-4">Products</h1>

            <div className="flex flex-col md:flex-row">
                <button
                    onClick={() => setShowFilters(prev => !prev)}
                    className="bg-blue-500 text-white px-4 py-2 mb-4 rounded-md md:hidden w-4/5 self-center"
                >
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>

                <div className={`bg-gray-100 p-4 ${showFilters ? '' : 'hidden'} sm:block xl:w-1/6 lg:w-1/4 md:w-1/3 w-full custom-filter-width mr-4 mb-4 md:mb-0`}>
                    <h2 className="text-xl font-semibold mb-4">Filters</h2>
                    <ProductFilter 
                        onCategoryChange={toggleCategory} 
                        selectedCategories={selectedCategories}
                        onPriceChange={handlePriceChange}
                        maxPrice={maxPrice}
                    />
                </div>

                <div className={`bg-gray-100 p-4 ${showFilters ? 'w-full xl:w-5/6 lg:w-3/4' : 'w-full'}`}>
                    <ProductList 
                        selectedCategories={selectedCategories} 
                        filteredMinPrice={filteredPriceRange[0]} 
                        filteredMaxPrice={filteredPriceRange[1]} 
                    />
                </div>
            </div>
        </div>
    );
}
