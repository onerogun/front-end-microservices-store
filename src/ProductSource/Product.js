import React, { useState, useEffect, useContext, useRef } from "react";
import { ProductContext } from "../Contexts/ProductContext";
import { ProductCoverImage } from "../Images/ProductCoverImage";
import { FilterBar } from "../Components/FilterBar";
import { Link } from "react-router-dom";
import { ItemRating } from "../Components/ItemRating";

export const Product = () => {
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

  //Array to show page numbers on pagination and change current page
  const [pageNumberArray, setPageNumberArray] = useState([]);

  //last page on pagination dashboard to update pageNumberArray when necessary
  const [endOfPageSet, setEndOfPageSet] = useState(4);
  if (currentPage > endOfPageSet) {
    setEndOfPageSet((prev) => prev + 5);
  }

  if (currentPage < endOfPageSet - 4) {
    setEndOfPageSet((prev) => prev - 5);
  }

  useEffect(() => {
    var arr = [];
    //If pressing prev and first element of pageNumberArray is bigger than or equal to current page number,
    //load previous pages
    if (endOfPageSet === currentPage && pageNumberArray[0] >= currentPage) {
      for (
        let index = endOfPageSet;
        index >= endOfPageSet - 5 && index >= 0;
        index--
      ) {
        arr.unshift(index);
      }
    } else if (
      //If last page button is pressed
      currentPage === numberOfTotalPages - 1 &&
      pageNumberArray[pageNumberArray.length - 1] != currentPage
    ) {
      for (
        let index = numberOfTotalPages - 1;
        index >= endOfPageSet - 5 && index >= 0;
        index--
      ) {
        arr.unshift(index);
      }
    } else {
      for (
        let index = currentPage;
        index <= endOfPageSet && index < numberOfTotalPages;
        index++
      ) {
        arr.push(index);
      }
    }
    setPageNumberArray(arr);
  }, [endOfPageSet, numberOfTotalPages]);

  const [hoverArr, setHoverArr] = useState([]);

  /**
   * Create an array as same size as product array and set hovered to false
   */
  useEffect(() => {
    var arry = [];
    products.forEach((product) => {
      arry.push(false);
    });
    setHoverArr((prev) => [...arry]);
  }, [products]);

  function mouseEntered(index) {
    setHoverArr((prev) => [...prev, (prev[index] = true)]);
  }

  function mouseLeaved(index) {
    setHoverArr((prev) => [...prev, (prev[index] = false)]);
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-12 ">
          <FilterBar />
        </div>
        <div className="col-md-9 col-12">
          <div className="row ">
            {products.map((item, index) => {
              return (
                <div
                  className={
                    hoverArr[index]
                      ? "col-md-5 col-lg-2 col-12 justify-content-center p-2 m-2 position-relative border border-primary rounded-3 overflow-hidden"
                      : "col-md-5 col-lg-2 col-12 justify-content-center p-2 m-2 position-relative border border-light rounded-3 overflow-hidden"
                  }
                  key={item.itemId}
                  onMouseEnter={(e) => mouseEntered(index)}
                  onMouseLeave={(e) => mouseLeaved(index)}
                >
                  <ProductCoverImage itemId={item.itemId} />
                  <div>
                    <ItemRating
                      itemId={item.itemId}
                      showNumberOfRaters={false}
                    />{" "}
                  </div>
                  <div className="text-secondary fs-4 mt-2">
                    ${item.itemPrice}
                  </div>
                  <p className="text-secondary fs-3 fw-normal">
                    {item.itemName}
                  </p>
                  <Link
                    to={`/product-details/${item.itemId}`}
                    className="stretched-link"
                  />
                </div>
              );
            })}
          </div>
          <div className="row fixed-bottom">
            <div className="col ">
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  <li
                    className={
                      currentPage === 0 ? "page-item disabled" : "page-item"
                    }
                  >
                    <Link
                      className="page-link"
                      to="#"
                      tabindex="-1"
                      aria-disabled="true"
                      onClick={(e) => {
                        if (currentPage > 0) {
                          setCurrentPage((prev) => prev - 1);
                        }
                      }}
                    >
                      Previous
                    </Link>
                  </li>

                  <li
                    hidden={currentPage < 5 ? true : false}
                    className="page-item"
                  >
                    <Link
                      className="page-link"
                      to="#"
                      onClick={(e) => {
                        setCurrentPage(0);
                      }}
                    >
                      1...
                    </Link>
                  </li>

                  {pageNumberArray.map((pageNum) => {
                    return (
                      <li
                        key={pageNum}
                        className={
                          currentPage === pageNum
                            ? "page-item active"
                            : "page-item"
                        }
                      >
                        <Link
                          className="page-link"
                          to="#"
                          onClick={(e) => {
                            setCurrentPage(pageNum);
                          }}
                        >
                          {pageNum + 1}
                        </Link>
                      </li>
                    );
                  })}

                  <li
                    hidden={
                      numberOfTotalPages < 5 ||
                      currentPage === numberOfTotalPages - 1 ||
                      endOfPageSet >= numberOfTotalPages - 1
                        ? true
                        : false
                    }
                    className="page-item"
                  >
                    <Link
                      className="page-link"
                      to="#"
                      onClick={(e) => {
                        setCurrentPage(numberOfTotalPages - 1);
                      }}
                    >
                      ...{numberOfTotalPages}
                    </Link>
                  </li>
                  <li
                    className={
                      currentPage === numberOfTotalPages - 1
                        ? "page-item disabled"
                        : "page-item"
                    }
                  >
                    <Link
                      className="page-link"
                      to="#"
                      onClick={(e) => {
                        if (currentPage < numberOfTotalPages - 1) {
                          setCurrentPage((prev) => prev + 1);
                        }
                      }}
                    >
                      Next
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
