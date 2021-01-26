import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from "../Contexts/ProductContext";

export const FilterBar = () => {
  const [
    products,
    setProducts,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    sortBy,
    setSortBy,
    numberOfTotalPages,
    direction,
    setDirection,
    minPriceFilter,
    setMinPriceFilter,
    maxPriceFilter,
    setMaxPriceFilter,
  ] = useContext(ProductContext);
  const [min, setMin] = useState();
  const [max, setMax] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    setMinPriceFilter(min);
    setMaxPriceFilter(max);
  }

  return (
    <div className="row">
      <div class="input-group mb-3">
        <label class="input-group-text" for="inputGroupSelect1">
          Number of Items Each Page
        </label>
        <select
          value={pageSize}
          onChange={(e) => {
            setCurrentPage(0);
            setPageSize(e.target.value);
          }}
          class="form-select"
          id="inputGroupSelect1"
        >
          <option value="1" selected>
            1
          </option>
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="input-group mb-3">
        <label class="input-group-text" for="inputGroupSelect2">
          Sort By
        </label>
        <select
          value={direction}
          onChange={(e) => {
            setCurrentPage(0);
            setDirection(e.target.value);
          }}
          class="form-select"
          id="inputGroupSelect2"
        >
          <option value="1" selected>
            Price: Low to High
          </option>
          <option value="2">Price: High to Low</option>
        </select>
      </div>
      <form noValidate onSubmit={handleSubmit}>
        <div className="input-group ">
          <label for="setmin" className="input-group-text">Price$</label>
          <input
            type="text"
            aria-label="Min Price"
            className="form-control"
            placeholder="Min"
            id="setmin"
            value={min}
            onChange={(e) => {
              if (e.target.value) {
                setMin(parseInt(e.target.value));
              }
            }}
          />
          <input
            type="text"
            aria-label="Max Price"
            className="form-control"
            placeholder="Max"
            value={max}
            onChange={(e) => {
              if (e.target.value) {
                setMax(parseFloat(e.target.value));
              }
            }}
          />
          <button className="btn btn-primary " type="submit">
            Filter
          </button>
        </div>
      </form>
    </div>
  );
};
