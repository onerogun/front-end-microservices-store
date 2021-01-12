import { useState, useContext } from "react";
import { ServerContext } from "../Contexts/ServerContext";
import axios from "axios";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

export const AddProduct = () => {
  const server = useContext(ServerContext);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("0.0");
  const [category, setCategory] = useState("");
  const [inStock, setInStock] = useState(0);
  const [featured, setFeatured] = useState(false);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    event.preventDefault();
    if (form.checkValidity() === false) {
    } else {
      sendToServer(newItem);
    }
    setValidated((prev) => true);
  };

  const newItem = {
    itemPrice: itemPrice,
    itemName: itemName,
    itemCategory: category,
    itemFeatured: featured,
    itemLeftInStock: inStock,
  };

  const sendToServer = (product) => {
    axios
      .post(`${server}/items/addItem`, newItem, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("TokenJWT"),
        },
      })
      .then(() => {
        console.log("item sent to server");
        window.alert("Item saved!");
      })
      .catch((err) => {
        console.log(err);
        window.alert("An error occured!!");
      });
  };

  const validateForm = () => {
    return (
      itemName.length > 0 && itemPrice > 0 && category.length > 0 && inStock > 0
    );
  };

  return (
    <Container>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={itemName}
            onChange={(e) => setItemName((prev) => e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setItemPrice(parseFloat(e.target.value))}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Product Category</Form.Label>
          <Form.Control
            type="text"
            value={category}
            onChange={(e) => setCategory((prev) => e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Product Featured:</Form.Label>
          <Form.Control
            type="checkbox"
            value={featured}
            onChange={(e) => setFeatured((prev) => !prev)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Number of Product in Stock</Form.Label>
          <Form.Control
            type="number"
            value={inStock}
            onChange={(e) => {
              setInStock(e.target.valueAsNumber);
              console.log(e.target.valueAsNumber);
            }}
            required
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Add Product
        </Button>
        <Link to="/" className="m-5">
          <Button block size="lg">
            Home
          </Button>
        </Link>
      </Form>
    </Container>
  );
};
