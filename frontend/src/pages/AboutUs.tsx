import dish1 from "../assets/aboutDish.jpeg";
import dish2 from "../assets/aboutDish2.jpeg";
import chef5 from "../assets/chef5.png";
import chef6 from "../assets/chef6.jpg";
import "../styles/aboutUs.css";
import { useMediaQuery } from "@mui/material";

function AboutUs() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:800px)");

  return (
    <div className={`${!isMobile ? "AboutUs" : "AboutUs-m"} ${!isTablet ? "AboutUs" : "AboutUs-t"}`}>
      <div className={`${!isMobile ? "AboutUs-header" : "AboutUs-header-m"} ${!isTablet ? "AboutUs-header" : "AboutUs-header-t"}`}>
        <h1>About Us</h1>
      </div>
      {!isMobile && !isTablet ? (
        <div className={`${!isMobile ? "Who-we-are" : "Who-we-are-m"} ${!isTablet ? "Who-we-are" : "Who-we-are-t"}`}>
          <img src={chef5} alt="" />
          <div className={`${!isMobile ? "desc-conatiner" : "desc-conatiner-m"} ${!isTablet ? "desc-conatiner" : "desc-conatiner-t"}`}>
            <h3>Who we are</h3>
            <p>
              We're more than just a restaurant; we're a place where passion for
              food meets genuine hospitality. Our team is dedicated to creating
              a warm and inviting atmosphere where every guest feels like
              family. Whether you're craving a cozy meal with loved ones, a
              lively night out with friends, or a quick and delicious lunch,
              we're here to make your dining experience special. We believe that
              great food brings people together, and we're honored to be a part
              of your memories.
            </p>
          </div>
        </div>
      ) : (
        <div className={`${!isMobile ? "Who-we-are" : "Who-we-are-m"} ${!isTablet ? "Who-we-are" : "Who-we-are-t"}` }>
          <div className={`${!isMobile ? "desc-conatiner" : "desc-conatiner-m"} ${!isTablet ? "desc-conatiner" : "desc-conatiner-t"}`}>
            <h3>Who we are</h3>
            <img src={chef5} alt="" />
            <p>
              We're more than just a restaurant; we're a place where passion for
              food meets genuine hospitality. Our team is dedicated to creating
              a warm and inviting atmosphere where every guest feels like
              family. Whether you're craving a cozy meal with loved ones, a
              lively night out with friends, or a quick and delicious lunch,
              we're here to make your dining experience special. We believe that
              great food brings people together, and we're honored to be a part
              of your memories.
            </p>
          </div>
        </div>
      )}
      {!isMobile && !isTablet ? (
        <div className={`${!isMobile ? "What-we-offer" : "What-we-offer-m"} ${!isTablet ? "What-we-offer" : "What-we-offer-t"}`}>
          <div className={`${!isMobile ? "desc-conatiner" : "desc-conatiner-m"} ${!isTablet ? "desc-conatiner" : "desc-conatiner-t"}`}>
            <h3>What we offer</h3>
            <p>
              We offer a culinary experience that tantalizes your taste buds and
              nourishes your soul. Our dishes are made with the freshest
              ingredients, showcasing both classic flavors and innovative
              twists. From satisfying starters to expertly prepared entrees and
              indulgent desserts, we cater to a variety of tastes. Whether
              you're seeking a casual bite, a celebratory feast, or something in
              between, we're dedicated to providing delicious food and
              exceptional service that will leave you wanting more.
            </p>
          </div>
          <img src={dish1} alt="" />
        </div>
      ) : (
        <div className={`${!isMobile ? "What-we-offer" : "What-we-offer-m"} ${!isTablet ? "What-we-offer" : "What-we-offer-t"}`}>
          <div className={`${!isMobile ? "desc-conatiner" : "desc-conatiner-m"} ${!isTablet ? "desc-conatiner" : "desc-conatiner-t"}`}>
            <h3>What we offer</h3>
            <img src={dish1} alt="" />
            <p>
              We offer a culinary experience that tantalizes your taste buds and
              nourishes your soul. Our dishes are made with the freshest
              ingredients, showcasing both classic flavors and innovative
              twists. From satisfying starters to expertly prepared entrees and
              indulgent desserts, we cater to a variety of tastes. Whether
              you're seeking a casual bite, a celebratory feast, or something in
              between, we're dedicated to providing delicious food and
              exceptional service that will leave you wanting more.
            </p>
          </div>
        </div>
      )}
      {!isMobile && !isTablet ? (
        <div className={`${!isMobile ? "Our-mission" : "Our-mission-m"} ${!isTablet ? "Our-mission" : "Our-mission-t"}`}>
          <img src={chef6} alt="" />
          <div className={`${!isMobile ? "desc-conatiner" : "desc-conatiner-m"} ${!isTablet ? "desc-conatiner" : "desc-conatiner-t"}`}>
            <h3>Our mission</h3>
            <p>
              Our mission is to create unforgettable dining experiences through
              delicious food, warm hospitality, and a welcoming atmosphere. We
              strive to be a place where guests feel valued, flavors excite, and
              memories are made.
            </p>
          </div>
        </div>
      ) : (
        <div className={`${!isMobile ? "Our-mission" : "Our-mission-m"} ${!isTablet ? "Our-mission" : "Our-mission-t"}`}>
          <div className={`${!isMobile ? "desc-conatiner" : "desc-conatiner-m"} ${!isTablet ? "desc-conatiner" : "desc-conatiner-t"}`}>
            <h3>Our mission</h3>
            <img src={chef6} alt="" />
            <p>
              Our mission is to create unforgettable dining experiences through
              delicious food, warm hospitality, and a welcoming atmosphere. We
              strive to be a place where guests feel valued, flavors excite, and
              memories are made.
            </p>
          </div>
        </div>
      )}
      {!isMobile && !isTablet ? (
        <div className={`${!isMobile ? "Our-views" : "Our-views-m"} ${!isTablet ? "Our-views" : "Our-views-t"}`}>
          <div className={`${!isMobile ? "desc-conatiner" : "desc-conatiner-m"} ${!isTablet ? "desc-conatiner" : "desc-conatiner-t"}`}>
            <h3>Our views</h3>
            <p>
              Our view is that food should celebrate the finest ingredients and
              showcase culinary creativity. We prioritize fresh, seasonal
              produce and source responsibly whenever possible. We believe that
              the best dishes start with quality and are elevated through
              mindful preparation.
            </p>
          </div>
          <img src={dish2} alt="" />
        </div>
      ) : (
        <div className={`${!isMobile ? "Our-views" : "Our-views-m"} ${!isTablet ? "Our-views" : "Our-views-t"}`}>
          <div className={`${!isMobile ? "desc-conatiner" : "desc-conatiner-m"} ${!isTablet ? "desc-conatiner" : "desc-conatiner-t"}`}>
            <h3>Our views</h3>
            <img src={dish2} alt="" />
            <p>
              Our view is that food should celebrate the finest ingredients and
              showcase culinary creativity. We prioritize fresh, seasonal
              produce and source responsibly whenever possible. We believe that
              the best dishes start with quality and are elevated through
              mindful preparation.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AboutUs;
