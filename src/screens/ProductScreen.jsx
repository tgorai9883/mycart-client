import React from "react";
import { Card } from "react-bootstrap";
import Rating from "../components/Rating";
import {Link} from "react-router-dom";

function ProductScreen({ product }) {
  return (
    <>
      <Card className="my-3 p-3 rounded">
        <Link to={"/product/"+product._id}>
          <Card.Img src={product.image} variant="top" />
        </Link>
        <Card.Title>
          <Link to={"/product/"+product._id}>
            <strong>{product.name}</strong>
          </Link>
          <Rating
            value={product.rating}
            text={product.numReviews + " reviews"}
          />
          <Card.Text as="div">$ {product.price}</Card.Text>
        </Card.Title>
      </Card>
    </>
  );
}

export default ProductScreen;
