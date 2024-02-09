import React, { useState } from 'react';
import logo from '../../assets/logo.png'; // Import the image
import './NavBar.css'; // Import the CSS file

interface NavBarProps {
  links: string[];
  addOns: string[];
}

const NavBar: React.FC<NavBarProps> = ({ links, addOns }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeStyle = { borderBottom: '4px solid #d17801', color: '#d17801', paddingBottom: '32px'};

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
      <div className="nav-addOns" style={{ margin: 0 }}>
        {addOns.map((addOn, index) => (
          <img key={index} src={addOn} alt={`Add-on ${index}`} />
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
