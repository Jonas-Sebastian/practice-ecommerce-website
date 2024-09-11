import React from 'react';

export default function OrderSummary({ cartItems, totalPrice }) {
    return (
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
            <button className="w-full bg-green-500 text-white px-4 py-2 rounded">
                Checkout
            </button>
        </div>
    );
}