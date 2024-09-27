import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CheckoutFormFields from './CheckoutFormFields';
import OrderSummary from './OrderSummary';
import PaymentMethodFields from './PaymentMethodFields'; // Import the new component

export default function Checkout() {
    const location = useLocation();
    const { cartItems, totalPrice } = location.state || { cartItems: [], totalPrice: 0 };
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [shippingNotes, setShippingNotes] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        paypalEmail: '',
        accountName: '',
        accountNumber: '',
        bankName: '',
        gcashNumber: '',
        mayaEmail: ''
    });
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add validation logic here
    };

    return (
        <div className="container mx-auto flex p-6">
            <div className="w-3/4 pr-6">
                <h1 className="text-2xl font-bold mb-4">Checkout</h1>
                <form onSubmit={handleSubmit}>
                    <CheckoutFormFields 
                        fullName={fullName}
                        setFullName={setFullName}
                        email={email}
                        setEmail={setEmail}
                        address={address}
                        setAddress={setAddress}
                        shippingNotes={shippingNotes}
                        setShippingNotes={setShippingNotes}
                        selectedPaymentMethod={selectedPaymentMethod}
                        setSelectedPaymentMethod={setSelectedPaymentMethod}
                    />
                    
                    {/* Payment Method Subfields */}
                    <PaymentMethodFields 
                        selectedPaymentMethod={selectedPaymentMethod} 
                        cardDetails={cardDetails} 
                        setCardDetails={setCardDetails} 
                    />

                    {/* Terms and Conditions Checkbox */}
                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            className="mr-2"
                        />
                        <label htmlFor="terms" className="text-sm">
                            I agree to the terms and conditions
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Complete Purchase
                    </button>
                </form>
            </div>

            {/* Order Summary */}
            <OrderSummary cartItems={cartItems} totalPrice={totalPrice} isCheckout={true} />
        </div>
    );
}
