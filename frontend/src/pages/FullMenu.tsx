import "../styles/menu.css";
import CategoriesList from "../features/api/FullCategoriesService";
import FullMenuList from "../features/api/FullMenuService";
import { useMediaQuery } from "@mui/material";

function Menu() {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <div className={isMobile ? "menu-m" : "menu"}>
      <div className={isMobile ? "menu-desc-m" : "menu-desc"}>
        <p className={isMobile ? "menu-title-m" : "menu-title"}>OUR MENU</p>
        <p className={isMobile ? "dish-desc-m" : "dish-desc"}>
          Embark on a culinary adventure with our diverse selection of dishes,
          showcasing flavors from around the globe. From mouthwatering seafood
          creations to tantalizing vegetarian options, each dish is crafted with
          passion and expertise. Join us for a dining experience that promises
          to delight your senses and leave you craving for more.
        </p>
      </div>
      <div className={isMobile ? "cartegory-container-m" : "cartegory-container"}>
        <CategoriesList />
      </div>
      <div className={isMobile ? "dishes-container-m" : "dishes-container"}>
        <FullMenuList />
      </div>
      <div className={isMobile ? "dishes-btn-container-m" : "dishes-btn-container"}>
        <button className={isMobile ? "dishes-btn-m" : "dishes-btn"}>More</button>
      </div>
    </div>
  );
}

export default Menu;
