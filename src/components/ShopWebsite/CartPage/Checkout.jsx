import React, { useState } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import CheckoutFormFields from './CheckoutFormFields';
import OrderSummary from './OrderSummary';
import PaymentMethodFields from './PaymentMethodFields';
import OrderService from '../../../services/OrderService';
import { useCart } from '../Context/CartContext';

const Popup = ({ message, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleOverlayClick = () => {
        setIsVisible(false); // Start fade-out animation
        setTimeout(onClose, 300); // Delay closing until animation completes
    };

    const handlePopupClick = (event) => {
        event.stopPropagation(); // Prevent closing when clicking inside the popup
    };

    return (
        <div 
            className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
            onClick={handleOverlayClick}
        >
            <div 
                className={`bg-white p-4 rounded shadow-lg transition-transform duration-300 ${isVisible ? 'transform translate-y-0' : 'transform translate-y-10 opacity-0'}`} 
                onClick={handlePopupClick}
            >
                <p className="text-lg">{message}</p>
            </div>
        </div>
    );
};

export default function Checkout() {
    const { handleClearCart } = useCart();
    const location = useLocation();
    const navigate = useNavigate();
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
    });
    const [isChecked, setIsChecked] = useState(false);
    const [popupMessage, setPopupMessage] = useState(''); // State for popup message

    // Redirect if the cart is empty
    if (!cartItems || cartItems.length === 0) {
        return <Navigate to="/cart" replace />;
    }

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create order data
        const orderData = {
            customer_name: fullName,
            customer_email: email,
            shipping_address: address,
            order_notes: shippingNotes,
            payment_method: selectedPaymentMethod,
            products: cartItems.map(item => ({
                product: item.name,
                product_id: item.id,
                quantity: item.quantity,
                price: parseFloat(item.price),
            })),
        };

        // Include additional payment details based on the selected payment method
        if (selectedPaymentMethod === 'credit_card') {
            orderData.payment_method_data = {
                card_number: cardDetails.cardNumber,
                expiry_date: cardDetails.expiryDate,
                cvv: cardDetails.cvv,
            };
        } else if (selectedPaymentMethod === 'paypal') {
            orderData.payment_method_data = {
                paypal_email: cardDetails.paypalEmail,
            };
        } else if (selectedPaymentMethod === 'bank_transfer') {
            orderData.payment_method_data = {
                account_name: cardDetails.accountName,
                account_number: cardDetails.accountNumber,
                bank_name: cardDetails.bankName,
            };
        }

        try {
            await OrderService.createOrder(orderData);
            handleClearCart(); // Clear cart items
            setPopupMessage('Your order was placed successfully!'); // Set success popup message
            setTimeout(() => {
                setPopupMessage(''); // Clear popup after 5 seconds
                navigate('/'); // Redirect to home after popup
            }, 5000);
        } catch (error) {
            console.log('Error placing order: ' + (error.response?.data?.detail || error.message));
            setPopupMessage('There was an error placing your order. Please try again.'); // Set error popup message
        }
    };

    const closePopup = () => {
        setPopupMessage(''); // Close the popup
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
                    
                    <PaymentMethodFields 
                        selectedPaymentMethod={selectedPaymentMethod} 
                        cardDetails={cardDetails} 
                        setCardDetails={setCardDetails} 
                    />

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
                        Place Order
                    </button>
                </form>
            </div>

            <OrderSummary cartItems={cartItems} totalPrice={totalPrice} isCheckout={true} />

            {popupMessage && ( // Render the popup if there's a message
                <Popup message={popupMessage} onClose={closePopup} />
            )}
        </div>
    );
}
