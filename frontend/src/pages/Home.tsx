import "../styles/home.css";
import pizza from "../assets/pizza.png";
import Menu from "./Menu";
import Chefs from "../components/chefs";
import Best from "../components/best";
import Testimonail from "../components/testimonail";
import { useMediaQuery } from "@mui/material";

const home = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <>
      <div className="container">
        {isMobile ? (
          <>
            <div className="first-half">
              <p className="first-notice">DINE BEYOND ORDINARY</p>
              <h1 className="home-header">
                Flavors that speaks louder than words!
              </h1>
              <p className="front-desc">
                We prioritize fresh ingredients, bold flavors, and traditional
                recipes. From hearty appetizers to decadent desserts, each dish
                is crafted with care for an unforgettable dining experience. Let
                us tempt your taste buds!
              </p>
              <div className="second-half">
                <img src={pizza} alt="" />
              </div>{" "}
              <div className="front-btn-container">
                <button>Order Now</button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="first-half">
              <p className="first-notice">DINE BEYOND ORDINARY</p>
              <h1 className="home-header">
                Flavors that speaks louder than words!
              </h1>
              <p className="front-desc">
                We prioritize fresh ingredients, bold flavors, and traditional
                recipes. From hearty appetizers to decadent desserts, each dish
                is crafted with care for an unforgettable dining experience. Let
                us tempt your taste buds!
              </p>
              <div className="front-btn-container">
                <button>Order Now</button>
              </div>
            </div>
            <div className="second-half">
              <img src={pizza} alt="" />
            </div>{" "}
          </>
        )}
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
      {<Menu></Menu>
      /* <Chefs></Chefs>
      <Best></Best>
      <Testimonail></Testimonail> */}
    </>
  );
};

export default home;
