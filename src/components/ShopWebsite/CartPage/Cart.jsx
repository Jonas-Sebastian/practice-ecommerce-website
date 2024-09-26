import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import CartItems from './CartItems';
import OrderSummary from './OrderSummary';

export default function Cart() {
    const { cart, handleRemoveAll, handleQuantityChange } = useCart();
    const cartItems = Object.values(cart);

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="flex justify-center p-6">
            <div className="flex flex-col lg:flex-row max-w-7xl w-full">
                {/* Cart Items Section */}
                <div className="flex-1 lg:max-w-3xl w-full border p-6 rounded-md shadow-sm lg:mr-6">
                    <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        cartItems.map(item => (
                            <CartItems
                                key={item.id}
                                item={item}
                                handleQuantityChange={handleQuantityChange}
                                handleRemoveAll={handleRemoveAll}
                            />
                        ))
                    )}
                    <Link to="/" className="mt-4 text-blue-500 underline">Continue Shopping</Link>
                </div>

                {/* Total Section */}
                <OrderSummary cartItems={cartItems} totalPrice={totalPrice} />
            </div>
        </div>
    );
}