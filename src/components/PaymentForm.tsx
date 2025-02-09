import React, { useState } from 'react';
import { CCAVENUE_CONFIG } from './config';
import './PaymentForm.css';
import { showNotification } from '../utils/notifications';
import { processCCAvenuePayment } from '../utils/payment-processor';

export const PaymentForm: React.FC = () => {
    const [showCardForm, setShowCardForm] = useState(false);
    const [amount, setAmount] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');

    const handleInitialSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowCardForm(true);
    };

    const handleCardSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Show processing notification
        showNotification('Payment Processing', 'Please wait while we process your payment...');
        
        try {
            // CCAvenue payment processing
            const response = await processCCAvenuePayment({
                amount,
                currency: amount.includes('$') ? 'USD' : 'INR',
                cardDetails: {
                    number: cardNumber,
                    holder: cardHolderName,
                    expiry: expiryDate,
                    cvv
                }
            });
    
            // Success notification
            showNotification('Payment Successful', 'Your transaction has been completed successfully!');
        } catch (error) {
            showNotification('Payment Failed', 'Please try again or use a different card.');
        }
    };
    
    // Currency formatter based on input
    const formatAmount = (value: string) => {
        const isCurrencySymbol = value.startsWith('$') || value.startsWith('₹');
        if (!isCurrencySymbol) {
            return `₹${value}`; // Default to INR
        }
        return value;
    };
    

    const getCardType = (number: string) => {
        const firstDigit = number.charAt(0);
        const firstTwoDigits = number.substring(0, 2);
        
        if (number.startsWith('34') || number.startsWith('37')) return 'amex';
        if (firstDigit === '4') return 'visa';
        if (['51', '52', '53', '54', '55'].includes(firstTwoDigits)) return 'mastercard';
        if (['60', '65', '81', '82'].includes(firstTwoDigits)) return 'rupay';
        return 'unknown';
    };

    return (
        <div className="payment-container">
            {!showCardForm ? (
                <form onSubmit={handleInitialSubmit} className="payment-form">
                    <h2>Enter Payment Amount</h2>
                    <div className="form-group">
                        <label>Amount (₹)</label>
                        <input
                            type="text"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ''))}
                            placeholder="Enter amount"
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Pay ₹{amount || '0'}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleCardSubmit} className="payment-form">
                    <h2>Enter Card Details</h2>
                    <div className="card-icons">
                        {Object.values(CCAVENUE_CONFIG.SUPPORTED_CARDS).map(card => (
                            <span key={card} className={`card-icon ${getCardType(cardNumber) === card ? 'active' : ''}`}>
                                {card.toUpperCase()}
                            </span>
                        ))}
                    </div>
                    <div className="form-group">
                        <label>Card Number</label>
                        <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                            placeholder="1234 5678 9012 3456"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Card Holder Name</label>
                        <input
                            type="text"
                            value={cardHolderName}
                            onChange={(e) => setCardHolderName(e.target.value)}
                            placeholder="Name on card"
                            required
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Expiry Date</label>
                            <input
                                type="text"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                placeholder="MM/YY"
                                maxLength={5}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>CVV</label>
                            <input
                                type="password"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value.slice(0, 4))}
                                placeholder="***"
                                maxLength={4}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="submit-button">
                        Pay ₹{amount}
                    </button>
                </form>
            )}
        </div>
    );
};