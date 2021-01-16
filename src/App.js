import React from "react";
import { ServerProvider } from "./Contexts/ServerContext";
import { Product } from "./ProductSource/Product";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AddProduct } from "./ProductSource/AddProduct";
import { ProductProvider } from "./Contexts/ProductContext";
import { Login } from "./Auth/Login";
import { CookiesProvider } from "react-cookie";
import { CustomerSignUp } from "./Components/CustomerSignUp";
import { NavBar } from "./Components/Navbar";
import { Images } from "./ProductSource/Image";
import { ProductDetails } from "./ProductSource/ProductDetails";
import { EditProductDescription } from "./ProductSource/EditProductDescription";

function App() {
  return (
    <BrowserRouter>
      <CookiesProvider>
        <ServerProvider>
          <ProductProvider>
            <React.Fragment>
              <NavBar />
              <Switch>
                <Route exact path="/" component={Product} />
                <Route exact path="/login" component={Login} />
                <Route path="/addProduct" component={AddProduct} />
                <Route path="/signUp" component={CustomerSignUp} />
                <Route path="/image/:itemId" component={Images} />
                <Route
                  path="/product-details/:itemId"
                  component={ProductDetails}
                />
                <Route
                  path="/edit-product-description/:itemId"
                  component={EditProductDescription}
                />
              </Switch>
            </React.Fragment>
          </ProductProvider>
        </ServerProvider>
      </CookiesProvider>
    </BrowserRouter>
  );
}

export default App;
