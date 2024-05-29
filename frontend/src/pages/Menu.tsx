import "../styles/menu.css";
import CategoriesList from "../features/api/CategoryService";
import MenuList from "../features/api/MenuService";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

function Menu() {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <>
      {!isMobile ? (
        <div className="menu">
          <div className="menu-desc">
            <p className="menu-title">OUR MENU</p>
            <p className="dish-desc">
              Embark on a culinary adventure with our diverse selection of
              dishes, showcasing flavors from around the globe. From
              mouthwatering seafood creations to tantalizing vegetarian options,
              each dish is crafted with passion and expertise. Join us for a
              dining experience that promises to delight your senses and leave
              you craving for more.
            </p>
          </div>
          <div className="cartegory-container">
            <CategoriesList></CategoriesList>
          </div>
          <div className="dishes-container">
            <MenuList></MenuList>
          </div>
          <div className="dishes-btn-container">
            <NavLink to="/menu">
              <button className="dishes-btn">Explore More</button>
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="menu-m">
          <div className="menu-desc-m">
            <p className="menu-title-m">OUR MENU</p>
            <p className="dish-desc-m">
              Embark on a culinary adventure with our diverse selection of
              dishes, showcasing flavors from around the globe. From
              mouthwatering seafood creations to tantalizing vegetarian options,
              each dish is crafted with passion and expertise. Join us for a
              dining experience that promises to delight your senses and leave
              you craving for more.
            </p>
          </div>
          <div className="cartegory-container-m">
            <CategoriesList></CategoriesList>
          </div>
          <div className="dishes-container-m">
            <MenuList></MenuList>
          </div>
          <div className="dishes-btn-container-m">
            <NavLink to="/menu">
              <button className="dishes-btn">Explore More</button>
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}

export default Menu;
