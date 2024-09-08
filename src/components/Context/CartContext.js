import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : {};
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const handleAddToCart = (product) => {
        setCart(prevCart => {
            const updatedCart = { ...prevCart };
            if (updatedCart[product.id]) {
                updatedCart[product.id].quantity += 1;
            } else {
                updatedCart[product.id] = { ...product, quantity: 1 };
            }
            return updatedCart;
        });
    };

    const handleRemoveOne = (productId) => {
        setCart(prevCart => {
            const updatedCart = { ...prevCart };
            if (updatedCart[productId]?.quantity > 1) {
                updatedCart[productId].quantity -= 1;
            } else {
                delete updatedCart[productId];
            }
            return updatedCart;
        });
    };

    const handleRemoveAll = (productId) => {
        setCart(prevCart => {
            const updatedCart = { ...prevCart };
            delete updatedCart[productId];
            return updatedCart;
        });
    };
    
    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) return; // Prevent setting quantity less than 1
        setCart(prevCart => {
            const updatedCart = { ...prevCart };
            if (updatedCart[productId]) {
                updatedCart[productId].quantity = newQuantity;
            }
            return updatedCart;
        });
    };

    return (
        <CartContext.Provider value={{ cart, handleAddToCart, handleRemoveOne, handleRemoveAll, handleQuantityChange }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
