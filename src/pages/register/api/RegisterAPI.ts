import axios, { AxiosResponse, AxiosError } from "axios";
import { IRegister } from "../type/registerType";
import { apiRequest } from "../../../utils/API";

export const createAccount = async (data: IRegister) => {
  return await apiRequest<IRegister>("POST", "/auth/register", {
    name: data.name,
    email: data.email,
    password: data.password,
  });
};
