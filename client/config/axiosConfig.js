import axios from 'axios';

const api = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
})

api.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem("accessToken");
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) =>{
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    (response) => response,
    async (error) =>{
        const originalRequest = error.config;

        if(error.response?.status === 403 && !originalRequest._retry){
            originalRequest._retry = true;

            try {
                const {data} = await axios.post(
                    "/api/auth/refreshToken",{},
                    {withCredentials: true}
                );

                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("user", JSON.stringify(data.user));

                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");
                window.location.href = "/";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;