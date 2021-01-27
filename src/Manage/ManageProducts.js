import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductCoverImage } from "../Images/ProductCoverImage";
import { ManagedProductContext } from "../Contexts/ManagedProductContext";

export const ManageProducts = () => {
  const [myProducts, setMyProducts] = useContext(ManagedProductContext);

  const [hoverArr, setHoverArr] = useState([]);

  /**
   * Create an array as same size as product array and set hovered to false
   */
  useEffect(() => {
    var arry = [];
    myProducts.forEach((product) => {
      arry.push(false);
    });
    setHoverArr((prev) => [...arry]);
  }, [myProducts]);

  function mouseEntered(index) {
    setHoverArr((prev) => [...prev, (prev[index] = true)]);
  }

  function mouseLeaved(index) {
    setHoverArr((prev) => [...prev, (prev[index] = false)]);
  }

  return (
    <div className="container">
      <Link
        className="btn btn-primary text-dark"
        aria-current="page"
        to="/addProduct"
      >
        Add Product
      </Link>

      <div className="row ">
        {myProducts.map((item, index) => {
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
              <div className="text-secondary fs-4 mt-2">${item.itemPrice}</div>
              <p className="text-secondary fs-3 fw-normal">{item.itemName}</p>
              <Link
                to={`/edit-product/${item.itemId}`}
                className="stretched-link"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
