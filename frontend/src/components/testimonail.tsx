import "../styles/testimonial.css";
import quote from "../assets/quote.svg";
import { useMediaQuery } from "@mui/material";

function testimonail() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div className={!isMobile ? "testimonial-container" : "testimonial-container-m"}>
      <div className={!isMobile ? "testimonial-notice" : "testimonial-notice-m"}>TESTIMONIAL</div>
      <h1>Testimonials from individuals</h1>
      <div className={!isMobile ? "review-container" : "review-container-m"}>
        <div className={!isMobile ? "review" : "review-m"}>
          <img src={quote} alt="" />
          <p>
            "Exceptional service and delectable cuisine make dining at this
            restaurant an absolute delight. From the ambiance to the flavors,
            every aspect exceeded our expectations, leaving us eagerly
            anticipating our next visit."
          </p>
          <p className={!isMobile ? "reviewer" : "reviewer-m"}>Albert Luis</p>
        </div>
        <div className={!isMobile ? "review" : "review-m"}>
          <img src={quote} alt="" />
          <p>
            "This restaurant truly shines with its impeccable attention to
            detail and mouthwatering dishes. A culinary gem that promises a
            delightful experience from start to finish."
          </p>
          <p className={!isMobile ? "reviewer" : "reviewer-m"}>Chris Brown</p>
        </div>
      </div>
    </div>
  );
}

export default testimonail;
