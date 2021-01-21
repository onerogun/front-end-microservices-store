import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { ServerContext } from "../Contexts/ServerContext";

export const Images = (props) => {
  //  const [path, setPath] = useState([]);
  //  const [loading, setLoading] = useState(true);
  const server = useContext(ServerContext);

  //Memorize previous images
  const pics = useRef([]);
  const [imgs, setImgs] = useState();

  useEffect(() => {
    FetchPath();
  }, []);

  const FetchPath = () => {
    //Method returns a list of path locations for a particular item.
    axios
      .get(`${server}/items/getItemFileLocations/${props.itemId}`)
      .then((res) => {
        //  console.log(res.data.pathObjList);
        //setPath(res.data.pathObjList);
        //paths.current = res.data.pathObjList;
        // setLoading(false);

        /**
         * For returned path list, load each image from server and add to (pics) Ref, destructure the Ref first and add loaded image
         */
        res.data.pathObjList.map((pathObj) => {
          const src = `${server}/storage/getItemFiles/${pathObj.itemId}/${pathObj.path}`;
          var imageToLoad = new Image();
          imageToLoad.src = src;
          imageToLoad.onload = () => {
            //Keep memorizing images
            pics.current = [...pics.current, imageToLoad];
            // Add to state for re-render
            setImgs(pics.current);
          };
        });
      })
      .catch((err) => console.log(err));
  };

  //Reference to the main img to change src with mainImage.current.src
  const mainImage = useRef();

  //Used to connect to next and previous buttons
  const prev = useRef();
  const next = useRef();

  //first Index always 0
  const [firstIndex, setFirstIndex] = useState(0);
  const first = useRef(0);

  //increase first index with modulus
  function goNext() {
    first.current = (first.current + 1) % imgs.length;
    setFirstIndex(first.current);
  }

  //decrease first index with modulus
  function goPrev() {
    first.current = (first.current - 1 + imgs.length) % imgs.length;
    setFirstIndex(first.current);
  }

  //if null return
  if (!imgs) {
    return null;
  }
  //get 3 consequent pics and put in a list
  let listOf3DashImages;

  if (imgs.length > 0 && imgs[firstIndex] != null) {
    listOf3DashImages = [imgs[firstIndex]];
  }

  if (imgs.length > 1 && imgs[(firstIndex + 1) % imgs.length] != null) {
    listOf3DashImages = [
      imgs[firstIndex],
      imgs[(firstIndex + 1) % imgs.length],
    ];
  }
  if (imgs.length > 2 && imgs[(firstIndex + 2) % imgs.length] != null) {
    listOf3DashImages = [
      imgs[firstIndex],
      imgs[(firstIndex + 1) % imgs.length],
      imgs[(firstIndex + 2) % imgs.length],
    ];
  }
  //function to change main picture using useRef hook
  //make main image point to clicked image's src
  //button id is same as image's place in array
  const selectMain = (e) => {
    const imgId = e.target.id;
    mainImage.current.src = listOf3DashImages[imgId].src;
  };

  /**
   * Two rows inside a container to seperate different functionalities from each other
   */
  return (
    <div className="container ">
      <div className="row row-cols-1 pb-2">
        <div className="col-10">
          <div className="card">
            <div className="img-container">
              <img
                ref={mainImage}
                alt="Product"
                className="card-img-top"
                src={imgs[0].src}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row row-cols-3 carousel slide">
        {listOf3DashImages.map((imgg, index) => {
          return (
            <div className="col-3 position-relative" key={index}>
              <div className="card">
                <div className="img-container">
                  <img alt="Product" className="card-img-top" src={imgg.src} />
                  <a
                    href="#"
                    role="button"
                    className="stretched-link"
                    id={index}
                    onClick={selectMain}
                  />
                </div>
              </div>
            </div>
          );
        })}
        <a
          ref={prev}
          hidden={imgs.length < 4 ? true : false}
          onClick={goPrev}
          class="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-bs-slide="prev"
        >
          <span
            class="carousel-control-prev-icon bg-dark"
            aria-hidden="true"
          ></span>
          <span class="visually-hidden">Previous</span>
        </a>
        <a
          ref={next}
          hidden={imgs.length < 4 ? true : false}
          onClick={goNext}
          class="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-bs-slide="next"
        >
          <span
            class="carousel-control-next-icon bg-dark"
            aria-hidden="true"
          ></span>
          <span class="visually-hidden">Next</span>
        </a>
      </div>
    </div>
  );
};
