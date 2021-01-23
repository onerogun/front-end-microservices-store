import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { ServerContext } from "../Contexts/ServerContext";

export const EditPictures = (props) => {
  const [picPath, setPicPath] = useState([]);
  const server = useContext(ServerContext);

  useEffect(() => {
    FetchPath();
  }, []);

  const [picMap, setPicMap] = useState([]);

  useEffect(() => {
    if (picPath) {
      console.log(picPath);
      picPath.map((pathObj, index) => {
        console.log("yo");
        const src = `${server}/storage/getItemFiles/${pathObj.itemId}/${pathObj.path}`;
        var imageToLoad = new Image();
        imageToLoad.src = src;
        imageToLoad.onload = () => {
          setPicMap((prev) => [
            ...prev,
            { itemId: pathObj.itemId, path: pathObj.path, image: imageToLoad },
          ]);
        };
      });
    }
  }, [picPath]);

  const FetchPath = () => {
    //Method returns a list of path locations for a particular item.
    if (props.match.params.itemId) {
      axios
        .get(
          `${server}/items/getItemFileLocations/${props.match.params.itemId}`
        )
        .then((res) => {
          console.log(res.data);
          setPicPath(res.data.pathObjList);
        })
        .catch((err) => console.log(err));
    }
  };
  console.log(picMap);

  return (
    <div className="container">
      <div className="row">
        {picMap.map((pic, index) => {
          return (
            <div className="col-3" key={index}>
              <div className="card">
                <div className="img-container">
                  <img
                    alt="Product"
                    className="card-img-top"
                    src={pic.image.src}
                  />
                  <p>Path: {pic.path}</p>
                  <p>ID: {pic.itemId}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
