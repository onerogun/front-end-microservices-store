import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from "../Contexts/ProductContext";
import { ProductCoverImage } from "./ProductCoverImage";
import { FilterBar } from "../Components/FilterBar";

export const Product = () => {
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

  //Array to show page numbers on pagination and change current page
  const [pageNumberArray, setPageNumberArray] = useState([]);

  //last page on pagination dashboard to update pageNumberArray when necessary
  const [endOfPageSet, setEndOfPageSet] = useState(5);

  if (currentPage >= endOfPageSet) {
    setEndOfPageSet((prev) => prev + 5);
  }

  useEffect(() => {
    var arr = [];
    for (
      let index = currentPage;
      index < endOfPageSet && index < numberOfTotalPages;
      index++
    ) {
      arr.push(index);
    }
    setPageNumberArray(arr);
  }, [endOfPageSet, numberOfTotalPages]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-2">
          <div className="position-absolute start-0">
            <FilterBar />
          </div>
        </div>
        <div className="col-10">
          <div className="row ">
            {products.map((item) => {
              return (
                <div
                  className=" col-md-4 col-lg-3 col-sm-6 justify-content-center p-2 m-2 position-relative "
                  key={item.itemId}
                >
                  <ProductCoverImage itemId={item.itemId} />
                  <div className="text-secondary fs-4 mt-2">
                    ${item.itemPrice}
                  </div>
                  <p className="text-secondary fs-3 fw-normal">
                    {item.itemName}
                  </p>
                  <a
                    href={`/product-details/${item.itemId}`}
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
                    <a
                      className="page-link"
                      href="#"
                      tabindex="-1"
                      aria-disabled="true"
                      onClick={(e) => {
                        if (currentPage > 0) {
                          setCurrentPage((prev) => prev - 1);
                        }
                      }}
                    >
                      Previous
                    </a>
                  </li>

                  <li
                    hidden={currentPage < 6 ? true : false}
                    className="page-item"
                  >
                    <a
                      className="page-link"
                      href="#"
                      onClick={(e) => setCurrentPage(0)}
                    >
                      1
                    </a>
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
                        <a
                          className="page-link"
                          href="#"
                          onClick={(e) => setCurrentPage(pageNum)}
                        >
                          {pageNum + 1}
                        </a>
                      </li>
                    );
                  })}

                  <li
                    hidden={numberOfTotalPages < 5 ? true : false}
                    className="page-item"
                  >
                    <a
                      className="page-link"
                      href="#"
                      onClick={(e) => setCurrentPage(numberOfTotalPages - 1)}
                    >
                      ...{numberOfTotalPages}
                    </a>
                  </li>
                  <li
                    className={
                      currentPage === numberOfTotalPages - 1
                        ? "page-item disabled"
                        : "page-item"
                    }
                  >
                    <a
                      className="page-link"
                      href="#"
                      onClick={(e) => {
                        if (currentPage < numberOfTotalPages - 1) {
                          setCurrentPage((prev) => prev + 1);
                        }
                      }}
                    >
                      Next
                    </a>
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
