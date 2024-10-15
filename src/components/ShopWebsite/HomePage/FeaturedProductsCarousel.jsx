import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Box, Typography, CircularProgress } from '@mui/material';
import ProductService from '../../../services/ProductService';
import orderService from '../../../services/OrderService';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function FeaturedProductsCarousel() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        const fetchBestSellers = async () => {
            try {
                const orders = await orderService.getOrders();
                const productSales = {};
        
                orders.forEach(order => {
                if (order.order_items) {
                    order.order_items.forEach(item => {
                    const { product, quantity } = item;
                    productSales[product] = (productSales[product] || 0) + quantity;
                    });
                }
                });
        
                console.log('Product Sales Tally:', productSales);
        
                // Get the top 10 best-selling product IDs
                const bestSellingProductIds = Object.entries(productSales)
                .sort(([, a], [, b]) => b - a) // Sort by quantity
                .slice(0, 10)
                .map(([id]) => parseInt(id));
        
                const productsResponse = await ProductService.getAllProducts();

                const bestSellingProducts = productsResponse.data
                .filter(product => bestSellingProductIds.includes(product.id))
                .map(product => ({
                    ...product,
                    sales: productSales[product.id] || 0,
                }))
                .sort((a, b) => b.sales - a.sales); // Sort by sales in descending order
        
                console.log('Best Selling Products:', bestSellingProducts);
        
                setFeaturedProducts(bestSellingProducts);
            } catch (error) {
                console.error('Error fetching best-selling products:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchBestSellers();
    }, []);
    
    

    if (loading) {
        return (
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
            <CircularProgress />
        </Box>
        );
    }

    if (featuredProducts.length === 0) {
        return (
        <Box textAlign="center" sx={{ mt: 5 }}>
            <Typography variant="h6">No featured products available.</Typography>
        </Box>
        );
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        beforeChange: () => setIsDragging(true),
        afterChange: () => setIsDragging(false),
        responsive: [
            { // Smaller/Old Monitors
                breakpoint: 1366,
                settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                }
            },
            { // Larger Tablets, Large Foldables
                breakpoint: 1280,
                settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                }
            }, 
            { // Tablet
                breakpoint: 800,
                settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                }
            },
            { // Mobile
                breakpoint: 600,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                }
            }
        ],
    };

    const handleMouseEnter = (index) => {
        if (!isDragging) {
        setHoveredIndex(index);
        }
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const handleClick = (productId) => {
        if (!isDragging && hoveredIndex !== null) {
        window.location.href = `/products/${productId}`;
        }
    };

    return (
        <Box sx={{ mt: 5, mb: 5, maxWidth: '80vw', margin: '0 auto' }}>
        <Typography variant="h4" align="center" sx={{ marginY: 4 }}>
            Featured Products
        </Typography>
        <Slider {...settings}>
            {featuredProducts.map((product, index) => (
            <Box
                key={product.id}
                sx={{
                padding: '2%',
                flexShrink: 0,
                }}
            >
                <Box
                sx={{
                    height: '25vh',
                    position: 'relative',
                    textAlign: 'center',
                    overflow: 'hidden',
                    borderRadius: '24px',
                    cursor: !isDragging ? 'pointer' : 'default',
                    filter: hoveredIndex === null || hoveredIndex === index ? 'none' : 'brightness(0.5)',
                    opacity: hoveredIndex === index ? 1 : 0.7,
                    transition: 'filter 0.3s ease, opacity 0.3s ease',
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(product.id)}
                >
                <img
                    src={product.image}
                    alt={product.name}
                    style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    }}
                />
                <Box
                    sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '50%',
                    background: 'linear-gradient(to top, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0))',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    padding: 2,
                    }}
                >
                    <Typography variant="h6" sx={{ color: '#000', textAlign: 'center' }}>
                    {product.name}
                    </Typography>
                </Box>
                </Box>
            </Box>
            ))}
        </Slider>
        </Box>
    );
};