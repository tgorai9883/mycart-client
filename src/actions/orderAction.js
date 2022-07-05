import axios from "axios";

export const createOrder = (order) => async(dispatch,getState) => {
    try {
        dispatch({
            type: "ORDER_CREATE_REQUEST"
        })
        const { userLogin: {userInfo}} = getState();
        const config = {
            headers: {
              "Contnet-Type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
          };
        const {data} = await axios.post("/orders",order,config);
        console.log(order);
        dispatch({type: "ORDER_CREATE_SUCCESS", payload: data});
    } catch(error) {
        dispatch({
            type: "ORDER_CREATE_FAIL",
            payload: error
        })
    }
}

export const getOrderDetails = (id) => async(dispatch,getState) => {
    try {
        dispatch({
            type: "ORDER_DETAILS_REQUEST"
        })
        const { userLogin: {userInfo}} = getState();
        const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          };
        const {data} = await axios.get(`/orders/${id}`,config);
        console.log(data);
        dispatch({type: "ORDER_DETAILS_SUCCESS", payload: data});
    } catch(error) {
        dispatch({
            type: "ORDER_DETAILS_FAIL",
            payload: error
        })
    }
}

export const payOrder = (orderId, paymentResult) => async(dispatch,getState) => {
    try {
        dispatch({
            type: "ORDER_PAY_REQUEST"
        })
        const { userLogin: {userInfo}} = getState();
        const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
          };
        const {data} = await axios.put(`/orders/${orderId}/pay`,paymentResult,config);
        dispatch({type: "ORDER_PAY_SUCCESS", payload: data});
    } catch(error) {
        dispatch({
            type: "ORDER_PAY_FAIL",
            payload: error
        })
    }
}

export const listMyOrders = () => async(dispatch,getState) => {
    try {
        dispatch({
            type: "ORDER_LIST_REQUEST"
        })
        const { userLogin: {userInfo}} = getState();
        const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          };
        const {data} = await axios.get("/orders/myorders",config);
        dispatch({type: "ORDER_LIST_SUCCESS", payload: data});
    } catch(error) {
        dispatch({
            type: "ORDER_LIST_FAIL",
            payload: error
        })
    }
}