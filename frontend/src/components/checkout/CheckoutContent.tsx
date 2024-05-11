import React from "react";
import Progress from "./checkoutProgress";
import PersonalDetails from "./PersonalDetails";
import Payment from "./payment";
import { useCheckoutPhase } from "./CheckoutPhaseContext";

const CheckoutContent: React.FC = () => {
    const { currentPhase } = useCheckoutPhase();
    return (
        <>
            <Progress /> 
            {currentPhase === 0 ? <PersonalDetails /> : <Payment />}
        </>
    );
};

export default CheckoutContent;