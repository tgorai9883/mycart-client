import axiosInstance from "../config";
export const login = (email, password)=> async (dispatch) =>{
    try {
        dispatch({type: "USER_LOGIN_REQUEST"});
        const config = {headers: {"Content-Type": "application/json"}};
        const {data} = await axiosInstance.post("/users/login",{email,password},config);
        dispatch({type: "USER_LOGIN_SUCCESS", payload: data});
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({type: "USER_LOGIN_FAIL", payload:error});
    }
}

export const logout = () => async(dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({type: "USER_LOGOUT"});
    dispatch({type: "USER_DETAILS_RESET"});
    dispatch({type: "ORDER_LIST_RESET"});
}

export const register = (name, email, password)=> async (dispatch) =>{
    try {
        dispatch({type: "USER_REGISTER_REQUEST"});
        const config = {headers: {"Content-Type": "application/json"}};
        const {data} = await axiosInstance.post("/users",{name, email,password},config);
        dispatch({type: "USER_REGISTER_SUCCESS", payload: data});
        dispatch({type: "USER_LOGIN_SUCCESS", payload: data});
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({type: "USER_REGISTER_FAIL", payload:error});
    }
}

export const getUserDetails = (id) =>  async (dispatch, getState) => {
    try {
        dispatch({type: "USER_DETAILS_REQUEST"});
        const {userLogin:{userInfo}} = getState();
        const config = {headers: {"Content-Type": "application/json", Authorization:`Bearer ${userInfo.token}`}};
        const {data} = await axiosInstance.get(`/users/${id}`,config);
        dispatch({type: "USER_DETAILS_SUCCESS", payload: data});
    }
    catch(error){
        dispatch({type: "USER_DETAILS_FAIL", payload:error});
    }
}