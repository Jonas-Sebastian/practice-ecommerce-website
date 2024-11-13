import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

export default function ProductSort ({ sortOrder, setSortOrder }) {
    return (
        <div className="bg-white p-2 py-2 rounded shadow-sm" style={{ width: '100%', minWidth: '10vw' }}>
            <FormControl variant="outlined" fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    label="Sort By"
                >
                    <MenuItem value="product-id-asc">Product ID: Ascending</MenuItem>
                    <MenuItem value="product-id-desc">Product ID: Descending</MenuItem>
                    <MenuItem value="best-seller">Best Seller</MenuItem>
                    <MenuItem value="price-asc">Price: Low to High</MenuItem>
                    <MenuItem value="price-desc">Price: High to Low</MenuItem>
                    <MenuItem value="name-asc">Name: A to Z</MenuItem>
                    <MenuItem value="name-desc">Name: Z to A</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};