import React from 'react';

const PaymentMethodFields = ({ selectedPaymentMethod, cardDetails, setCardDetails }) => {
    return (
        <div>
            {selectedPaymentMethod === 'credit_card' && (
                <div>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="cardNumber">Card Number</label>
                        <input
                            type="text"
                            id="cardNumber"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={cardDetails.cardNumber}
                            onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="expiryDate">Expiry Date (MM/YY)</label>
                        <input
                            type="text"
                            id="expiryDate"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={cardDetails.expiryDate}
                            onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="cvv">CVV</label>
                        <input
                            type="text"
                            id="cvv"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                            required
                        />
                    </div>
                </div>
            )}

            {selectedPaymentMethod === 'paypal' && (
                <div>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="paypalEmail">PayPal Email</label>
                        <input
                            type="email"
                            id="paypalEmail"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={cardDetails.paypalEmail}
                            onChange={(e) => setCardDetails({ ...cardDetails, paypalEmail: e.target.value })}
                            required
                        />
                    </div>
                </div>
            )}

            {selectedPaymentMethod === 'bank_transfer' && (
                <div>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="accountName">Account Name</label>
                        <input
                            type="text"
                            id="accountName"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={cardDetails.accountName}
                            onChange={(e) => setCardDetails({ ...cardDetails, accountName: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="accountNumber">Account Number</label>
                        <input
                            type="text"
                            id="accountNumber"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={cardDetails.accountNumber}
                            onChange={(e) => setCardDetails({ ...cardDetails, accountNumber: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="bankName">Bank Name</label>
                        <input
                            type="text"
                            id="bankName"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={cardDetails.bankName}
                            onChange={(e) => setCardDetails({ ...cardDetails, bankName: e.target.value })}
                            required
                        />
                    </div>
                </div>
            )}

            {(selectedPaymentMethod === 'gcash' || selectedPaymentMethod === 'maya') && (
                <div className="mb-4">
                    <p>QR code will be generated after you place the order.</p>
                </div>
            )}

            {selectedPaymentMethod === 'cod' && (
                <div className="mb-4">
                    <p>Cash on Delivery selected. No additional information needed.</p>
                </div>
            )}
        </div>
    );
};

export default PaymentMethodFields;
