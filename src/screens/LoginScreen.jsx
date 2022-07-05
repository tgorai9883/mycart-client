import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {Link} from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/shared/Loader";
// import Message from "../components/shared/Message";
import { login } from "../actions/userAction";
import FormContainer from "../components/shared/FormContainer";
const LoginScreen =({location, history})=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const redirect = location.search ? location.search.split("=")[1] : "/";

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    // const {loading, error, userInfo} = userLogin;
    const {loading,userInfo} = userLogin;

    useEffect(()=>{
        if(userInfo){
            history.push(redirect);
        };
    },[history, userInfo, redirect])

    const submitHandler = (event)=>{
        event.preventDefault();
        dispatch(login(email, password));
    }
    return<>
        <FormContainer>
            <h1>SIGN IN</h1>
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}></Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">SIGN IN</Button>
            </Form>
            <Row>
                <Col>
                    New Customer ?
                    <Link to={redirect ? `register?redirect=${redirect}`:`/register`}> Register</Link>
                </Col>
            </Row>
        </FormContainer>
    </>
}

export default LoginScreen;