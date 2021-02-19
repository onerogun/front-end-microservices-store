import { useState, useContext, useMemo } from "react";
import { ServerContext } from "../Contexts/ServerContext";
import axios from "axios";
import { UploadProductImage } from "../Images/UploadProductImage";
import { CustomerProfileContext } from "../Contexts/CustomerProfileContext";
import { ProductContext } from "../Contexts/ProductContext";

export const AddProduct = (props) => {
  const server = useContext(ServerContext);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("0.0");
  const [category, setCategory] = useState("");
  const [inStock, setInStock] = useState(0);
  const [featured, setFeatured] = useState(false);

  const [validated, setValidated] = useState(false);

  const [newItemSaved, setNewItemSaved] = useState([]);

  const { setProductChange } = useContext(ProductContext);

  const {
    customerProfile,
    userProfile,
    setCustomerProfile,
    setUserProfile,
  } = useContext(CustomerProfileContext);

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

  const [itemSaving, setItemSaving] = useState([]);

  const sendToServer = (product) => {
    axios
      .post(`${server}/items/addItem/${customerProfile.customerId}`, newItem, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("TokenJWT"),
        },
      })
      .then((response) => {
        console.log("item sent to server");
        console.log(response.data);
        setItemSaving(response.data);
        setNewItemSaved((prev) => [...prev, 1]);
        setProductChange((prev) => [...prev, 1]);
        window.alert("Item saved!");
        props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
        window.alert("An error occured!!");
      });
  };

  /*const savedItem = useMemo(() => {
    console.log(itemSaving);
    return itemSaving;
  }, [itemSaving]);
*/
  const validateForm = () => {
    return (
      itemName.length > 0 && itemPrice > 0 && category.length > 0 && inStock > 0
    );
  };

  return (
    <div className="container pt-5">
      <div className="row justify-content-center">
        <form
          className="col-6 g-3 needs-validation"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <div className="col-7">
            <label for="itemname" className="form-label">
              Product Name
            </label>
            <input
              autoFocus
              className="form-control"
              id="itemname"
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </div>
          <div className="col-7">
            <label for="itemprice" className="form-label">
              Product Price
            </label>
            <input
              className="form-control"
              id="itemprice"
              type="text"
              onChange={(e) => setItemPrice(parseFloat(e.target.value))}
              required
            />
          </div>
          <div className="col-7">
            <label for="itemcategory" className="form-label">
              Product Category
            </label>
            <input
              id="itemcategory"
              className="form-control"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />

            <div className="col-7">
              <label for="itemnuminstock" className="form-label">
                Number of Product in Stock
              </label>
              <input
                id="itemnuminstock"
                className="form-control"
                type="text"
                value={inStock}
                onChange={(e) => {
                  setInStock(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className="col-12">
            <div className="form-check">
              <label for="itemfeatured" className="from-check-label">
                Product Featured
              </label>
              <input
                className="form-check-input"
                id="itemfeatured"
                type="checkbox"
                value={featured}
                onChange={(e) => setFeatured((prev) => !prev)}
              />
            </div>
          </div>
          <div className="col-12">
            <button
              className="btn btn-primary p-2"
              type="submit"
              disabled={!validateForm()}
            >
              Add Product
            </button>
          </div>
        </form>
        <div className="col-4 my-auto">
          <UploadProductImage
            itemId={itemSaving.itemId}
            newItemSaved={newItemSaved}
          />
        </div>
      </div>
    </div>
  );
};
