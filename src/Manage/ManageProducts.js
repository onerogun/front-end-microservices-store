import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductCoverImage } from "../Images/ProductCoverImage";
import { ManagedProductContext } from "../Contexts/ManagedProductContext";
import axios from "axios";
import { ServerContext } from "../Contexts/ServerContext";
import { CustomerProfileContext } from "../Contexts/CustomerProfileContext";
import { ProductContext } from "../Contexts/ProductContext";

export const ManageProducts = () => {
  const { myProducts, itemUpdate, setItemUpdate } = useContext(
    ManagedProductContext
  );
  const server = useContext(ServerContext);
  const [hoverArr, setHoverArr] = useState([]);

  const { setProductChange } = useContext(ProductContext);

  const {
    customerProfile,
    userProfile,
    setCustomerProfile,
    setUserProfile,
  } = useContext(CustomerProfileContext);

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

  function handleDeleteProduct(itemId) {
    axios
      .delete(
        `${server}/items/deleteItem/${itemId}/${customerProfile.customerId}`,
        {
          headers: {
            Authorization: localStorage.getItem("TokenJWT"),
          },
        }
      )
      .then((res) => {
        console.log("item deleted:" + res);
        //Fetch user items again
        setItemUpdate((prev) => [...prev, 1]);
        setProductChange((prev) => [...prev, 1]);
      })
      .catch((err) => console.log("item could not be deleted: " + err));
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
                  ? "col-md-5 col-lg-2 col-12 justify-content-center p-2 m-2 border border-primary rounded-3 overflow-hidden"
                  : "col-md-5 col-lg-2 col-12 justify-content-center p-2 m-2 border border-light rounded-3 overflow-hidden"
              }
              key={item.itemId}
              onMouseEnter={(e) => mouseEntered(index)}
              onMouseLeave={(e) => mouseLeaved(index)}
            >
              <div className="position-relative">
                <ProductCoverImage itemId={item.itemId} />
                <div className="text-secondary fs-4 mt-2">
                  ${item.itemPrice}
                </div>
                <p className="text-secondary fs-3 fw-normal">{item.itemName}</p>
                <Link
                  to={`/edit-product/${item.itemId}`}
                  className="stretched-link"
                />
              </div>
              <button
                className="btn btn-danger"
                onClick={(e) => handleDeleteProduct(item.itemId)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
