import '../styles/best.css';
import chef4 from '../assets/chef4.png';
import ingredients from '../assets/ingredients.jpg';

function best() {
  return (
    <div className="best-container">
      <div className="best-left">
        <img src={ingredients} alt="" />
        <p>
          With our exquisite dishes and exceptional service, we guarantee an
          unforgettable dining experience that exceeds all expectations, making
          us the top choice for food enthusiasts.
        </p>
      </div>
      <div className="best-right">
        <div className='best-desc-container'>
          <div className='best-notice'>
            <p>WE ARE THE BEST</p>
          </div>
          <p className='best-desc'>
            {" "}
            <span>We crafted</span> delectable <span>and</span> flavorful food{" "}
            <span>using organic</span> ingredients
          </p>
          <button>Order Now</button>
        </div>
        <div className='best-chef-img'>
        <img src={chef4} alt="" />
        </div>
      </div>
    </div>
  );
}

export default best;
