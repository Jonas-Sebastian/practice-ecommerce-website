import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, IconButton, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import ZoomInMapRounded from '@mui/icons-material/ZoomInMapRounded';
import ZoomOutMapRounded from '@mui/icons-material/ZoomOutMapRounded';
import productServiceInstance from '../../../services/ProductService';
import categoryServiceInstance from '../../../services/CategoryService';

export default function AdminProductAdd() {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        category: '',
        price: '',
        stock: '',
        description: '',
        available: true
    });
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const [isImageExpanded, setIsImageExpanded] = useState(false);
    const [categories, setCategories] = useState([]);
    const [existingProducts, setExistingProducts] = useState([]);
    const [nameError, setNameError] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoryServiceInstance.getAllCategories();
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await productServiceInstance.getAllProducts();
                setExistingProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchCategories();
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (name === 'name') {
            setNameError(false); // Reset error when typing
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreviewImage(objectUrl);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const isDuplicate = existingProducts.some(existingProduct => existingProduct.name === product.name);
        if (isDuplicate) {
            setNameError(true);
            return; // Prevent submission if there's a duplicate
        }

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('category', product.category);
        formData.append('price', product.price);
        formData.append('stock', product.stock);
        formData.append('description', product.description);
        formData.append('available', product.available);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            await productServiceInstance.createProduct(formData);
            alert('Product added successfully!');
            navigate('/admin/products');
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSave} sx={{ maxWidth: '100vw', mx: 'auto', mt: 4 }}>
            <Typography variant="h4">Add New Product</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                <TextField
                    label="Name"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={nameError}
                    helperText={nameError ? 'This product name is already taken.' : ''}
                    sx={{ maxWidth: '25vw' }}
                />
                <TextField
                    label="Description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={3}
                    sx={{ maxWidth: '25vw' }}
                />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ mr: 4 }}>
                    <Typography>Image:</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {previewImage ? (
                            <Box sx={{ textAlign: 'center', position: 'relative' }}>
                                <img 
                                    src={previewImage} 
                                    alt="Preview" 
                                    style={{ 
                                        width: isImageExpanded ? '400px' : '200px', 
                                        height: isImageExpanded ? '400px' : '200px', 
                                        transition: 'width 0.3s, height 0.3s' 
                                    }} 
                                />
                                <IconButton 
                                    onClick={() => setIsImageExpanded(!isImageExpanded)} 
                                    sx={{ position: 'absolute', bgcolor: 'white', borderRadius: '50%', boxShadow: 2, top: 0, right: 0 }}
                                >
                                    {isImageExpanded ? <ZoomInMapRounded fontSize="large" /> : <ZoomOutMapRounded fontSize="large" />}
                                </IconButton>
                            </Box>
                        ) : (
                            <Typography>No image uploaded.</Typography>
                        )}
                    </Box>
                </Box>
            </Box>
            <Button variant="outlined" component="label" sx={{ mb: 2, pt: 2, pb: 2 }}>
                Upload Image
                <input type="file" hidden onChange={handleImageChange} />
            </Button>
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                <TextField
                    label="Category"
                    name="category"
                    select
                    value={product.category}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    sx={{ maxWidth: '25vw' }}
                >
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Price"
                    name="price"
                    type="number"
                    value={product.price}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    sx={{ maxWidth: '25vw' }}
                />
                <TextField
                    label="Stock"
                    name="stock"
                    type="number"
                    value={product.stock}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    sx={{ maxWidth: '25vw' }}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="available"
                            checked={product.available}
                            onChange={handleChange}
                        />
                    }
                    label="Available"
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, maxWidth: '10vw' }}>
                    Add Product
                </Button>
            </Box>
        </Box>
    );
}
