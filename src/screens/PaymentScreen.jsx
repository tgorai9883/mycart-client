import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartAction";
import CheckoutStep from "../components/shared/CheckoutStep";

const PaymentScreen = ({history}) => {
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;
    if (!shippingAddress){
        history.push('/shipping');
    }
    const [paymentMethod, setPaymentMethod] = useState("paypal");
    const dispatch = useDispatch();
    const submitHandler = (e)=>{
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');
    }
    return <>
        <CheckoutStep step1 step2 step3/>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as="legend">
                    Select Payment Method
                </Form.Label>
                <Col>
                    <Form.Check type="radio" label="Paypal or Credit Card" id="paypal" name="paymentMethod" value="paypal" onChange={e=>setPaymentMethod(e.target.value)} checked></Form.Check>
                </Col>
            </Form.Group>
            <Button type="submit" variant="primary">Continue</Button>
        </Form>
    </>
}

export default PaymentScreen;