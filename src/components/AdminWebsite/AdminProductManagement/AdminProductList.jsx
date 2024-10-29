import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import AdminProductTable from './AdminProductTable';
import productServiceInstance from '../../../services/ProductService';
import categoryServiceInstance from '../../../services/CategoryService';
import { useNavigate } from 'react-router-dom';

export default function AdminProductList() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsResponse, categoriesResponse] = await Promise.all([
                    productServiceInstance.getAllProducts(),
                    categoryServiceInstance.getAllCategories(),
                ]);
                setProducts(productsResponse.data);
                setCategories(categoriesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleEditProduct = (productId) => {
        console.log('Edit product:', productId);
        navigate(`/admin/products/${productId}`);
    };

    const handleDeleteProduct = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await productServiceInstance.deleteProduct(productId);
                setProducts((prev) => prev.filter(product => product.id !== productId));
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    return (
        <Box>
            <h2>Product List</h2>
            <AdminProductTable 
                products={products} 
                categories={categories} 
                onEditProduct={handleEditProduct} 
                onDeleteProduct={handleDeleteProduct} 
            />
        </Box>
    );
}
