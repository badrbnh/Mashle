import "../styles/home.css";
import pizza from "../assets/pizza.png";
const home = () => {
  return (
    <>
    <div className="container">
      <div className="first-half">
        <p className="first-notice">DINE BEYOND ORDINARY</p>
        <h1 className="home-header">Flavors that speaks louder than words!</h1>
        <p className="front-desc">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt ad
          ipsam, incidunt aliquid dolorem non officiis laborum modi, suscipit
          veniam, architecto saepe delectus. Beatae possimus ad non aliquam
          adipisci debitis?
        </p>
        <div className="front-btn-container">
          <button>Order Now</button>
        </div>
      </div>
      <div className="second-half">
        <img src={pizza} alt="" />
      </div>
    </div>
    <div className="front-infos">
      <div className="info-container">
        <div className="info-num">06</div>
        <p>Achieved national and international awards.</p>
      </div>
      <div className="info-container">
        <div className="info-num">10</div>
        <p>Achieved national and international awards.</p>
      </div>
      <div className="info-container">
        <div className="info-num">20</div>
        <p>Achieved national and international awards.</p>
      </div>
    </div>
    </>
  );
};

export default home;
