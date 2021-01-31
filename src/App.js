import React from "react";
import { ServerProvider } from "./Contexts/ServerContext";
import { Product } from "./ProductSource/Product";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AddProduct } from "./ProductSource/AddProduct";
import { ProductProvider } from "./Contexts/ProductContext";
import { Login } from "./Auth/Login";
import { CustomerSignUp } from "./SignUp/CustomerSignUp";
import { NavBar } from "./Components/Navbar";
import { Images } from "./Images/Image";
import { ProductDetails } from "./ProductSource/ProductDetails";
import { EditProductDescription } from "./ProductSource/EditProductDescription";
import { LoginSuccessProvider } from "./Contexts/LoginSuccessContext";
import { CustomerProfileProvider } from "./Contexts/CustomerProfileContext";
import { CustomerProfile } from "./Profile/CustomerProfile";
import { EditCustomerProfile } from "./Profile/EditCustomerProfile";
import { PasswordResetRequest } from "./Auth/PasswordResetRequest";
import { PasswordReset } from "./Auth/PasswordReset";
import { Cart } from "./Cart/Cart";
import CartProvider from "./Contexts/CartContext";
import { Orders } from "./Orders/Orders";
import { EditPictures } from "./Images/EditPictures";
import { ManageProducts } from "./Manage/ManageProducts";
import { EditProduct } from "./Manage/EditProduct";
import { ManagedProductProvider } from "./Contexts/ManagedProductContext";
import { WriteReview } from "./Review/WriteReview";
import { Chat } from "./Chat/Chat";
import { ChatProvider } from "./Contexts/ChatContext";

function App() {
  return (
    <BrowserRouter>
      <ServerProvider>
        <LoginSuccessProvider>
          <CustomerProfileProvider>
            <ManagedProductProvider>
              <ProductProvider>
                <CartProvider>
                  <ChatProvider>
                    <React.Fragment>
                      <NavBar />
                      <Switch>
                        <Route exact path="/" component={Product} />
                        <Route exact path="/login" component={Login} />
                        <Route
                          exact
                          path="/profile"
                          component={CustomerProfile}
                        />
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
                        <Route exact path="/cart" component={Cart} />
                        <Route exact path="/orders" component={Orders} />
                        <Route
                          path="/edit-pictures/:itemId"
                          component={EditPictures}
                        />
                        <Route
                          exact
                          path="/manage-products"
                          component={ManageProducts}
                        />
                        <Route
                          path="/edit-product/:itemId"
                          component={EditProduct}
                        />
                        <Route
                          path="/review-item/:itemId"
                          component={WriteReview}
                        />
                        <Route path="/chat/:sendTo" component={Chat} />
                      </Switch>
                    </React.Fragment>
                  </ChatProvider>
                </CartProvider>
              </ProductProvider>
            </ManagedProductProvider>
          </CustomerProfileProvider>
        </LoginSuccessProvider>
      </ServerProvider>
    </BrowserRouter>
  );
}

export default App;
