import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://mycart-2022.herokuapp.com"
})

export default axiosInstance;