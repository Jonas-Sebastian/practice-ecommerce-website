import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Container, InputBase } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/SearchRounded';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import productServiceInstance from '../../../services/ProductService';
import './Header.css';

export default function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const handleSearchChange = async (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        if (query.length > 2) {
            try {
                const response = await productServiceInstance.searchProducts(query);
                setSearchResults(response.data); // Set results from API
            } catch (error) {
                console.error("Search error:", error);
            }
        } else {
            setSearchResults([]); // Clear search results when query is short
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && searchQuery) {
            navigate(`/products?search=${searchQuery}`); // Redirect to filtered product page
        }
    };

    const handleResultClick = (productId) => {
        navigate(`/products/${productId}`); // Navigate to product details
        setSearchResults([]); // Clear suggestions
    };

    return (
        <AppBar position="sticky" color="primary">
            <Container maxWidth="xl">
                <Toolbar className="toolbar">
                    <Typography variant="h5" className="shop-title" style={{ marginRight: '5vw', fontFamily: 'Montserrat' }}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            MyShop
                        </Link>
                    </Typography>
                    <div className="search-bar-container" style={{ position: 'relative', marginRight: '2vw' }}>
                        <SearchIcon 
                            style={{ 
                                position: 'absolute', 
                                left: '10px', 
                                top: '50%', 
                                transform: 'translateY(-50%)', 
                                color: '#aaa', 
                                zIndex: 1 
                            }} 
                        />
                        <InputBase
                            className="search-bar"
                            placeholder="Search…"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onKeyDown={handleKeyDown}
                            style={{ paddingLeft: '40px' }}
                        />
                        {searchResults.length > 0 && (
                            <div className="search-suggestions">
                                {searchResults.map((product) => (
                                    <div 
                                        key={product.id} 
                                        onMouseDown={() => handleResultClick(product.id)} 
                                        style={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            padding: '8px 16px', 
                                            cursor: 'pointer', 
                                            borderBottom: '1px solid #ddd' 
                                        }}
                                    >
                                        <img 
                                            src={product.image} 
                                            alt={product.name} 
                                            style={{ width: '40px', height: '40px', marginRight: '16px', borderRadius: '4px' }} 
                                        />
                                        <div>
                                            <div style={{ fontWeight: 'bold' }}>{product.name}</div>
                                            <div style={{ color: '#888' }}>${product.price}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="nav-links" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <NavLink to="/shop" className="nav-link">
                            <Button className="nav-button" color="inherit">Shop</Button>
                        </NavLink>
                        <NavLink to="/contact" className="nav-link">
                            <Button className="nav-button" color="inherit">Contact</Button>
                        </NavLink>
                        <NavLink to="/about" className="nav-link">
                            <Button className="nav-button" color="inherit">About</Button>
                        </NavLink>
                        <NavLink to="/roadmap" className="nav-link">
                            <Button className="nav-button" color="inherit" style={{ lineHeight: 1.3  }}>Features Roadmap</Button>
                        </NavLink>
                    </div>
                    <Link to="/cart">
                        <IconButton edge="end" color="inherit" style={{ marginLeft: '16px' }}>
                            <ShoppingCartIcon />
                        </IconButton>
                    </Link>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
