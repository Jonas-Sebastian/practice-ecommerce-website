import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Container, InputBase } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/SearchRounded';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearchChange = (event) => {

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
                            style={{ paddingLeft: '40px' }}
                        />
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
