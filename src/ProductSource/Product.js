import React, { useContext } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { ProductContext } from "../Contexts/ProductContext";

export const Product = () => {
  const products = useContext(ProductContext);

  return (
    <div className="row row-cols-1 row-cols-md-4 g-4">
      {products.map((item) => {
        return (
          <div className="col my-2" key={item.itemId}>
            <div className="card">
              <h5 className="card-title">Name: {item.itemName}</h5>
              <Card.Text>Category:{item.itemCategory}</Card.Text>
              <h5 className="card-title">Price: {item.itemPrice}</h5>
              <div className="card-body">
                <Row>
                  <Col>
                    <Card.Text className="text-muted m-2">
                      ID:{item.itemId}
                    </Card.Text>
                  </Col>
                  <Col>
                    <Card.Text className="text-muted m-2">
                      Featured:{item.itemFeatured === true ? "yes" : "no"}
                    </Card.Text>
                  </Col>
                  <Col>
                    <Card.Text className="text-muted m-2">
                      LeftInStock:{item.itemLeftInStock}
                    </Card.Text>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
