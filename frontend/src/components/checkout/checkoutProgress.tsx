import React from "react";
import "./checkoutProgress.css";
import dot from "../../assets/dot.svg";
import check from "../../assets/check.svg";
import { useCheckoutPhase } from "./CheckoutPhaseContext";

const Progress: React.FC = ({}) => {
  const phases = ["Personal details", "Payment details", "Completion"];
  const { currentPhase } = useCheckoutPhase();
  console.log(currentPhase)
  return (
    <div className="checkout-container">
      <div className="checkout-phase-container">
        {phases.map((phase, index) => (
          <div key={index}>
            <div className="checkout-phase">
              <div className="phase-check">
                {currentPhase > index ? <img src={check} alt="" /> : <img src={dot} alt="" />}
              </div>
              <p>{phase}</p>
            </div>
            {index < phases.length - 1 && <div className="phase-connect"></div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Progress;