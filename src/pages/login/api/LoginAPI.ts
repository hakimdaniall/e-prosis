import axios, { AxiosResponse, AxiosError } from "axios";
import { ILogin } from "../type/loginType";
import { apiRequest } from "../../../utils/API";

export const login = async (data: ILogin) => {
  return await apiRequest<ILogin>("POST", "/auth/login", {
    email: data.email,
    password: data.password,
  });
};
