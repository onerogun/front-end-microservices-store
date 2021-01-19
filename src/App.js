import React from "react";
import { ServerProvider } from "./Contexts/ServerContext";
import { Product } from "./ProductSource/Product";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AddProduct } from "./ProductSource/AddProduct";
import { ProductProvider } from "./Contexts/ProductContext";
import { Login } from "./Auth/Login";
import { CustomerSignUp } from "./Components/CustomerSignUp";
import { NavBar } from "./Components/Navbar";
import { Images } from "./ProductSource/Image";
import { ProductDetails } from "./ProductSource/ProductDetails";
import { EditProductDescription } from "./ProductSource/EditProductDescription";
import { LoginSuccessProvider } from "./Contexts/LoginSuccessContext";
import { CustomerProfileProvider } from "./Contexts/CustomerProfileContext";
import { CustomerProfile } from "./Components/CustomerProfile";
import { EditCustomerProfile } from "./Components/EditCustomerProfile";
import { PasswordResetRequest } from "./Auth/PasswordResetRequest";
import { PasswordReset } from "./Auth/PasswordReset";

function App() {
  return (
    <BrowserRouter>
      <ServerProvider>
        <LoginSuccessProvider>
          <CustomerProfileProvider>
            <ProductProvider>
              <React.Fragment>
                <NavBar />
                <Switch>
                  <Route exact path="/" component={Product} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/profile" component={CustomerProfile} />
                  <Route
                    exact
                    path="/edit-profile"
                    component={EditCustomerProfile}
                  />
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
                  <Route
                    path="/passwordResetRequest"
                    component={PasswordResetRequest}
                  />
                  <Route
                    path="/passwordReset/:uuid"
                    component={PasswordReset}
                  />
                </Switch>
              </React.Fragment>
            </ProductProvider>
          </CustomerProfileProvider>
        </LoginSuccessProvider>
      </ServerProvider>
    </BrowserRouter>
  );
}

export default App;
