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
        ],

        // Front End Admin Changes
        frontendAdminChanges: [
            { title: 'Pre-Roadmap Features', isDone: true, details: 'All other admin management features completed prior to the creation features roadmap page.', date: 'September 27, 2024', isPreRoadmap: true },
            { title: 'Orders Viewing Page', isDone: false, details: 'Admin can view orders placed by customers.' },
        ],

        // Back End Changes
        backendChanges: [
            { title: 'Pre-Roadmap Features', isDone: true, details: 'All other backend features completed prior to the creation features roadmap page.', date: 'September 27, 2024', isPreRoadmap: true },
            { title: 'Update Orders Backend', isDone: false, details: 'Update Orders Backend model to handle more order details.' },
        ],

        // Never Implement
        neverImplemented: [
            { title: 'Stripe Online Payment Integration', isDone: false, details: 'Not implementing due to portfolio limitations.' },
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
