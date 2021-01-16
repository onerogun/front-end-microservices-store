import React, { useContext } from "react";
import { ProductContext } from "../Contexts/ProductContext";
import { ProductCoverImage } from "./ProductCoverImage";

export const Product = () => {
  const products = useContext(ProductContext);

  return (
    <div className="container">
      <div className="row ">
        {products.map((item) => {
          return (
            <div
              className=" col-md-4 col-lg-3 col-sm-6 justify-content-center p-2 m-2 position-relative "
              key={item.itemId}
            >
              <ProductCoverImage itemId={item.itemId} />
              <div className="text-secondary fs-4 mt-2">${item.itemPrice}</div>
              <p className="text-secondary fs-3 fw-normal">{item.itemName}</p>
              <a
                href={`/product-details/${item.itemId}`}
                className="stretched-link"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
