import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, reset } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import SearchComponent from "../search";
import logo from "../../assets/logo.png";
import "./NavBar.css";
import cart from "../../assets/cart.svg";
import menuIcon from "../../assets/menuIcon.svg";
import closeIcon from "../../assets/closeIcon.svg";
import Popup from "reactjs-popup";
import userIcon from "../../assets/add-user-male.svg";
import MenuItems from "../menuItemComponent";
import { useMediaQuery } from "@mui/material";

interface NavBarProps {
  links: string[];
  to: string[];
}

const NavBar: React.FC<NavBarProps> = ({ links, to }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser() as any);
    dispatch(reset());
    toast.success("Logged out successfully");
    navigate("/");
  };

  const activeStyle = {
    borderBottom: "4px solid #d17801",
    color: "#d17801",
    paddingBottom: "38px",
  };

  const mobileActiveStyle = {
    borderBottom: "3px solid #d17801",
    color: "#d17801",
    paddingBottom: "16px",
  };

  const handleClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav>
      <div className="links-container">
        <img src={logo} alt="logo" className="logo" />
        {isMobile ? (
          <>
            <div
              className="nav-sidebar"
              style={{ display: showMenu ? "flex" : "none" }}
            >
              <div className="close-icon-container">
                <img
                  src={closeIcon}
                  alt="close menu"
                  className="close-icon"
                  onClick={handleMenuClick}
                />
              </div>
              <ul>
                {links.map((link, index) => (
                  <li key={index}>
                    <NavLink
                      onClick={() => handleClick(index)}
                      style={selectedIndex === index ? mobileActiveStyle : {}}
                      to={to[index]}
                    >
                      {link}
                    </NavLink>
                  </li>
                ))}
              </ul>
                <div className="sidebar-login-signup-container">
                  <NavLink to="/login" className="sidebar-login-btn">
                    Log in
                  </NavLink>
                  <NavLink to="/register" className="sidebar-signUp-btn">
                    Sign up
                  </NavLink>
                </div>
            </div>
            <img
              src={menuIcon}
              alt="menu"
              className="menu-icon"
              onClick={handleMenuClick}
            />
          </>
        ) : (
          <>
            <ul className="nav-links" style={{ margin: 0 }}>
              {links.map((link, index) => (
                <li key={index}>
                  <NavLink
                    onClick={() => handleClick(index)}
                    style={selectedIndex === index ? activeStyle : {}}
                    to={to[index]}
                  >
                    {link}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="nav-addOns">
              <SearchComponent />
              {user ? (
                <>
                  <Popup
                    trigger={
                      <button className="add-cart">
                        <img src={cart} alt="cart" />
                      </button>
                    }
                    modal
                    position="center center"
                  >
                    <MenuItems />
                  </Popup>
                  <img
                    src={userIcon}
                    alt="user"
                    className="user-icon"
                    onClick={handleLogout}
                  />
                </>
              ) : (
                <div className="login-signup-container">
                  <NavLink to="/login" className="login-btn">
                    Log in
                  </NavLink>
                  <NavLink to="/register" className="signUp-btn">
                    Sign up
                  </NavLink>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
