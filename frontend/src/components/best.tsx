import '../styles/best.css';
import chef4 from '../assets/chef4.png';
import ingredients from '../assets/ingredients.jpg';
import { useMediaQuery } from '@mui/material';

function best() {
  const isMobile = useMediaQuery('(max-width: 600px)');


  return (
    <div className={!isMobile ? "best-container" : "best-container-m"}>
      <div className={!isMobile ? "best-left" : "best-left-m"}>
        <img src={ingredients} alt="" />
        <p>
          With our exquisite dishes and exceptional service, we guarantee an
          unforgettable dining experience that exceeds all expectations, making
          us the top choice for food enthusiasts.
        </p>
      </div>
      <div className={!isMobile ? "best-right" : "best-right-m"}>
        <div className={!isMobile ? 'best-desc-container' : 'best-desc-container-m'}>
          <div className={!isMobile ? 'best-notice' : 'best-notice-m'}>
            <p>WE ARE THE BEST</p>
          </div>
          <p className={!isMobile ? 'best-desc' : 'best-desc-m'}>
            {" "}
            <span>We crafted</span> delectable <span>and</span> flavorful food{" "}
            <span>using organic</span> ingredients
          </p>
          <button>Order Now</button>
        </div>
        <div className={!isMobile ? 'best-chef-img' : 'best-chef-img-m'}>
        <img src={chef4} alt="" />
        </div>
      </div>
    </div>
  );
}

export default best;
