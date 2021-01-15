import { useState, useEffect } from "react";
import axios from "axios";
import { Images } from "./Image";

export const ProductDetails = (props) => {
  const [itemD, setItemD] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9191/itemDetails/getItemDetails/2")
      .then((res) => {
        // console.log(res.data);
        setItemD(res.data.details);
      });
  }, [props.match.params.itemId]);

  return (
    <div className="row">
      <div className="col-lg-4 col-md-5 col-sm-8 m-4">
        <Images itemId={props.match.params.itemId} />
      </div>
      <div className="col-ld-6 col-md-5  mt-4">
        <table className="table">
          <tbody>
            {Object.keys(itemD).map((currentKey, index) => {
              return (
                <tr className="col" key={index}>
                  <td className="col-md-3 col-sm-5">{currentKey} :</td>
                  <td className="col-md-3 col-sm-5">{itemD[currentKey]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
