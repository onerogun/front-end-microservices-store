import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Images } from "../ProductSource/Image";
import { ServerContext } from "../Contexts/ServerContext";
import { CartContext } from "../Contexts/CartContext";
import { ProductContext } from "../Contexts/ProductContext";
import { Link } from "react-router-dom";

export const EditProduct = (props) => {
  const [itemDetails, setItemDetails] = useState([]);
  const server = useContext(ServerContext);
  const [cart, setCart, savedCart] = useContext(CartContext);

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

  const [itemAmount, setItemAmount] = useState(1);

  useEffect(() => {
    axios
      .get(`${server}/itemDetails/getItemDetails/${props.match.params.itemId}`)
      .then((res) => {
        setItemDetails(res.data.itemDetailsList);
      });
  }, [props.match.params.itemId]);

  const item = products.find(
    (item) => item.itemId === parseInt(props.match.params.itemId)
  );

 
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
          <Link
            className="btn btn-primary"
            to={`/edit-product-description/${props.match.params.itemId}`}
          >
            Edit Item Properties
          </Link>
          <Link
            className="btn btn-primary ms-5"
            to={`/edit-pictures/${props.match.params.itemId}`}
          >
            Edit Pictures
          </Link>
        </div>
        <div className="col-md-2 mt-2">
          <p className="fs-2">$ {item ? item.itemPrice : null}</p>
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
