import React, { useEffect, useState } from 'react';
import categoryService from '../../../services/CategoryService';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';

export default function ProductFilter({ onCategoryChange, selectedCategories, maxPrice, onPriceChange }) { 
    const [categories, setCategories] = useState([]);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
    const [isPriceOpen, setIsPriceOpen] = useState(true);
    const [priceRange, setPriceRange] = useState([0, maxPrice]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await categoryService.getAllCategories();
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch categories', error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        setPriceRange([0, maxPrice]);
    }, [maxPrice]);

    const toggleVisibility = setter => () => setter(prev => !prev);
    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
        onPriceChange?.(newValue[0], newValue[1]);
    };

    return (
        <div className="border rounded-lg shadow-md p-4 bg-white">
            <h2 className="text-xl font-bold mb-2 cursor-pointer text-gray-700 flex justify-between items-center" onClick={toggleVisibility(setIsCategoriesOpen)}>
                <span>Categories</span>
                {isCategoriesOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </h2>
            {isCategoriesOpen && (
                <ul className="my-2">
                    {categories.map(({ id, name }) => (
                        <li key={id} className="flex items-center mb-1 ml-2">
                            <Checkbox
                                checked={selectedCategories.includes(id)}
                                onChange={() => onCategoryChange(id)}
                                color="primary"
                                sx={{ padding: '1px' }}
                            />
                            <span className="ml-1 text-gray-600 text-xs md:text-sm">{name}</span>
                        </li>
                    ))}
                </ul>
            )}
            <Divider className="my-4" />
            <h2 className="text-xl font-bold my-2 cursor-pointer text-gray-700 flex justify-between items-center" onClick={toggleVisibility(setIsPriceOpen)}>
                <span>Price Range</span>
                {isPriceOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </h2>
            {isPriceOpen && (
                <div>
                    <Slider
                        value={priceRange}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={maxPrice}
                    />
                    <div className="flex justify-between text-gray-600">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                    </div>
                </div>
            )}
        </div>
    );
}