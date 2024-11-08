import axios, { AxiosResponse, Method } from "axios";
import {
  getToken,
  getRememberMe,
  setToken,
  removeUserSession,
} from "../utils/AuthService";

const apiHost = process.env.REACT_APP_API_HOST;

const axiosInstance = axios.create();

// Add request interceptor to include JWT in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const jwt = getToken(); // Retrieves JWT directly
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Refresh the JWT token if expired
const refreshToken = async () => {
  const jwt = getToken();
  const rememberMe = getRememberMe();

  try {
    const resp = await axiosInstance.post(`${apiHost}/v1/auth/refresh-tokens`, {
      token: jwt,
      rememberMe,
    });
    return resp.data; // Assuming new JWT is returned
  } catch (e) {
    console.log("Error refreshing token:", e);
    removeUserSession();
    window.location.href = "/";
  }
};

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const rememberMe = getRememberMe();
    const jwt = getToken();
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (jwt) {
        const newTokens = await refreshToken();

        if (newTokens?.jwt) {
          // Update token and set expiration
          setToken(newTokens.jwt, rememberMe === "true" ? 30 : 1);
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${newTokens.jwt}`;
        }

        return axiosInstance(originalRequest); // Retry original request with new JWT
      }
    }
    return Promise.reject(error);
  }
);

// Main function to make API requests
async function apiRequest<T>(method: Method, url: string, data: any = {}) {
  const jwt = getToken();
  let params;
  if (data.params) {
    params = data.params.params;
  }
  
  try {
    const response: AxiosResponse = await axiosInstance({
      method,
      headers: { Authorization: jwt ? `Bearer ${jwt}` : "" },
      url: apiHost + url,
      params,
      data,
    });
    return { status: "success", data: response.data };
  } catch (error: any) {
    console.log("API error:", error);
    return { status: "failed", data: error.response?.data };
  }
}

export { apiRequest };