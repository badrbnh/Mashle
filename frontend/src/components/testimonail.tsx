import "../styles/testimonial.css";
import quote from "../assets/quote.svg";
function testimonail() {
  return (
    <div className="testimonial-container">
      <div className="testimonial-notice">TESTIMONIAL</div>
      <h1>Testimonials from individuals</h1>
      <div className="review-container">
        <div className="review">
          <img src={quote} alt="" />
          <p>
            "Exceptional service and delectable cuisine make dining at this
            restaurant an absolute delight. From the ambiance to the flavors,
            every aspect exceeded our expectations, leaving us eagerly
            anticipating our next visit."
          </p>
          <p className="reviewer">Albert Luis</p>
        </div>
        <div className="review">
          <img src={quote} alt="" />
          <p>
            "This restaurant truly shines with its impeccable attention to
            detail and mouthwatering dishes. A culinary gem that promises a
            delightful experience from start to finish."
          </p>
          <p className="reviewer">Chris Brown</p>
        </div>
      </div>
    </div>
  );
}

export default testimonail;
