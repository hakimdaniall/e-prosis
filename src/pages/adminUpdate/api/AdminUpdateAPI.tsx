import axios, { AxiosResponse } from "axios";
import { apiRequest } from "../../../utils/API";

export const fetchAllOrders = async () => {
    return await apiRequest<any>("GET", "/api/orders");
};
  
export const updateOrderStepStatus = async (id: any, data: any,) => {
    return await apiRequest<any>("PUT", "/api/orders/" + id, data);
}