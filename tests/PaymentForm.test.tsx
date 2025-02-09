import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PaymentForm } from '../src/components/PaymentForm';

describe('PaymentForm', () => {
    beforeEach(() => {
        render(<PaymentForm />);
    });

    test('renders initial amount input form', () => {
        expect(screen.getByText('Enter Payment Amount')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter amount')).toBeInTheDocument();
    });

    test('handles amount input and shows pay button', () => {
        const amountInput = screen.getByPlaceholderText('Enter amount');
        fireEvent.change(amountInput, { target: { value: '1000.50' } });
        expect(amountInput).toHaveValue('1000.50');
        expect(screen.getByText('Pay ₹1000.50')).toBeInTheDocument();
    });

    test('shows card form after amount submission', () => {
        const amountInput = screen.getByPlaceholderText('Enter amount');
        fireEvent.change(amountInput, { target: { value: '1000' } });
        fireEvent.submit(screen.getByText('Pay ₹1000'));

        expect(screen.getByText('Enter Card Details')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('1234 5678 9012 3456')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Name on card')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('MM/YY')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('***')).toBeInTheDocument();
    });

    test('validates card number input', () => {
        // Submit amount first to show card form
        fireEvent.change(screen.getByPlaceholderText('Enter amount'), { target: { value: '1000' } });
        fireEvent.submit(screen.getByText('Pay ₹1000'));

        const cardInput = screen.getByPlaceholderText('1234 5678 9012 3456');
        fireEvent.change(cardInput, { target: { value: '41111111111111112222' } });
        expect(cardInput).toHaveValue('4111111111111111');
    });

    test('identifies different card types', () => {
        // Submit amount first to show card form
        fireEvent.change(screen.getByPlaceholderText('Enter amount'), { target: { value: '1000' } });
        fireEvent.submit(screen.getByText('Pay ₹1000'));

        const cardInput = screen.getByPlaceholderText('1234 5678 9012 3456');

        // Test Visa
        fireEvent.change(cardInput, { target: { value: '4111111111111111' } });
        expect(screen.getByText('VISA')).toHaveClass('active');

        // Test Mastercard
        fireEvent.change(cardInput, { target: { value: '5111111111111111' } });
        expect(screen.getByText('MASTERCARD')).toHaveClass('active');

        // Test American Express
        fireEvent.change(cardInput, { target: { value: '341111111111111' } });
        expect(screen.getByText('AMEX')).toHaveClass('active');

        // Test RuPay
        fireEvent.change(cardInput, { target: { value: '6011111111111111' } });
        expect(screen.getByText('RUPAY')).toHaveClass('active');
    });
});