import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Images } from "./Image";
import { ServerContext } from "../Contexts/ServerContext";

export const ProductDetails = (props) => {
  const [itemDetails, setItemDetails] = useState([]);
  const server = useContext(ServerContext);

  useEffect(() => {
    axios
      .get(`${server}/itemDetails/getItemDetails/${props.match.params.itemId}`)
      .then((res) => {
        console.log(res.data.itemDetailsList);
        setItemDetails(res.data.itemDetailsList);
      });
  }, [props.match.params.itemId]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4 col-md-5 col-sm-8 m-4">
          <Images itemId={props.match.params.itemId} />
        </div>
        <div className="col-ld-6 col-md-5 mt-2">
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
