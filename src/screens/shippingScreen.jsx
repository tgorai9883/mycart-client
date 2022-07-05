import React,{ useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/shared/FormContainer";
import { saveShippingAddress } from "../actions/cartAction";
import CheckoutStep from "../components/shared/CheckoutStep";

const ShippingScreen = ({history}) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    const [ address, setAddress ] = useState(shippingAddress.address);
    const [ city, setCity ] = useState(shippingAddress.city);
    const [ pincode, setPincode ] = useState(shippingAddress.pincode);
    const [ state, setState ] = useState(shippingAddress.state);
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveShippingAddress({address, city, pincode, state}));
        history.push("/payment");
    }
    return <>
      <CheckoutStep step1 step2/>
      <FormContainer>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Enter Address" value={address} onChange={e=>setAddress(e.target.value)} required></Form.Control>
            </Form.Group>
            <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="Enter City" value={city} onChange={e=>setCity(e.target.value)} required></Form.Control>
            </Form.Group>
            <Form.Group controlId="pincode">
                <Form.Label>Pincode</Form.Label>
                <Form.Control type="text" placeholder="Enter Pincode" value={pincode} onChange={e=>setPincode(e.target.value)} required></Form.Control>
            </Form.Group>
            <Form.Group controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control type="text" placeholder="Enter State" value={state} onChange={e=>setState(e.target.value)} required></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">Continue</Button>
        </Form>
      </FormContainer>
    </>
}

export default ShippingScreen;