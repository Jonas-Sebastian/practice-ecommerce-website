import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdminCategoryTable from './AdminCategoryTable';
import categoryServiceInstance from '../../../services/CategoryService';

export default function AdminCategoryList() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await categoryServiceInstance.getAllCategories();
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleEditCategory = (categoryId) => {
        console.log('Edit category:', categoryId);
        window.location.href = `/admin/categories/${categoryId}`;
    };

    const handleDeleteCategory = async (categoryId) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await categoryServiceInstance.deleteCategory(categoryId);
                fetchCategories(); // Refresh the category list after deletion
            } catch (error) {
                console.error('Error deleting category:', error);
            }
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, mt: 1 }}>
                <h2 style={{ marginLeft: '1vw' }}>Category List</h2>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => navigate('/admin/categories/add')}
                    sx={{ mr: '5vw' }}
                >
                    Add Category
                </Button>
            </Box>
            <AdminCategoryTable 
                categories={categories} 
                onEditCategory={handleEditCategory} 
                onDeleteCategory={handleDeleteCategory} 
            />
        </Box>
    );
    
}
