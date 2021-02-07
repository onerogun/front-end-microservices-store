import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { ServerContext } from "../Contexts/ServerContext";
import { UploadProductImage } from "./UploadProductImage";

export const EditPictures = (props) => {
  const [picPath, setPicPath] = useState([]);
  const server = useContext(ServerContext);
  const [triggerReRender, setTriggerReRender] = useState([]);

  const savePics = useRef([]);

  useEffect(() => {
    FetchPath();
  }, [triggerReRender]);

  const [picMap, setPicMap] = useState([]);
  const [addPic, setAddPic] = useState([]);

  const FetchPath = () => {
    //Method returns a list of path locations for a particular item.
    if (props.match.params.itemId) {
      axios
        .get(
          `${server}/items/getItemFileLocations/${props.match.params.itemId}`
        )
        .then((res) => {
          console.log(res.data);
          setPicPath(res.data.pathList);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (picPath) {
      setPicMap([]);
      savePics.current = [];
      picPath.map((path) => {
        const src = `${server}/storage/getItemFiles/${props.match.params.itemId}/${path}`;
        var imageToLoad = new Image();
        imageToLoad.src = src;
        imageToLoad.onload = () => {
          if (savePics.current.findIndex((picc) => picc.path == path) < 0) {
            savePics.current = [
              ...savePics.current,
              {
                itemId: props.match.params.itemId,
                path: path,
                image: imageToLoad,
              },
            ];
            let setArr = new Set(savePics.current);
            setPicMap([...setArr]);
          }
        };
      });
    }
  }, [picPath]);

  console.log(picMap);

  function handleDeletePic(itemId, path) {
    axios
      .delete(`${server}/storage/deleteItemFiles/${itemId}/${path}`)
      .then((res) => {
        console.log(res);
        setPicMap((prev) => prev.filter((pic) => pic.path !== path));
      })
      .catch((err) => console.log(err));
  }

  function handleAddPics() {
    setAddPic((prev) => [...prev, 1]);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-8">
          <div className="row">
            {picMap.map((pic, index) => {
              return (
                <div className="col-4" key={index}>
                  <div className="card">
                    <div className="img-container">
                      <img
                        alt="Product"
                        className="card-img-top"
                        src={pic.image.src}
                      />
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={(e) => handleDeletePic(pic.itemId, pic.path)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-4 my-auto">
          <div className="row">
            <div className="col">
              <UploadProductImage
                itemId={props.match.params.itemId}
                newItemSaved={addPic}
                rerender={setTriggerReRender}
              />
            </div>
          </div>
          <div className="row ">
            <div className="col">
              <button
                className="btn btn-primary"
                type="button"
                onClick={(e) => handleAddPics()}
              >
                Save Pictures
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
