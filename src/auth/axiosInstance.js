// src/axiosInstance.js
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

const AxiosInterceptor = ({ children }) => {

    const { logout, token } = useAuth();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const requestInterceptor = axiosInstance.interceptors.request.use(
            (config) => {
                //const token = Cookies.get('token');
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
        (error) => {
            setLoading(false);
            // Handle errors (e.g., logout the user if 401 is encountered)
            if (error.response && error.response.status === 401) {
                // If unauthorized, logout the user
                logout();
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