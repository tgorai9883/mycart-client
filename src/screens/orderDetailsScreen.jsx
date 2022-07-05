import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrderDetails, payOrder } from "../actions/orderAction";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";
import {PayPalButton} from "react-paypal-button-v2"

const OrderDetailsScreen = ({ match }) => {
    const [sdkready, setSdkready] = useState(false);
    const orderPay = useSelector(state => state.orderPay);
    const {loading: loadingPay, success: successPay} = orderPay;
    const orderId = match.params.id;
    const dispatch = useDispatch();
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    useEffect(() => {
        const addPaypalScript = async () =>{
            const {data: clientId} = await axios.get("/config/paypal");
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;

            script.onload=()=>{
                setSdkready(true);
            }
            document.body.appendChild(script);
        }

        if(!order || successPay){
            dispatch(getOrderDetails(orderId));
            dispatch({type: "ORDER_PAY_RESET"})
        } else if(!order.isPaid){
            if(!window.paypal){
                addPaypalScript();
            } else {
                setSdkready(true);
            }
        }

    }, [dispatch, orderId, order, successPay]);

    const successPaymentHandler = (paymentResult)=>{
        console.log(paymentResult);
        dispatch(payOrder(orderId,paymentResult));
    }
    return loading ? ( <Loader /> ) : 
    error ? ( <Message variant="danger">{error}</Message>) : 
    (
        <>
        <h2>Order {order._id}</h2>
        <Row>
            <Col md={8}>
            <ListGroup.Item variant="flush">
                <h2>Shipping</h2>
                <p>
                    <strong>Name : </strong>
                    {order.user.name}
                </p>
                <p>
                    <strong>Email: </strong>
                    {order.user.email}
                </p>
                {/* <p>
                <strong>Address</strong>
                {orderDetails.shippingAddress.address} ,
                {orderDetails.shippingAddress.city} ,
                {orderDetails.shippingAddress.pincode} ,
                {orderDetails.shippingAddress.state}
                </p> */}
                <p>{
                    order.isDelivered ? <Message variant="success">Delivered On {order.deliveredAt}</Message> :
                    <Message variant="danger">Not Delivered</Message>
                }</p>
            </ListGroup.Item>
            <ListGroup.Item>
                <h2>Payment Method</h2>
                {order.paymentMethod}
                <p>{
                    order.isPaid ? <Message variant="success">Paid On {order.paidAt}</Message> :
                    <Message variant="danger">Not Paid</Message>
                }</p>
            </ListGroup.Item>
            <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? (
                <Message>Your order is Empty</Message>
                ) : (
                <ListGroup variant="flush">
                    {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                        <Row>
                        <Col md={1}>
                            <Image src={item.image} alt={item.name} fluid />
                        </Col>
                        <Col>
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                            {item.qty} X ${item.price} = ${item.price}
                        </Col>
                        </Row>
                    </ListGroup.Item>
                    ))}
                </ListGroup>
                )}
            </ListGroup.Item>
            </Col>
            <Col md={4}>
            <Card>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h2>Order Sumamary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice}</Col>
                    </Row>
                    <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice}</Col>
                    </Row>
                    <Row>
                    <Col>Total</Col>
                    <Col>${order.totalPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    {error && <Message variant="danger">{error}</Message>}
                </ListGroup.Item>
            </ListGroup>
          </Card>
                {!order.isPaid && <ListGroup.Item>
                    {loadingPay && <Loader/>}
                    {!sdkready ? <Loader/> : <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>}
                </ListGroup.Item>}
            </Col>
        </Row>
        </>
    );
};

export default OrderDetailsScreen;