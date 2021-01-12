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
import { Image } from "./ProductSource/Image";

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
                <Route path="/addProduct" component={AddProduct} />
                <Route exact path="/login" component={Login} />
                <Route path="/signUp" component={CustomerSignUp} />
                <Route path="/image" component={Image} />
              </Switch>
            </React.Fragment>
          </ProductProvider>
        </ServerProvider>
      </CookiesProvider>
    </BrowserRouter>
  );
}

export default App;
