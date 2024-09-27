import React from 'react';

export default function OrderSummary({ cartItems, totalPrice, isCheckout }) {
    return (
        <div className={`p-6 bg-gray-100 rounded-md shadow-sm mt-6 lg:mt-0 ${isCheckout ? 'lg:w-1/3 w-full' : 'w-full'}`}>
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
        </div>
    );
}
