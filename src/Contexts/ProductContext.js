import React, { useState, useEffect, useContext, useRef } from "react";
import { ServerContext } from "../Contexts/ServerContext";
import axios from "axios";

//http://localhost:9191/items/getItemsPage?pageNo=0&pageSize=3&sortBy=itemId

export const ProductContext = React.createContext();

export const ProductProvider = (props) => {
  const [products, setProducts] = useState([]);
  const server = useContext(ServerContext);

  //If filtered before and saved to session storage, use those props otherwise use default
  const stored = sessionStorage.getItem("filter");
  console.log(stored);
  const searchProps = useRef(
    stored
      ? JSON.parse(stored)
      : {
          pageNo: 0,
          pageSize: 1,
          sortBy: "itemPrice",
          direction: 1,
          min: 0,
          max: 9999999,
        }
  );
  console.log(searchProps.current);
  const [currentPage, setCurrentPage] = useState(searchProps.current.pageNo);
  const [pageSize, setPageSize] = useState(searchProps.current.pageSize);
  const [sortBy, setSortBy] = useState(searchProps.current.sortBy);
  const [direction, setDirection] = useState(searchProps.current.direction);

  const [minPriceFilter, setMinPriceFilter] = useState(searchProps.current.min);
  const [maxPriceFilter, setMaxPriceFilter] = useState(searchProps.current.max);

  const [numberOfTotalPages, setNumberOfTotalPages] = useState();

  useEffect(() => {
    const FetchProducts = () => {
      console.log("fetching");
      axios
        .get(`${server}/items/getItemsPage`, {
          params: searchProps.current,
        })
        .then((res) => {
          console.log(res.data);
          setProducts(res.data.data);
          setNumberOfTotalPages(res.data.NumberOfTotalPages);
        });
    };
    FetchProducts();
  }, [
    currentPage,
    pageSize,
    sortBy,
    direction,
    minPriceFilter,
    maxPriceFilter,
  ]);

  /*
    currentPage,
    pageSize,
    sortBy,
    direction,
    minPriceFilter,
    maxPriceFilter,

  */

  return (
    <ProductContext.Provider
      value={[
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
        searchProps,
      ]}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
