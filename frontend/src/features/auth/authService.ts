import axios from "axios";

const isDevelopment = import.meta.env.MODE === 'development'
const baseUrl = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_PROD

const REGISTER_URL = `${baseUrl}/auth/users/`;
const LOGIN_URL = `${baseUrl}/auth/jwt/create`;

const register = async (userData: any) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    };

    try {
        const response = await axios.post(REGISTER_URL, userData, config);
        console.log(response.data);
        return response.data;
    } catch (error) {
        // Handle error (e.g., display error message to user)
        console.error("Error registering user:", error);
        throw error;
    }
}

const getCookie = (name: any) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');

const login = async (userData: any) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken 
        }
    };

    try {
        const response = await axios.post(LOGIN_URL, userData, config);
        if (response.data) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        // Handle error (e.g., display error message to user)
        console.error("Error logging in:", error);
        throw error;
    }
}

const logout = () => {
    localStorage.removeItem("user");
    // Remove CSRF token if necessary
}

const authService = { register, login, logout };

export default authService;
