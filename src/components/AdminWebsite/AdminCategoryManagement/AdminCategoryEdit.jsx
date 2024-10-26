import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import categoryServiceInstance from '../../../services/CategoryService';

export default function AdminCategoryEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState({
        name: '',
        description: '',
    });

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await categoryServiceInstance.getCategory(id);
                setCategory(response.data);
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };

        fetchCategory();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory((prevCategory) => ({
            ...prevCategory,
            [name]: value,
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await categoryServiceInstance.updateCategory(id, category);
            navigate('/admin/categories');
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSave} sx={{ maxWidth: '100vw', mx: 'auto', mt: 4 }}>
            <Typography variant="h4">Edit Category</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                <TextField
                    label="Name"
                    name="name"
                    value={category.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
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
                Save Changes
            </Button>
        </Box>
    );
}
