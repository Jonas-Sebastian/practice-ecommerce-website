import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Container } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink, Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
    return (
        <AppBar position="sticky" color="primary">
            <Container maxWidth="xl">
                <Toolbar className="toolbar" >
                    <Typography variant="h5" className="shop-title" style={{ flexGrow: 1, fontFamily: 'Montserrat' }}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            MyShop
                        </Link>
                    </Typography>
                    <NavLink to="/shop" className="nav-link">
                        <Button className="nav-button" color="inherit">Shop</Button>
                    </NavLink>
                    <NavLink to="/contact" className="nav-link">
                        <Button className="nav-button" color="inherit">Contact</Button>
                    </NavLink>
                    <NavLink to="/about" className="nav-link">
                        <Button className="nav-button" color="inherit">About</Button>
                    </NavLink>
                    <Link to="/cart">
                        <IconButton edge="end" color="inherit">
                            <ShoppingCartIcon />
                        </IconButton>
                    </Link>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
