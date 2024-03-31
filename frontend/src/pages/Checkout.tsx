import '../styles/checkout.css';
import dot from '../assets/dot.svg';
import check from '../assets/check.svg';


function Checkout() {
  return (
    <div className="checkout-container">
      <div className='checkout-phase-container'>
        <div className='checkout-phase'>
            <div className='phase-check'> <img src={dot} alt="" /></div>
            <p>Personal details</p>
        </div>
        <div className='phase-connect'></div>
        <div className='checkout-phase'>
            <div className='phase-check'></div>
            <p>Payment details</p>
        </div>
        <div className='phase-connect'></div>
        <div className='checkout-phase'>
            <div className='phase-check'></div>
            <p>Completion</p>
        </div>
      </div>
      <div>
        <div>
          <div></div>
          <div></div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Checkout;
