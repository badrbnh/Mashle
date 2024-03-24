import "../styles/menu.css";
import CategoriesList from "../features/api/FullCategoriesService";
import FullMenuList from "../features/api/FullMenuService";
import MenuItems from "../components/menuItemComponent";

function Menu() {
  return (
    <div className="menu">
      <div className="menu-desc">
        <p className="menu-title">OUR MENU</p>
        <p className="dish-desc">
          Embark on a culinary adventure with our diverse selection of dishes,
          showcasing flavors from around the globe. From mouthwatering seafood
          creations to tantalizing vegetarian options, each dish is crafted with
          passion and expertise. Join us for a dining experience that promises
          to delight your senses and leave you craving for more.
        </p>
      </div>
      <div className="cartegory-container">
        <CategoriesList></CategoriesList>
      </div>
      <div className="dishes-container">
          <FullMenuList></FullMenuList>
      </div>
      <div className="dishes-btn-container">
        <button className="dishes-btn">More</button>
      </div>
      <MenuItems></MenuItems>
    </div>
  );
}

export default Menu;
