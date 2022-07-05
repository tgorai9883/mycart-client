import React, { useEffect,useState } from "react";
import { Button, Col, Form, Image, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";
import { useDispatch,useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";

function ProductDetails({ history,match }) {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector(state=>state.productDetails);
  const {loading, product, error} = productDetails;
  useEffect(()=>{
    dispatch(listProductDetails(match.params.id));
  },[dispatch,match]);
  return (loading? <Loader/> : error ? <Message variant="danger">{error}</Message>:
    <div>
    <Link to="/" className="btn btn-light"><i className="fas fa-arrow-circle-left"></i>Go Back</Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                value={product.rating}
                text={product.numReviews + "reviews"}
              />
            </ListGroupItem>
            <ListGroupItem>Price : {product.price}</ListGroupItem>
            <ListGroupItem>{product.description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroupItem>
            <Row>
              <Col>Status :</Col>
              <Col>
                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </Col>
            </Row>
          </ListGroupItem>
          {
            product.countInStock > 0 && (
              <ListGroupItem>
                <Row>
                  <Col>Qty</Col>
                  <Form.Control as="select" value={qty} onChange={(event)=>setQty(event.target.value)}>
                    {
                      [...Array(product.countInStock).keys()].map(x=>
                        <option key={x+1} value={x+1}>{x+1}</option>
                      )
                    }
                  </Form.Control>
                </Row>
              </ListGroupItem>
            )
          }
          <ListGroupItem>
              <Button className="btn-block" type="button" onClick={()=>history.push(`/cart/${match.params.id}?qty=${qty}`)} disabled={product.countInStock===0}>
                Add to Cart
              </Button>
          </ListGroupItem>
        </Col>
      </Row>
    </div>
  );
}

export default ProductDetails;