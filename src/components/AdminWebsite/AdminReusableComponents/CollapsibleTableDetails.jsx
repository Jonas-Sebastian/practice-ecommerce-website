import React from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

export default function CollapsibleTableDetails ({ title, columns, items }) {
    return (
        <Box>
            <Typography variant="subtitle1" sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                {title}
            </Typography>
            <Paper sx={{ border: '1px solid', borderColor: 'grey.300', borderRadius: 1, overflow: 'hidden', padding: 1, marginX: 1}}> 
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell 
                                    key={column.id} 
                                    sx={{ 
                                        width: column.width, 
                                        fontWeight: 'bold', 
                                        textAlign: column.align, 
                                        padding: 0
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item, index) => (
                            <TableRow key={index}>
                                {columns.map((column) => (
                                    <TableCell key={column.id} sx={{ padding: '4px' }} align={column.align}>
                                        {item[column.id]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Box>
    );
};