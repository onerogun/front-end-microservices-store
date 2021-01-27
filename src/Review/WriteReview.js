import React, { useState, useEffect, useContext } from "react";
import { ServerContext } from "../Contexts/ServerContext";
import axios from "axios";
import { CustomerProfileContext } from "../Contexts/CustomerProfileContext";

export const WriteReview = (props) => {
  const [review, setReview] = useState([]);
  const server = useContext(ServerContext);
  const [rating, setRating] = useState();

  const [
    customerProfile,
    userProfile,
    setCustomerProfile,
    setUserProfile,
  ] = useContext(CustomerProfileContext);

  function handleSubmit(e) {
    e.preventDefault();

    var itemReview = {
      itemId: props.match.params.itemId,
      reviewOwner: customerProfile.customerId,
      review: review,
      rating: rating,
    };
    console.log(itemReview);

    axios
      .post(`${server}/itemDetails/saveItemReview`, itemReview, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        window.alert("Your review is submitted!");
        props.history.push("/orders");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container">
      <div className="row">
        <form class="col-8 g-3 mx-auto" onSubmit={(e) => handleSubmit(e)}>
          <div class="mb-3">
            <label for="ratingSelect" class="form-label">
              Your Rating
            </label>
            <select
              id="ratingSelect"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              class="form-select"
              aria-label="Default select example"
            >
              <option selected>Rate the product</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
              <option value="4">Four</option>
              <option value="5">Five</option>
            </select>
            <label for="exampleFormControlTextarea1" class="form-label">
              Your Review
            </label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="5"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
          </div>
          <div className="row">
            <div className="col-6">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
