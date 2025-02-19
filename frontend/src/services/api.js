import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            alert("Sessão expirada! Faça login novamente.");
            localStorage.removeItem("token");
            localStorage.removeItem("userType");
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);

export default api;
