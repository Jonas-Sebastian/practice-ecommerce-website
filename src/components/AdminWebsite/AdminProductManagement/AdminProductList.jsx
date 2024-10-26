import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import AdminProductTable from './AdminProductTable';
import productServiceInstance from '../../../services/ProductService';

export default function AdminProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await productServiceInstance.getAllProducts();
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleEditProduct = (productId) => {
        console.log('Edit product:', productId);
        window.location.href = `/admin/products/${productId}`;
    };

    const handleDeleteProduct = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await productServiceInstance.deleteProduct(productId);
                fetchProducts(); // Refresh the product list after deletion
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    return (
        <Box>
            <h2>Product List</h2>
            <AdminProductTable products={products} onEditProduct={handleEditProduct} onDeleteProduct={handleDeleteProduct} />
        </Box>
    );
}
