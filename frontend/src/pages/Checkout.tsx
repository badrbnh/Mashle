import React from "react";
import CheckoutContent from "../components/checkout/CheckoutContent";
import { CheckoutPhaseProvider } from '../components/checkout/CheckoutPhaseContext';

const Checkout: React.FC = () => {
    return (
        <CheckoutPhaseProvider>
            <CheckoutContent />
        </CheckoutPhaseProvider>
    )
}

export default Checkout;