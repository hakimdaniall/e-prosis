import axios, { AxiosResponse } from "axios";
import {
  IProduct,
  IAntDProTableRequest,
  IAPIResponseProducts,
} from "../type/ProductType";

export const updateProduct = async (data: IProduct) => {
  // console.log(data);
  axios
    .put("https://dummyjson.com/products/" + data.id, {
      title: data.title,
      price: data.price,
      category: data.category,
      brand: data.brand,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getProductsList = async ({
  sort,
  filter,
  params,
}: IAntDProTableRequest) => {
  console.log("params:", params);
  console.log("sort:", sort);
  console.log("filter:", filter);

  const response: AxiosResponse<IAPIResponseProducts> = await axios.get(
    "https://dummyjson.com/products",
    {
      params: { sort: sort, filter: filter, ...params },
    },
  );

  return response.data;
};

export const getProductDetails = async (id: string) => {
  const data = axios.get("https://dummyjson.com/products/" + id);
  return data;
};
