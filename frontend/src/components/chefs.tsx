import "../styles/chefs.css";
import chef1 from "../assets/chef1.jpeg";
import chef2 from "../assets/chef2.jpg";
import chef3 from "../assets/chef3.jpg";
import { useMediaQuery } from "@mui/material";

function chefs() {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <div className={!isMobile ? "chefs-container" : "chefs-container-m"}>
      <div
        className={
          !isMobile ? "chefs-desc-container" : "chefs-desc-container-m"
        }
      >
        <p className={!isMobile ? "chefs-title" : "chefs-title-m"}>OUR CHEFS</p>

        <p className={!isMobile ? "chefs-desc" : "chefs-desc-m"}>
          THe emphasi on "speaking louder of words" implies that the culinary
          experience is so powerful that it transcens the need for verbal
          expression.
        </p>
      </div>
      <div
        className={
          !isMobile ? "chefs-info-container" : "chefs-info-container-m"
        }
      >
        <div className={!isMobile ? "chefs-info" : "chefs-info-m"}>
          {!isMobile ? (
            <>
              <img src={chef1} alt="" />
              <p>Dianne Russell</p>
            </>
          ) : (
            <>
              <p>Dianne Russell</p>
              <img src={chef1} alt="" />
            </>
          )}
        </div>
        <div className={!isMobile ? "chefs-info" : "chefs-info-m"}>
          <img src={chef2} alt="" />
          <p>Guy Hawkins</p>
        </div>
        <div className={!isMobile ? "chefs-info" : "chefs-info-m"}>
          {!isMobile ? (
            <>
              <img src={chef3} alt="" />
              <p>Ronald Richareds</p>
            </>
          ) : (
            <>
              <p>Ronald Richareds</p>
              <img src={chef3} alt="" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default chefs;
