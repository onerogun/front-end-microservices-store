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
        //  console.log(res.data.pathObjList);
        if (res.data != null) {
          setPath(res.data.pathObjList);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  let obj;
  if (!loading) {
    if (path != null) {
      obj = path[0];
    }
  }

  if (!obj) {
    return (
      <img
        src={icon}
        style={{ height: "15rem", width: "15rem" }}
        className="img-fluid"
        alt="Product"
      />
    );
  }

  return (
    <img
      style={{ height: "15rem", width: "15rem" }}
      alt="Product"
      className="img-fluid"
      src={`http://localhost:9696/storage/getItemFiles/${obj.itemId}/${obj.path}`}
    />
  );
};
