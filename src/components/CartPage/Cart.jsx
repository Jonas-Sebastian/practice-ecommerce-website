import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

export default function Cart() {
    const { cart, handleRemoveAll, handleQuantityChange } = useCart();
    const cartItems = Object.values(cart);

    // Calculate the total price
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
                            <div key={item.id} className="flex items-center border p-4 rounded-md shadow-sm mb-4">
                                <img src={item.image} alt={item.name} className="w-40 h-40 mr-8" />
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div className="text-left">
                                            <h2 className="text-lg font-semibold">{item.name}</h2>
                                            <p>Price: ${parseFloat(item.price).toFixed(2)}</p>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <p>Quantity:</p>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                min="1"
                                                className="w-16 text-center border rounded-md p-1"
                                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                                            />
                                            <button
                                                onClick={() => handleRemoveAll(item.id)}
                                                className="bg-red-600 text-white px-4 py-2 rounded"
                                            >
                                                Remove All
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    <Link to="/" className="mt-4 text-blue-500 underline">Continue Shopping</Link>
                </div>

                {/* Total Section */}
                <div className="lg:w-1/4 w-full p-6 bg-gray-100 rounded-md shadow-sm mt-6 lg:mt-0">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    {cartItems.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Items in Cart:</h3>
                            {cartItems.map(item => (
                                <div key={item.id} className="flex justify-between mb-2">
                                    <p>{item.name} (x{item.quantity})</p>
                                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="flex justify-between mb-2">
                        <p>Total Items:</p>
                        <p>{cartItems.reduce((total, item) => total + item.quantity, 0)}</p>
                    </div>
                    <div className="flex justify-between mb-4">
                        <p>Total Price:</p>
                        <p>${totalPrice.toFixed(2)}</p>
                    </div>
                    <button
                        //onClick={() => handleCheckout()}
                        className="w-full bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}
