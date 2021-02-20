import { useState, useContext, useMemo, useEffect } from "react";
import { ServerContext } from "../Contexts/ServerContext";
import axios from "axios";
import { CustomerProfileContext } from "../Contexts/CustomerProfileContext";
import { ProductContext } from "../Contexts/ProductContext";
import { ManagedProductContext } from "../Contexts/ManagedProductContext";

export const EditProductDefinition = (props) => {
  const {
    products,
    setProducts,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    sortBy,
    setSortBy,
    numberOfTotalPages,
  } = useContext(ProductContext);

  const server = useContext(ServerContext);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("0.0");
  const [category, setCategory] = useState("");
  const [inStock, setInStock] = useState(0);
  const [featured, setFeatured] = useState(false);

  const [validated, setValidated] = useState(false);

  const [newItemSaved, setNewItemSaved] = useState([]);

  const { setProductChange } = useContext(ProductContext);

  const [itemBeingEdited, setItemBeingEdited] = useState();

  useEffect(() => {
    setItemBeingEdited(
      products.find(
        (item) => item.itemId === parseInt(props.match.params.itemId)
      )
    );
  }, []);

  useEffect(() => {
    if (itemBeingEdited) {
      console.log("feaTURED: " + itemBeingEdited.itemFeatured);
      setItemName(itemBeingEdited.itemName);
      setItemPrice(itemBeingEdited.itemPrice);
      setCategory(itemBeingEdited.itemCategory);
      setInStock(itemBeingEdited.itemLeftInStock);
      setFeatured(itemBeingEdited.itemFeatured);
    }
  }, [itemBeingEdited]);

  const {
    customerProfile,
    userProfile,
    setCustomerProfile,
    setUserProfile,
  } = useContext(CustomerProfileContext);

  const { myProducts, itemUpdate, setItemUpdate } = useContext(
    ManagedProductContext
  );

  const validateForm = () => {
    return (
      itemName.length > 0 && itemPrice > 0 && category.length > 0 && inStock > 0
    );
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    event.preventDefault();
    if (form.checkValidity() === false) {
      //do nothing
    } else {
      sendToServer();
    }
    setValidated((prev) => true);
  };

  function sendToServer() {
    const EditedItem = {
      itemId: props.match.params.itemId,
      itemPrice: itemPrice,
      itemName: itemName,
      itemCategory: category,
      itemFeatured: featured,
      itemLeftInStock: inStock,
      itemOwner: customerProfile.customerId,
    };

    axios
      .put(`${server}/items/updateItem`, EditedItem, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("TokenJWT"),
        },
      })
      .then((res) => {
        console.log(res);
        //Fetch user items again
        setItemUpdate((prev) => [...prev, 1]);
        setProductChange((prev) => [...prev, 1]);
        console.log("item id: " + EditedItem.itemId);
        props.history.push("/edit-product/" + EditedItem.itemId);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container pt-5">
      <div className="row justify-content-center">
        <form
          className="col-6 g-3 needs-validation"
          noValidate
          validated={validated}
          onSubmit={(event) => handleSubmit(event)}
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
              value={itemPrice}
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
                checked={featured}
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
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
