import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { LoginSuccessContext } from "../Contexts/LoginSuccessContext";
import { ServerContext } from "../Contexts/ServerContext";

export const NavBar = () => {
  const [loggedIn] = useContext(LoginSuccessContext);
  const [searchWord, setSearchWord] = useState();
  const server = useContext(ServerContext);
  useEffect(() => {
    if (searchWord) {
      SearchTyped(searchWord);
    }
  }, [searchWord]);

  const SearchTyped = (word) => {
    axios
      .get(`${server}/items/searchItems/${word}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  console.log(loggedIn);
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
            <li className="nav-item">
              <a className="nav-link text-dark" href="/profile">
                Your Profile
              </a>
            </li>
          </ul>
          <form className="d-flex">
            <input
              className="form-control me-2"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success me-5" type="submit">
              Search
            </button>
          </form>
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
