import React, { useState, useEffect, useContext, useRef } from "react";
import { ServerContext } from "../Contexts/ServerContext";
import { ItemRating } from "../Components/ItemRating";

export const Reviews = ({ itemId }) => {
  const [reviews, setReviews] = useState([]);
  const server = useContext(ServerContext);

  const [fetchDone, setFetchDone] = useState(false);
  const fetched = useRef(false);
  /*
  useEffect(() => {
    axios
      .get(`${server}/itemDetails/getItemsReviews/${itemId}`)
      .then((res) => {
        console.log(res.data);
        setReviews(res.data);
      })
      .catch((err) => console.log(err));
  }, [itemId]);
*/

  /**
   * start streaming and if there is an element with existing id, it means stream started again
   * and then close the stream.
   * reviewArray is necessary to store streamed items
   */
  useEffect(() => {
    const source = new EventSource(
      `${server}/itemDetails/getItemsReviews/${itemId}`
    );
    console.log(reviews);
    var reviewArray = [];
    source.onmessage = function logEvents(event) {
      console.log(reviewArray);
      const e = JSON.parse(event.data);
      if (reviewArray.findIndex((r) => r.id == e.id) > -1) {
        source.close();
      } else {
        reviewArray = [...reviewArray, e];
        setReviews(reviewArray);
      }
    };
  }, []);

  if (!reviews) {
    return null;
  }

  /*
{reviews.map((eachReview, index) => {
        return (
          <div key={index}>
            <p>{eachReview.review}</p>
          </div>
        );
      })}

  */

  return (
    <div className="container">
      <h3>Product Reviews</h3>
      <p>
        Rating: <ItemRating itemId={itemId} />{" "}
      </p>
      {reviews.map((eachReview, index) => {
        return (
          <div className="m-3 border border-primary rounded-3" key={index}>
            <p>{eachReview.review}</p>
          </div>
        );
      })}
    </div>
  );
};
