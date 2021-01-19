import axios from "axios";
import React, { useState, useEffect, useContext, useRef } from "react";
import { LoginSuccessContext } from "../Contexts/LoginSuccessContext";
import { ServerContext } from "../Contexts/ServerContext";
import "./navbar.css";

export const NavBar = () => {
  const [loggedIn] = useContext(LoginSuccessContext);
  const [searchWord, setSearchWord] = useState();
  const server = useContext(ServerContext);
  const [searchResult, setSearchResult] = useState([]);

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
        <a className="navbar-brand" href="/">
          Home
        </a>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link text-dark"
                aria-current="page"
                href="/addProduct"
              >
                Add Product
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">
                Link
              </a>
            </li>
          </ul>

          <div className="dropdown">
            <form class="d-flex">
              <input
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
                          <a
                            className="dropdown-item"
                            href={`/product-details/${item.itemId}`}
                          >
                            {item.itemName}
                          </a>
                        </li>
                      );
                    })
                  : null}
              </ul>
            </form>
          </div>

          {loggedIn ? (
            <a className="nav-link text-dark" href="/profile">
              Your Profile
            </a>
          ) : (
            <a className="nav-link text-dark me-3" href="/login">
              Login
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};
