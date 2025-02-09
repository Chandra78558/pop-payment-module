import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PaymentForm } from '../components/PaymentForm';

const meta: Meta<typeof PaymentForm> = {
    title: 'Payment/PaymentForm',
    component: PaymentForm,
    parameters: {
        layout: 'fullscreen',
        backgrounds: {
            default: 'light',
            values: [
                { name: 'light', value: '#f8fafc' },
                { name: 'dark', value: '#0f172a' }
            ]
        }
    },
    decorators: [
        (Story) => (
            <div style={{ 
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem'
            }}>
                <Story />
            </div>
        )
    ]
};

export default meta;
type Story = StoryObj<typeof PaymentForm>;

export const InitialState: Story = {};

export const WithAmount: Story = {
    args: {
        initialAmount: '1999.99'
    }
};

export const CardFormView: Story = {
    args: {
        showCardForm: true,
        initialAmount: '1999.99'
    }
};

export const FilledCardForm: Story = {
    args: {
        showCardForm: true,
        initialAmount: '1999.99',
        initialCardData: {
            cardNumber: '4111111111111111',
            cardHolderName: 'John Doe',
            expiryDate: '12/25',
            cvv: '123'
        }
    }
};