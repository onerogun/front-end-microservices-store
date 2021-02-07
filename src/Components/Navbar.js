import axios from "axios";
import React, { useState, useEffect, useContext, useRef } from "react";
import { LoginSuccessContext } from "../Contexts/LoginSuccessContext";
import { ServerContext } from "../Contexts/ServerContext";
import { CartContext } from "../Contexts/CartContext";
import "./navbar.css";
import { Link } from "react-router-dom";
import { CustomerProfileContext } from "../Contexts/CustomerProfileContext";

export const NavBar = () => {
  const [loggedIn] = useContext(LoginSuccessContext);
  const [searchWord, setSearchWord] = useState();
  const server = useContext(ServerContext);
  const [searchResult, setSearchResult] = useState([]);
  const [cart] = useContext(CartContext);
  const [
    customerProfile,
    userProfile,
    setCustomerProfile,
    setUserProfile,
  ] = useContext(CustomerProfileContext);
  const dropdownList = useRef();

  useEffect(() => {
    if (!searchWord) {
      setSearchResult([]);
    }

    if (searchWord) {
      SearchTyped(searchWord);
    }
  }, [searchWord]);

  const SearchTyped = (word) => {
    axios
      .get(`${server}/items/searchItems/${word}`)
      .then((res) => {
        setSearchResult(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li
              hidden={
                userProfile.userRoles &&
                userProfile.userRoles.indexOf("ADMIN") > -1
                  ? true
                  : false
              }
              className="nav-item"
            >
              <Link className="nav-link text-dark" to="/orders">
                Orders
              </Link>
            </li>
            <li
              hidden={
                !userProfile.userRoles ||
                (userProfile.userRoles &&
                  userProfile.userRoles.indexOf("ADMIN") < 0)
                  ? true
                  : false
              }
              className="nav-item"
            >
              <Link className="nav-link text-dark" to="/manage-products">
                Manage Products
              </Link>
            </li>

            <li hidden={loggedIn ? false : true} className="nav-item">
              <Link className="nav-link text-dark" to="/chat/-1">
                Messages
              </Link>
            </li>
          </ul>

          <div className="dropdown">
            <form class="d-flex">
              <input
                style={{ width: "30rem" }}
                className="form-control me-2"
                value={searchWord}
                onChange={(e) => {
                  setSearchWord(e.target.value);
                }}
                type="search"
                placeholder="Search"
                aria-label="Search"
                data-bs-toggle="dropdown"
              />

              <button
                class="btn btn-outline-success"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Search
              </button>

              <ul
                ref={dropdownList}
                style={searchResult.length < 1 ? { display: "none" } : null}
                className="dropdown-menu"
              >
                {searchResult
                  ? searchResult.map((item) => {
                      return (
                        <li key={item.itemId}>
                          <Link
                            className="dropdown-item"
                            to={`/product-details/${item.itemId}`}
                          >
                            {item.itemName}
                          </Link>
                        </li>
                      );
                    })
                  : null}
              </ul>
            </form>
          </div>

          {loggedIn ? (
            <Link className="nav-link text-dark" to="/profile">
              Your Profile
            </Link>
          ) : (
            <Link className="nav-link text-dark" to="/login">
              Login
            </Link>
          )}

          <Link
            hidden={
              userProfile.userRoles &&
              userProfile.userRoles.indexOf("ADMIN") > -1
                ? true
                : false
            }
            className="nav-link text-dark btn btn-primary position-relative me-2"
            to="/cart"
          >
            Cart{" "}
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
              {cart.length} <span class="visually-hidden">unread messages</span>
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
