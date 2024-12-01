// src/axiosInstance.js
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

const AxiosInterceptor = ({ children }) => {

    const { logout } = useAuth();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const requestInterceptor = axiosInstance.interceptors.request.use(
            (config) => {
                const token = null; //localStorage.getItem('access_token');
                if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
                } 
                return config;
            },
            (error) => {
                setLoading(false);
                return Promise.reject(error);
            }
        );

        const responseInterceptor = axiosInstance.interceptors.response.use(
        (response) => {
            setLoading(false);
            return response;
        },
        async (error) => {
            const originalRequest = error.config;

            if (error.response && error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                const refreshToken = null; //localStorage.getItem('refresh_token');
                if (refreshToken) {
                try {
                    const response = await axios.post('/refresh', { refresh_token: refreshToken });
        
                    const newAccessToken = response.data.access_token;
                    //localStorage.setItem('access_token', newAccessToken);
        
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                    return axios(originalRequest);

                } catch (refreshError) {
                    console.error('Refresh token expired or invalid:', refreshError);

                    //localStorage.removeItem('acess_token');
                    //localStorage.removeItem('refresh_token');

                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
    );

    return () => {
        axiosInstance.interceptors.request.eject(requestInterceptor);
        axiosInstance.interceptors.response.eject(responseInterceptor);
    };
}, [logout]);

return (
    <>
      {children}
    </>
  );
};

export default axiosInstance;
export { AxiosInterceptor };