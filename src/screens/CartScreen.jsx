import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartAction';
import { Button, Card, Col, Form, Image, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import Message from "../components/shared/Message";
import { Link } from 'react-router-dom';

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  },[dispatch, productId, qty]);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const checkout = ()=> {
    history.push(`/login?redirect=shipping`);
  }
  return (
    <>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? 
            <Message>Your Cart is Empty! <Link to="/">  Back To Home</Link></Message>: 
            <ListGroup variant="flush">
              {cartItems.map((item) => 
                <ListGroupItem>
                  <Row>
                    <Col md={2}><Image src={item.image} alt={item.name} fluid rounded /></Col>
                    <Col md={3}><Link to={`/product/${item.product}`}>{item.name}</Link></Col>
                    <Col md={2}>${item.price}</Col>
                    <Col>
                      <Form.Control as="select" value={item.qty} onChange={(event)=>dispatch(addToCart(item.product,Number(event.target.value)))}>
                        {[...Array(item.countInStock).keys()].map((x) => 
                          <option key={x + 1} value={x + 1}>{x + 1}</option>
                        )}
                      </Form.Control>
                      <Button type="button" variant="light" onClick={() => dispatch(removeFromCart(item.product))}>
                        <i className="fas fa-trash-alt"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              )}
            </ListGroup>
          }
        </Col>
        <Col md={4}>
          <Card>
            <ListGroupItem>
              <h4>Total Items : {cartItems.reduce((acc,item)=>acc+item.qty,0)}</h4>
            </ListGroupItem>
            <ListGroupItem>Price : {cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}</ListGroupItem>
            <Button type="button" className="btn-block" disabled={cartItems.length===0} onClick={checkout}>Proceed To CheckOut</Button>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default CartScreen;