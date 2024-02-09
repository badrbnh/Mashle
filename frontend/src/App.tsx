import NavBar from "./components/NavBar/NavBar";
import cart from "./assets/cart.svg";
import search from "./assets/search.svg";
import user from "./assets/add-user-male.svg";
const App = () => {
  return (
    <header>
      <NavBar
        links={["Home", "Our menu", "About us", "Contact us", "Locations"]}
        addOns={[search, cart, user]}
      />
    </header>
  );
};

export default App;
