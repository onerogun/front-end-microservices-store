import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Images } from "./Image";
import { ServerContext } from "../Contexts/ServerContext";
import { CartContext } from "../Contexts/CartContext";
import { ProductContext } from "../Contexts/ProductContext";

export const ProductDetails = (props) => {
  const [itemDetails, setItemDetails] = useState([]);
  const server = useContext(ServerContext);
  const [cart, setCart] = useContext(CartContext);

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
  ] = useContext(ProductContext);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`${server}/itemDetails/getItemDetails/${props.match.params.itemId}`)
      .then((res) => {
        console.log(res.data.itemDetailsList);
        setItemDetails(res.data.itemDetailsList);
      });
  }, [props.match.params.itemId]);

  const item = products.find(
    (item) => item.itemId == props.match.params.itemId
  );

  function handleClick() {
    setCart((prev) => [...prev, { itemId: item.itemId, quantity: quantity }]);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4 col-md-5 col-sm-8 m-4">
          <Images itemId={props.match.params.itemId} />
        </div>
        <div className="col-md-5 mt-2">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Properties</th>
              </tr>
            </thead>
            <tbody>
              {itemDetails
                ? itemDetails.map((item, index) => {
                    return (
                      <tr className="col" key={index}>
                        <td className="col-md-3 col-sm-5">{item.nameOf}</td>
                        <td className="col-md-3 col-sm-5">
                          {" : " + item.valueOf}
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
          <a
            className="btn btn-primary"
            role="button"
            href={`/edit-product-description/${props.match.params.itemId}`}
          >
            Edit Item Properties
          </a>
        </div>
        <div className="col-md-2 mt-2">
          <p className="fs-2">$ {item ? item.itemPrice : null}</p>

          <label className="form-label me-2" for="selectqty">
            Quantity:
          </label>
          <select
            id="selectqty"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          >
            <option selected value="1">
              1
            </option>
            <option selected value="2">
              2
            </option>
            <option selected value="3">
              3
            </option>
            <option selected value="4">
              4
            </option>
            <option selected value="5">
              5
            </option>
          </select>

          <button className="btn btn-primary" onClick={handleClick}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

/*
{Object.keys(itemDetails).map((currentKey, index) => {
    return (
      <tr className="col" key={index}>
        <td className="col-md-3 col-sm-5">{currentKey} :</td>
        <td className="col-md-3 col-sm-5">
          {itemDetails[currentKey]}
        </td>
      </tr>
    );
  })}
  */
