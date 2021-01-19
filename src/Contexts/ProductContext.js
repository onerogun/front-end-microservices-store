import React, { useState, useEffect, useContext } from "react";
import { ServerContext } from "../Contexts/ServerContext";
import axios from "axios";

//http://localhost:9191/items/getItemsPage?pageNo=0&pageSize=3&sortBy=itemId

export const ProductContext = React.createContext();

export const ProductProvider = (props) => {
  const [products, setProducts] = useState([]);
  const server = useContext(ServerContext);

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(1);
  const [sortBy, setSortBy] = useState("itemPrice");
  const [direction, setDirection] = useState(1);

  const [minPriceFilter, setMinPriceFilter] = useState(0);
  const [maxPriceFilter, setMaxPriceFilter] = useState(9999999);

  const [numberOfTotalPages, setNumberOfTotalPages] = useState();

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

  useEffect(() => {
    FetchProducts();
  }, [
    currentPage,
    pageSize,
    sortBy,
    direction,
    minPriceFilter,
    maxPriceFilter,
  ]);

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
      ]}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
