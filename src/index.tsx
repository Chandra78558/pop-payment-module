import React from 'react';
import ReactDOM from 'react-dom/client';
import { PaymentForm } from './components/PaymentForm';

// Export components for external usage
export { PaymentForm } from './components/PaymentForm';
export { processCCAvenuePayment } from './utils/payment-processor';
export { CCAVENUE_CONFIG } from './components/config';

// For standalone usage
const root = document.getElementById('pop-payment-root');
if (root) {
    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <PaymentForm />
        </React.StrictMode>
    );
}

// Default export for direct component usage
export default PaymentForm;