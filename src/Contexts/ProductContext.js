import React, { useState, useEffect, useContext, useRef } from "react";
import { ServerContext } from "../Contexts/ServerContext";
import axios from "axios";

//http://localhost:9191/items/getItemsPage?pageNo=0&pageSize=3&sortBy=itemId

export const ProductContext = React.createContext();

export const ProductProvider = (props) => {
  const [products, setProducts] = useState([]);
  const server = useContext(ServerContext);

  const [productChange, setProductChange] = useState([]);

  //If filtered before and saved to session storage, use those props otherwise use default
  // const stored = sessionStorage.getItem("filter");
  /* const searchProps = useRef(
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
  );*/
  // console.log(searchProps.current);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(1);
  const [sortBy, setSortBy] = useState("itemPrice");
  const [direction, setDirection] = useState(1);

  const [minPriceFilter, setMinPriceFilter] = useState(0);
  const [maxPriceFilter, setMaxPriceFilter] = useState(9999999);

  const [numberOfTotalPages, setNumberOfTotalPages] = useState();

  useEffect(() => {
    const FetchProducts = () => {
      axios
        .get(`${server}/items/getItemsPage`, {
          params: {
            pageNo: currentPage,
            pageSize: pageSize,
            sortBy: sortBy,
            direction: direction,
            min: minPriceFilter,
            max: maxPriceFilter,
          },
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
    productChange,
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
      value={{
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
        setProductChange,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
