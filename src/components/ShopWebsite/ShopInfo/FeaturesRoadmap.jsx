import React, { useState } from 'react';
import { Box, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const FeatureItem = ({ title, isDone, details, date, isPreRoadmap }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getBackgroundColor = () => {
        if (isDone) return '#d4edda'; // Light green for done
        if (details.includes('Not implementing')) return '#f8d7da'; // Light red for never implemented
        return '#fff3cd'; // Light yellow for not done
    };

    return (
        <>
            <Paper sx={{ p: 2, m: 1, cursor: 'pointer', backgroundColor: getBackgroundColor() }} onClick={handleClickOpen}>
                <Typography variant="h6">
                    {title} {isDone ? '- Done' : ''}
                </Typography>
                {isDone && (
                    <Typography variant="body2" color="textSecondary">
                        {isPreRoadmap ? 'Completed before September 27, 2024' : `Completed on: ${date}`}
                    </Typography>
                )}
            </Paper>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <Typography>{details}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

const FeaturesRoadmap = () => {
    const features = {
        // Front End Shop Changes
        frontendShopChanges: [
            { title: 'Pre-Roadmap Features', isDone: true, details: 'All other frontend shop features completed prior to the creation features roadmap page.', date: 'September 27, 2024', isPreRoadmap: true },
            { title: 'Create Features Roadmap Page', isDone: true, details: 'A page to show all the finished features.', date: 'September 28, 2024' },
            { title: 'Improved Checkout Process', isDone: false, details: 'Streamlining the checkout experience.' },
            { title: 'Search and Filter Products', isDone: false, details: 'A basic search and filter functionality to help customers easily find products.' },
        ],

        // Front End Admin Changes
        frontendAdminChanges: [
            { title: 'Pre-Roadmap Features', isDone: true, details: 'All other admin management features completed prior to the creation features roadmap page.', date: 'September 27, 2024', isPreRoadmap: true },
            { title: 'Orders Viewing Page', isDone: false, details: 'Admin can view orders placed by customers.' },
            { title: 'Orders Management Page', isDone: false, details: 'Admin can manage the status of orders placed by customers.' },
            { title: 'Orders Email Notification', isDone: false, details: 'To be implemented along with Order Management. Order Status updates made by Admin will also send emails to customer.' },
            { title: 'Inventory Notification', isDone: false, details: 'This will notify the Admin on which products are low on stock. The amount of remaining stock at which the program would notify can be adjustable for each product.' },
            { title: 'Sales Reports', isDone: false,
                details: `
                  - **Total Sales:** Overall revenue generated during a specific period.
                  
                  - **Number of Orders:** Total count of completed orders.
                  
                  - **Average Order Value (AOV):** Average amount spent per order, calculated by dividing total sales by the number of orders.
                  
                  - **Top-Selling Products:** A list of products that generated the highest sales, helping identify popular items.
                  
                  - **Sales Trends:** Graphs showing sales over time (daily, weekly, or monthly) to identify patterns or peak sales periods.
                  
                  - **Customer Demographics:** Insights into who is purchasing (if available), such as location or device used.
                  
                  - **Refunds and Returns:** Data on any refunded or returned items, helping assess customer satisfaction.
                  
                  - **Conversion Rate:** Percentage of visitors who made a purchase, indicating how effectively the site is turning traffic into sales.
                `
              },
              { title: 'Traffic Reports', isDone: false, details: 'Using Google Analytics.' },
        ],

        // Back End Changes
        backendChanges: [
            { title: 'Pre-Roadmap Features', isDone: true, details: 'All other backend features completed prior to the creation features roadmap page.', date: 'September 27, 2024', isPreRoadmap: true },
            { title: 'Update Orders Backend', isDone: false, details: 'Update Orders Backend model to handle more order details.' },
        ],

        // Never Implement
        neverImplemented: [
            { title: 'Online Payment Integration', isDone: false, details: 'Ex. Stripe, Paymongo. Not implementing due to portfolio limitations.' },
        ],
    };

    const lastUpdatedDate = "Last updated: September 28, 2024"; // Update this date as needed

    return (
        <Box sx={{ p: 3, width: '70%', mx: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4" gutterBottom>Features Roadmap</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{lastUpdatedDate}</Typography>
            </Box>

            <Box sx={{ display: 'flex' }}>
                <Box sx={{ flex: 1, mr: 2 }}>
                    <Typography variant="h5">Frontend Shop Changes</Typography>
                    {features.frontendShopChanges.map((feature, index) => (
                        <FeatureItem key={index} {...feature} />
                    ))}
                </Box>
                <Box sx={{ flex: 1, mr: 2 }}>
                    <Typography variant="h5">Frontend Admin Management Changes</Typography>
                    {features.frontendAdminChanges.map((feature, index) => (
                        <FeatureItem key={index} {...feature} />
                    ))}
                </Box>
                <Box sx={{ flex: 1, mr: 2 }}>
                    <Typography variant="h5">Backend Changes</Typography>
                    {features.backendChanges.map((feature, index) => (
                        <FeatureItem key={index} {...feature} />
                    ))}
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h5">Never Implemented Features</Typography>
                    {features.neverImplemented.map((feature, index) => (
                        <FeatureItem key={index} {...feature} />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default FeaturesRoadmap;