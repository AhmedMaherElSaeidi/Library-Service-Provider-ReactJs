import "./NavBar.css";
import WebsiteLogo from "../../assets/images/LSPWebLogo.png";
import { CgOptions } from "react-icons/cg";
import { TiInfoLarge } from "react-icons/ti";
import { BiCategory, BiCartAlt, BiHomeAlt, BiBookAlt } from "react-icons/bi";
import { MdLogout, MdLogin, MdSettings, MdOutlineMenu } from "react-icons/md";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../core/globals";
import { getUser, isAuth, removeToken } from "../../core/authenication";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const normal_user = isAuth() && getUser().type == "normal";
  const librarian_user = isAuth() && getUser().type == "librarian";
  const [categories, setCategories] = useState({
    data: [],
    loaded: false,
  });
  const signout = () => {
    removeToken();
    navigate("/authenication/login");
  };

  useEffect(() => {
    axios
      .get(SERVER_URL + "category")
      .then((res) => {
        setCategories({ loaded: true, data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <section className="container-fluid">
        <Link className="navbar-brand" to="/pages/home">
          <img src={WebsiteLogo} alt="Website_Logo" title="Home" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span>
            <MdOutlineMenu />
          </span>
        </button>
        <section
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/pages/home" ? "active-route" : ""
                }`}
                to="/pages/home"
              >
                <BiHomeAlt /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/pages/books" ? "active-route" : ""
                }`}
                to="/pages/books"
              >
                <BiBookAlt /> Books
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <BiCategory /> Categories
              </a>
              <ul
                className="dropdown-menu dropdown-menu-dark"
                aria-labelledby="navbarDarkDropdownMenuLink"
              >
                {categories.loaded &&
                  categories.data.map((category, index) => (
                    <li key={index}>
                      <Link
                        className="dropdown-item"
                        to={"/pages/books?category=" + category.category_id}
                      >
                        {category.category}
                      </Link>
                    </li>
                  ))}
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <CgOptions /> Options
              </a>
              <ul
                className="dropdown-menu dropdown-menu-dark"
                aria-labelledby="navbarDarkDropdownMenuLink"
              >
                {librarian_user && (
                  <li>
                    <Link className="dropdown-item" to="/pages/options">
                      <MdSettings /> Settings
                    </Link>
                  </li>
                )}
                {isAuth() && (
                  <li>
                    <a className="dropdown-item" onClick={signout}>
                      <MdLogout /> Sign Out
                    </a>
                  </li>
                )}
                {!isAuth() && (
                  <li>
                    <Link className="dropdown-item" to="/authenication/login">
                      <MdLogin /> Sign In
                    </Link>
                  </li>
                )}
              </ul>
            </li>
            {normal_user && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/pages/cart" ? "active-route" : ""
                  }`}
                  to="/pages/cart"
                >
                  <BiCartAlt /> Cart
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/pages/about" ? "active-route" : ""
                }`}
                to="/pages/about"
              >
                <TiInfoLarge /> AboutUs
              </Link>
            </li>
          </ul>
        </section>
      </section>
    </nav>
  );
};

export default NavBar;
