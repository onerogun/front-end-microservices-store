import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from "../Contexts/ProductContext";

export const FilterBar = () => {
  const [
    products,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    sortBy,
    setSortBy,
    numberOfTotalPages,
  ] = useContext(ProductContext);

  return (
    <div className="row">
      <div className="col-8">
        <div class="input-group mb-3">
          <label class="input-group-text" for="inputGroupSelect02">
            Sort By
          </label>
          <select class="form-select" id="inputGroupSelect02">
            <option selected>Price: Low to High</option>
            <option value="1">Price: High to Low</option>
            <option value="2">Product Name</option>
          </select>
        </div>

        <div className="input-group">
          <span className="input-group-text">Price$</span>
          <input
            type="text"
            aria-label="Min Price"
            className="form-control"
            placeholder="Min"
          />
          <input
            type="text"
            aria-label="Max Price"
            className="form-control"
            placeholder="Max"
          />
        </div>
      </div>
    </div>
  );
};
