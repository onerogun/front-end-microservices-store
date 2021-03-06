import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ServerContext } from "../Contexts/ServerContext";
import icon from "../icon/product.svg";

export const ProductCoverImage = (props) => {
  const [path, setPath] = useState([]);
  const [loading, setLoading] = useState(true);
  const server = useContext(ServerContext);

  useEffect(() => {
    FetchPath();
  }, []);

  const FetchPath = () => {
    axios
      .get(`${server}/items/getItemFileLocations/${props.itemId}`)
      .then((res) => {
        console.log(res.data);
        if (res.data != null) {
          setPath(res.data.pathList);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  let firstPicPath;
  if (!loading) {
    if (path != null) {
      firstPicPath = path[0];
    }
  }

  if (!firstPicPath) {
    return (
      <img
        src={icon}
        style={{ height: "15rem", width: "15rem" }}
        className="img-fluid"
        alt="Product"
      />
    );
  }

  console.log("path:" + firstPicPath);
  console.log("itemid: " +props.itemId)


  return (
    <img
      style={{ height: "15rem", width: "15rem" }}
      alt="Product"
      className="img-fluid"
      src={`${server}/storage/getItemFiles/${props.itemId}/${firstPicPath}`}
    />
  );
};
