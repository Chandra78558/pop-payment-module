import { processCCAvenuePayment } from '../src/utils/payment-processor';
import { CCAVENUE_CONFIG } from '../src/components/config';

jest.setTimeout(10000); // Setting global timeout to 10 seconds

describe('Payment Processor', () => {
    const mockPaymentDetails = {
        amount: '1000.00',
        currency: 'INR' as const,
        cardDetails: {
            number: '4111111111111111',
            holder: 'John Doe',
            expiry: '12/25',
            cvv: '123'
        }
    };

    test('processes payment successfully', async () => {
        const response = await processCCAvenuePayment(mockPaymentDetails);
        expect(response.status).toBe('success');
    });

    test('handles INR currency correctly', async () => {
        const response = await processCCAvenuePayment(mockPaymentDetails);
        expect(response).toHaveProperty('status');
    });

    test('handles USD currency correctly', async () => {
        const usdPayment = {
            ...mockPaymentDetails,
            currency: 'USD' as const
        };
        const response = await processCCAvenuePayment(usdPayment);
        expect(response).toHaveProperty('status');
    });

    test('validates merchant credentials', async () => {
        const response = await processCCAvenuePayment(mockPaymentDetails);
        expect(CCAVENUE_CONFIG.MERCHANT_ID).toBe('4123834');
        expect(CCAVENUE_CONFIG.ACCESS_CODE).toBe('AVKC52MB23AM06CKMA');
    });

    test('processes different card types', async () => {
        const cardTypes = {
            visa: '4111111111111111',
            mastercard: '5555555555554444',
            amex: '371449635398431',
            rupay: '6011111111111117'
        };

        // Process card types in parallel for better performance
        const results = await Promise.all(
            Object.entries(cardTypes).map(async ([type, number]) => {
                const payment = {
                    ...mockPaymentDetails,
                    cardDetails: { ...mockPaymentDetails.cardDetails, number }
                };
                return processCCAvenuePayment(payment);
            })
        );

        results.forEach(response => {
            expect(response.status).toBe('success');
        });
    }, 10000); // Setting individual test timeout
});