import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer";
import Header from "./components/header";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import OrderDetailsScreen from "./screens/orderDetailsScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductDetails from "./screens/ProductDetails";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/shippingScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="my-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/profile" component={ProfileScreen} exact />
          <Route path="/payment" component={PaymentScreen} exact/>
          <Route path="/placeorder" component={PlaceOrderScreen} exact/>
          <Route path="/order/:id" component={OrderDetailsScreen} exact/>
          <Route path="/register" component={RegisterScreen} exact/>
          <Route path="/product/:id" component={ProductDetails} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/shipping" component={ShippingScreen}/>
        </Container>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
