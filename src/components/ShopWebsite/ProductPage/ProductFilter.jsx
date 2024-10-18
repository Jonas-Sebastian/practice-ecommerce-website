import React, { useEffect, useState } from 'react';
import categoryService from '../../../services/CategoryService';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';

export default function ProductFilter({ onCategoryChange, selectedCategories }) { 
    const [categories, setCategories] = useState([]);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoryService.getAllCategories();
                setCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch categories', error);
            }
        };
        fetchCategories();
    }, []);

    const toggleCategories = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div className="border rounded-lg shadow-md p-4 bg-white">
            <h2 className="text-xl custom-category-text-font-size font-bold mb-2 cursor-pointer text-gray-700 flex justify-between items-center" onClick={toggleCategories}>
                <span>Categories</span>
                {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </h2>
            {isOpen && (
                <ul className="mt-2">
                    {categories.map(category => (
                        <li key={category.id} className="flex items-center mb-1 ml-2">
                            <Checkbox
                                checked={selectedCategories.includes(category.id)}
                                onChange={() => onCategoryChange(category.id)}
                                color="primary"
                                sx={{ padding: '1px' }}
                            />
                            <span className="ml-1 text-gray-600 text-xs md:text-sm">{category.name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
