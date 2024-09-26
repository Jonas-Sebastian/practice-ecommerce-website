import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, IconButton } from '@mui/material';
import ZoomInMapRounded from '@mui/icons-material/ZoomInMapRounded';
import ZoomOutMapRounded from '@mui/icons-material/ZoomOutMapRounded';
import productServiceInstance from '../../../services/ProductService';

export default function AdminProductEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        category: '',
        price: '',
        stock: '',
        image: '',
        description: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const [isImageExpanded, setIsImageExpanded] = useState(false);
    const [isPreviewImageExpanded, setIsPreviewImageExpanded] = useState(false);
    const [imageUploaded, setImageUploaded] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await productServiceInstance.getProduct(id);
                setProduct(response.data);
                setPreviewImage(response.data.image);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreviewImage(objectUrl);
            setImageUploaded(true);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('category', product.category);
        formData.append('price', product.price);
        formData.append('stock', product.stock);
        formData.append('description', product.description);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            await productServiceInstance.updateProduct(id, formData);
            navigate('/admin/products');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSave} sx={{ maxWidth: '100vw', mx: 'auto', mt: 4 }}>
            <Typography variant="h4">Edit Product</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                <TextField
                    label="Name"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
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
                    <Typography>{imageUploaded ? 'Old Image:' : 'Current Image:'}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {product.image ? (
                            <Box sx={{ textAlign: 'center', position: 'relative' }}>
                                <img 
                                    src={imageUploaded ? product.image : previewImage} 
                                    alt={imageUploaded ? product.name : 'No image uploaded'} 
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
                {imageUploaded && previewImage && (
                    <Box>
                        <Typography>New Image:</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ textAlign: 'center', position: 'relative' }}>
                                <img 
                                    src={previewImage} 
                                    alt="New Preview" 
                                    style={{ 
                                        width: isPreviewImageExpanded ? '400px' : '200px', 
                                        height: isPreviewImageExpanded ? '400px' : '200px', 
                                        transition: 'width 0.3s, height 0.3s' 
                                    }} 
                                />
                                <IconButton 
                                    onClick={() => setIsPreviewImageExpanded(!isPreviewImageExpanded)} 
                                    sx={{ position: 'absolute', bgcolor: 'white', borderRadius: '50%', boxShadow: 2, top: 0, right: 0 }}
                                >
                                    {isPreviewImageExpanded ? <ZoomInMapRounded fontSize="large" /> : <ZoomOutMapRounded fontSize="large" />}
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                )}
            </Box>
            <Button variant="outlined" component="label" sx={{ mb: 2, pt: 2, pb: 2 }}>
                Upload New Image
                <input type="file" hidden onChange={handleImageChange} />
            </Button>
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                <TextField
                    label="Category"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    sx={{ maxWidth: '25vw' }}
                />
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
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, maxWidth: '10vw' }}>
                    Save Changes
                </Button>
            </Box>
        </Box>
    );    
}
