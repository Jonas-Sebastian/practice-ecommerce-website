import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import categoryServiceInstance from '../../../services/CategoryService';

export default function AdminCategoryAdd() {
    const navigate = useNavigate();
    const [category, setCategory] = useState({
        name: '',
        description: '',
    });
    const [nameError, setNameError] = useState(false);
    const [existingCategories, setExistingCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoryServiceInstance.getAllCategories();
                setExistingCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory((prevCategory) => ({
            ...prevCategory,
            [name]: value,
        }));
        if (name === 'name') {
            setNameError(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const isDuplicate = existingCategories.some(existingCategory => existingCategory.name === category.name);
        if (isDuplicate) {
            setNameError(true);
            return; // Prevent submission if there's a duplicate
        }

        try {
            await categoryServiceInstance.createCategory(category);
            alert('Category added successfully!');
            navigate('/admin/categories');
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSave} sx={{ maxWidth: '100vw', mx: 'auto', mt: 4 }}>
            <Typography variant="h4">Add New Category</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                <TextField
                    label="Category Name"
                    name="name"
                    value={category.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={nameError}
                    helperText={nameError ? 'This category name is already taken.' : ''}
                    sx={{ maxWidth: '25vw' }}
                />
                <TextField
                    label="Description"
                    name="description"
                    value={category.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={3}
                    sx={{ maxWidth: '25vw' }}
                />
            </Box>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, maxWidth: '10vw' }}>
                Add Category
            </Button>
        </Box>
    );
}
