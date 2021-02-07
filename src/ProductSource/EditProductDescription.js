import React, { useState, useEffect, useContext } from "react";
import { ServerContext } from "../Contexts/ServerContext";
import axios from "axios";

export const EditProductDescription = (props) => {
  const [inputFields, setInputFields] = useState([{ nameOf: "", valueOf: "" }]);

  const server = useContext(ServerContext);

  useEffect(() => {
    axios
      .get(`${server}/itemDetails/getItemDetails/${props.match.params.itemId}`)
      .then((res) => {
        console.log(res.data.itemDetailsList);
        if (res.data.itemDetailsList) {
          setInputFields(res.data.itemDetailsList);
        }
      });
  }, [props.match.params.itemId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputFields);

    const itemDetailsToSend = {
      itemId: props.match.params.itemId,
      itemDetailsList: inputFields,
    };

    console.log(itemDetailsToSend);

    axios
      .post(`${server}/itemDetails/saveItemDetails`, itemDetailsToSend, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        window.alert("Item details saved!");
        props.history.push(`/product-details/${props.match.params.itemId}`);
      })
      .catch((err) => console.log(err));
  };

  const addField = () => {
    setInputFields([...inputFields, { nameOf: "", valueOf: "" }]);
  };

  const removeField = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  function handleInputChange(event, index) {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  }

  if (!inputFields) {
    return null;
  }

  return (
    <div className="container ">
      <h2 className="text-center">Enter/Edit Product Properties</h2>
      <form onSubmit={handleSubmit}>
        {inputFields.map((field, index) => {
          return (
            <div className="row my-4" key={index}>
              <div className="col-3 form-floating">
                <input
                  type="text"
                  name="nameOf"
                  id="floatingNameOf"
                  className="form-control"
                  placeholder="Property"
                  value={field.nameOf}
                  onChange={(e) => handleInputChange(e, index)}
                />
                <label for="floatingNameOf">Property Name</label>
              </div>
              <div className="col-7 form-floating">
                <input
                  type="text"
                  name="valueOf"
                  id="floatingValueOf"
                  className="form-control"
                  placeholder="Property Value"
                  value={field.valueOf}
                  onChange={(e) => handleInputChange(e, index)}
                />
                <label for="floatingValueOf">Property Value</label>
              </div>
              <div className="col-2">
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => removeField(index)}
                >
                  Remove Field
                </button>
              </div>
            </div>
          );
        })}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button
          className="btn btn-secondary mx-5"
          type="button"
          onClick={addField}
        >
          Add New Field
        </button>
      </form>
    </div>
  );
};
