import { useState } from "react";
import axios from "axios";

export const Image = () => {
  const [itemFileLocations, setItemFileLocations] = useState([]);

  axios
    .get("http://localhost:9191/items/getItemFileLocations/5")
    .then((res) => {
      console.log(res);
      setItemFileLocations(res.data);
    })
    .catch((err) => console.log(err));

  return (
    <img
      src="http://localhost:9696/storage/getItemFiles/5"
      alt="product"
      className="card-img-top"
    />
  );
};
