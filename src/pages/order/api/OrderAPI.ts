import axios, { AxiosResponse } from "axios";

export const getProductDetails = async (id: string) => {
    const data = axios.get("https://dummyjson.com/products/" + id);
    return data;
};
  
export const rateOrder = async (order: any) => {
    try {
      const response = await axios.post(
        "https://dummyjson.com/c/b272-5a6c-405f-bb26",
        {
          rating: order.rating,
          comment: order.comment,
        }
      );
      return response.data; // Return the response data here
    } catch (error) {
      console.error("Error rating order:", error);
      throw error; // Re-throw the error if needed
    }
};