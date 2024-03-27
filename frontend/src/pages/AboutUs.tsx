import dish1 from "../assets/aboutDish.jpeg";
import dish2 from "../assets/aboutDish2.jpeg";
import chef5 from "../assets/chef5.png";
import chef6 from "../assets/chef6.jpg";
import "../styles/aboutUs.css";

function AboutUs() {
  return (
    <div className="AboutUs">
      <div className="AboutUs-header"><h1>About Us</h1></div>
      <div className="Who-we-are">
        <img src={chef5} alt="" />
        <div className="desc-conatiner">
          <h3>Who we are</h3>
          <p>
            We're more than just a restaurant; we're a place where passion for
            food meets genuine hospitality. Our team is dedicated to creating a
            warm and inviting atmosphere where every guest feels like family.
            Whether you're craving a cozy meal with loved ones, a lively night
            out with friends, or a quick and delicious lunch, we're here to make
            your dining experience special. We believe that great food brings
            people together, and we're honored to be a part of your memories.
          </p>
        </div>
      </div>
      <div className="What-we-offer">
        <div className="desc-conatiner">
          <h3>What we offer</h3>
          <p>
            We offer a culinary experience that tantalizes your taste buds and
            nourishes your soul. Our dishes are made with the freshest
            ingredients, showcasing both classic flavors and innovative twists.
            From satisfying starters to expertly prepared entrees and indulgent
            desserts, we cater to a variety of tastes. Whether you're seeking a
            casual bite, a celebratory feast, or something in between, we're
            dedicated to providing delicious food and exceptional service that
            will leave you wanting more.
          </p>
        </div>
        <img src={dish1} alt="" />
      </div>
      <div className="Our-mission">
        <img src={chef6} alt="" />
        <div className="desc-conatiner">
          <h3>Our mission</h3>
          <p>
            Our mission is to create unforgettable dining experiences through
            delicious food, warm hospitality, and a welcoming atmosphere. We
            strive to be a place where guests feel valued, flavors excite, and
            memories are made.
          </p>
        </div>
      </div>
      <div className="Our-views">
        <div className="desc-conatiner">
          <h3>Our views</h3>
          <p>
            Our view is that food should celebrate the finest ingredients and
            showcase culinary creativity. We prioritize fresh, seasonal produce
            and source responsibly whenever possible. We believe that the best
            dishes start with quality and are elevated through mindful
            preparation.
          </p>
        </div>
        <img src={dish2} alt="" />
      </div>
    </div>
  );
}

export default AboutUs;
