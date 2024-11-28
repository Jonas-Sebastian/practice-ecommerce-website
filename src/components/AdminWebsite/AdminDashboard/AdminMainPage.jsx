import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, Sankey, Tooltip } from 'recharts';
import productServiceInstance from '../../../services/ProductService';
import categoryServiceInstance from '../../../services/CategoryService';
import orderServiceInstance from '../../../services/OrderService';
import CustomNode from './CustomNode';

export default function AdminMainPage() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [categorySalesData, setCategorySalesData] = useState([]);
    const [totalSales, setTotalSales] = useState(0);

    // Fetch Categories
    useEffect(() => {
        const fetchCategories = async () => {
        try {
            const response = await categoryServiceInstance.getAllCategories();
            setCategories(response.data || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
        };
        fetchCategories();
    }, []);

    // Fetch Products
    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const response = await productServiceInstance.getAllProducts();
            setProducts(response.data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        };
        fetchProducts();
    }, []);

    // Fetch Orders
    useEffect(() => {
        const fetchOrders = async () => {
        try {
            const response = await orderServiceInstance.getOrders();
            setOrders(response || []);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
        };
        fetchOrders();
    }, []);

    // Calculate Category Sales Data
    useEffect(() => {
        if (categories.length > 0 && products.length > 0 && orders.length > 0) {
        let totalSalesAmount = 0;
        const categorySales = categories.map(category => {
            const categoryProducts = products.filter(product => product.category === category.id);
            let categoryTotal = 0;

            categoryProducts.forEach(product => {
            orders.forEach(order => {
                const orderItem = order.order_items.find(item => item.product === product.id);
                if (orderItem) {
                const quantity = parseInt(orderItem.quantity, 10) || 0;
                const price = parseFloat(orderItem.price) || 0;

                categoryTotal += quantity * price;
                }
            });
            });

            totalSalesAmount += categoryTotal;

            return {
            name: category.name,
            value: categoryTotal
            };
        });

        setCategorySalesData(categorySales);
        setTotalSales(totalSalesAmount);
        }
    }, [categories, products, orders]);

    // Prepare Sankey Data (Nodes and Links)
    const sankeyData = categorySalesData.length > 0 ? {
        nodes: [
        { name: 'Total Sales' },
        ...categorySalesData.map(category => ({ name: category.name }))
        ],
        links: categorySalesData
        .map((category, index) => {
            const value = category.value;

            if (value === 0) {
            return null;
            }

            return {
            source: 0,
            target: index + 1,
            value: value
            };
        })
        .filter(link => link !== null)
    } : { nodes: [], links: [] };
    
    const styles = {
        paperContainer: {
            backgroundColor: '#f4f7fa',
            padding: '5vh',
            boxShadow: '0 6px 4px rgba(0, 0, 0, 0.2)', 
            borderRadius: '1vh',
            marginTop: '2vh',
            overflow: 'hidden',
            border: '1px solid #e0e0e0',
            width: '50vw',
            height: '40vh',
        },
    };
    
    return (
        <div style={{ padding: '2vh' }}>
            <h2>Category Sales Visualization</h2>
            <div className="paper-container" style={styles.paperContainer}>
                {sankeyData.links.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                    <Sankey
                    data={sankeyData}
                    node={<CustomNode />}
                    nodePadding={40}
                    margin={{ left: 50, right: 100, top: 0, bottom: 50 }}
                    link={{ stroke: '#70b8ff' }}
                    >
                    <Tooltip />
                    </Sankey>
                </ResponsiveContainer>
                ) : (
                <p>No data to display.</p>
                )}
                <h3>Total Sales: ${totalSales}</h3>
            </div>
        </div>
    );
}    