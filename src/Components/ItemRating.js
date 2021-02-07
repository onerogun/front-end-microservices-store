import React, { useState, useEffect, useContext, useRef } from "react";
import { ServerContext } from "../Contexts/ServerContext";
import axios from "axios";
import styles from "./star.module.css";

export const ItemRating = ({ itemId, showNumberOfRaters }) => {
  const [rating, setRating] = useState(0);
  const server = useContext(ServerContext);
  const [numberOfRatings, setNumberOfRatings] = useState();

  useEffect(() => {
    axios
      .get(`${server}/itemDetails/getItemRating/${itemId}`)
      .then((res) => {
        console.log(res);
        if (res.data.itemRating) {
          setRating(res.data.itemRating);
          setNumberOfRatings(res.data.numberOfRatings);
        }
      })
      .catch((err) => console.log(err));
  }, [itemId]);

  return (
    <div className={styles.Stars} style={{ "--rating": rating }}>
      {showNumberOfRaters && numberOfRatings ? <span> {numberOfRatings} ratings</span> : null}
    </div>
  );
};
