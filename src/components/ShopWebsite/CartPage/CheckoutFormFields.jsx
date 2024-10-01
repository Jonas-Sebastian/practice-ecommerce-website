import React from 'react';

const CheckoutFormFields = ({
    fullName,
    setFullName,
    email,
    setEmail,
    address,
    setAddress,
    shippingNotes,
    setShippingNotes,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    cardDetails,
    setCardDetails,
}) => {
    return (
        <div>
            <div className="mb-4">
                <label className="block mb-1" htmlFor="name">Full Name</label>
                <input
                    type="text"
                    id="name"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1" htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1" htmlFor="address">Shipping Address</label>
                <textarea
                    id="address"
                    className="w-full p-2 border border-gray-300 rounded"
                    rows="3"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
            </div>
            {/* Optional Shipping Notes */}
            <div className="mb-4">
                <label className="block mb-1" htmlFor="shippingNotes">Order/Shipping Notes (optional)</label>
                <textarea
                    id="shippingNotes"
                    className="w-full p-2 border border-gray-300 rounded"
                    rows="3"
                    value={shippingNotes}
                    onChange={(e) => setShippingNotes(e.target.value)}
                />
            </div>

            {/* Payment Method Selection */}
            <div className="mb-4">
                <label className="block mb-1">Payment Method</label>
                <select 
                    value={selectedPaymentMethod}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                >
                    <option value="">Select a payment method</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="gcash">GCash</option>
                    <option value="maya">Maya</option>
                    <option value="cod">Cash on Delivery</option>
                </select>
            </div>
        </div>
    );
};

export default CheckoutFormFields;
