import axios from "axios";

const BACKEND_URL = "http://localhost:8000";

const REGISTER_URL = `${BACKEND_URL}/api/v1/auth/users/`;
const LOGIN_URL = `${BACKEND_URL}/api/v1/auth/jwt/create`;

const register = async (userData: any) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    };
    
    const response = await axios.post(REGISTER_URL, userData, config);
    console.log(response.data);
    return response.data;
}


const login = async (userData: any) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    };
    console.log(userData);
    const response = await axios.post(LOGIN_URL, userData, config);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data)
        );
    }
    
    return response.data;
}

const logout = () => {
    return localStorage.removeItem("user");
}

const authService = {register, login, logout};
// const activate = async (userData: any) => {
//     const config = {
//         headers: {
//             "Content-Type": "application/json",
//         }
//     };
    
//     const response = await axios.post(LOGIN_URL, userData, config);
    
//     return response.data;
// }




export default authService;