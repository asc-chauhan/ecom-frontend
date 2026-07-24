import axios from "axios";

const api = axios.create({
    baseURL : `${import.meta.env.VITE_BACK_END_URL}/api`,
    withCredentials : true,
});

// Intercept 401 responses — handle expired/invalid JWT
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Clear stale auth data
            localStorage.removeItem("auth");
            localStorage.removeItem("cartItems");
            localStorage.removeItem("CHECKOUT_ADDRESS");
            localStorage.removeItem("client-secret");

            // Redirect to login if not already there
            if (window.location.pathname !== "/login") {
                window.location.href = "/login?expired=true";
            }
        }
        return Promise.reject(error);
    }
);

export default api;