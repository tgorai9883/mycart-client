import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer,productDetailsReducer } from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import { userDetailsReducer, userLoginReducer,userRegisterReducer } from "./reducers/userReducer";
import { orderCreateReducer, orderDetailsReducer, orderListReducer, orderPayReducer } from "./reducers/orderReducer";
const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
const cartItemFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
const shippingAddressFromStorage = localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : [];
// const cartItemFromStorage = (()=>{
//     if(typeof localStorage.getItem("cartItems") !== "undefined"){
//         return JSON.parse(localStorage.getItem("cartItems"));
//     }
//     else return [];
// })();
// let cartItemFromStorage;
// if(typeof localStorage.getItem("cartItems") !== "undefined"){
//     cartItemFromStorage= JSON.parse(localStorage.getItem("cartItems"));
// }
// else cartItemFromStorage= [];

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderList: orderListReducer
});
const initialState = {
    cart: {cartItems: cartItemFromStorage , shippingAddress: shippingAddressFromStorage},
    userLogin: {userInfo: userInfoFromStorage}
};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
export default store;