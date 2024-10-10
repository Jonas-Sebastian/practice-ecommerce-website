import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';

export default function DataLoadingMessage({ open, handleClose }) {
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" disableEscapeKeyDown>
            <DialogContent 
                style={{
                    textAlign: 'center',
                    padding: '40px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '10vw',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                }} 
                onClick={handleClose}
            >
                <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                    <CircularProgress size={24} style={{ marginRight: '16px' }} />
                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                        Loading Data...
                    </Typography>
                </Box>
                <Typography variant="body1" style={{ marginTop: '10px' }}>
                    It may take a minute for the backend data to load due to hosting limitations on Render.
                </Typography>
                <Typography variant="body2" style={{ marginTop: '10px', color: '#666' }}>
                    Click anywhere to dismiss this message.
                </Typography>
            </DialogContent>
        </Dialog>
    );
};