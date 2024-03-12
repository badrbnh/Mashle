import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import logo from '../../assets/logo.png';
import './NavBar.css';
import cart from "../../assets/cart.svg";
import user from "../../assets/add-user-male.svg";
import Search from './search';

interface NavBarProps {
  links: string[];
}

const NavBar: React.FC<NavBarProps> = ({ links }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeStyle = { borderBottom: '4px solid #d17801', color: '#d17801', paddingBottom: '38px'};
  function handleClick(index: number) {
    setSelectedIndex(index);
    console.log(`${links[index]}`);
  }

  return (
    <nav>
      <div className="links-container">
        <img src={logo} alt="logo" className="logo" />
        <ul className="nav-links" style={{ margin: 0 }}>
          {links.map((link, index) => (
            <li key={index}>
              <a href="#" onClick={() => handleClick(index)} style={selectedIndex === index ? activeStyle : {}}>
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="nav-addOns">
          <Search />
          <img src={cart} alt="cart" className="cart-icon" />
          <Link to={"/login"}><img src={user} alt="user" className="user-icon" /></Link>
      </div>
    </nav>
  );
};

export default NavBar;
