import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://my-cart-yqga.onrender.com"
})

export default axiosInstance;
