import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, reset } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import SearchComponent from "../search";
import logo from "../../assets/logo.png";
import "./NavBar.css";
import cart from "../../assets/cart.svg";
import Popup from "reactjs-popup";
import userIcon from "../../assets/add-user-male.svg";
import MenuItems from "../menuItemComponent";

interface NavBarProps {
  links: string[];
}

const NavBar: React.FC<NavBarProps> = ({ links }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutUser() as any); // Type assertion to 'any'
    dispatch(reset());
    toast.success("Logged out successfully");
    navigate("/");
  };

  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeStyle = {
    borderBottom: "4px solid #d17801",
    color: "#d17801",
    paddingBottom: "38px",
  };
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
              <a
                href="#"
                onClick={() => handleClick(index)}
                style={selectedIndex === index ? activeStyle : {}}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {user ? (
        <div className="nav-addOns">
          <SearchComponent/>
          <Popup
                  trigger={<button className="add-cart"><img src={cart} alt="" /></button>}
                  modal
                  position="center center"
                >
                  <MenuItems></MenuItems>
          </Popup>
          <NavLink to={"/"}>
            <img
              src={userIcon}
              alt="user"
              className="user-icon"
              onClick={handleLogout}
            />
          </NavLink>
        </div>
      ) : (
        <>
          <SearchComponent></SearchComponent>
          <div className="login-signup-container">
            <NavLink to={"/login"} className={"login-btn"}>
              Log in
            </NavLink>
            <NavLink to={"/register"} className={"signUp-btn"}>
              Sign up
            </NavLink>
          </div>
        </>
      )}
    </nav>
  );
};

export default NavBar;
