import axios, { AxiosResponse, AxiosError } from "axios";
import { ILogin } from "../type/loginType";
import { apiRequest } from "../../../utils/API";

export const login = async (data: ILogin) => {
  return await apiRequest<ILogin>("POST", "/api/auth/local", {
    identifier: data.email,
    password: data.password,
  });
};
