import axios, { AxiosResponse, AxiosError } from "axios";
import { IForgotPassword } from "../type/forgotPasswordType";
import { apiRequest } from "../../../utils/API";

export const resetPassword = async (data: IForgotPassword) => {
  return await apiRequest<IForgotPassword>("POST", "/auth/forgot-password", {
    email: data.email,
  });
};
