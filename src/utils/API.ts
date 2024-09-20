import axios, { AxiosResponse, AxiosError, Method } from "axios";
import {
  getToken,
  getRememberMe,
  setToken,
  removeUserSession,
} from "../utils/AuthService";

const apiHost = process.env.REACT_APP_API_HOST;

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const tokens = getToken();

    if (tokens) {
      config.headers.Authorization = `Bearer ${tokens.access.token}`;
    }
    return config;
  },

  (error) => Promise.reject(error)
);

const refreshToken = async () => {
  const tokens = getToken();
  const rememberMe = getRememberMe();

  try {
    const resp = await axiosInstance.post("v1/auth/refresh-tokens", {
      refreshToken: tokens?.refresh.token,
      rememberMe,
    });
    return resp.data;
  } catch (e) {
    console.log("Error", e);
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
    const tokens = getToken();
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("remember me", rememberMe);
      console.log("tokens", tokens);

      if (tokens !== null) {
        const newTokens = await refreshToken();

        // eslint-disable-next-line no-extra-boolean-cast
        if (!!newTokens) {
          setToken(newTokens, rememberMe === "true" ? 7 : 1);
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${newTokens.access.token}`;
        }

        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

async function apiRequest<T>(method: Method, url: string, data: any = {}) {
  const token = getToken();
  let params;
  if (data.params) {
    params = data.params.params;
    console.log("paramas:", params);
  }
  try {
    const response: AxiosResponse = await axiosInstance({
      method,
      headers: { Authorization: token ? `Bearer ${token.access.token}` : "" },
      url: apiHost + url,
      params,
      data,
    });
    return { status: "success", data: response.data };
  } catch (error: any) {
    console.log("in api error:", error);
    return { status: "failed", data: error.response.data };
  }
}

export { apiRequest };
