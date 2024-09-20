import { ParamsType } from "@ant-design/pro-components";
import { message } from "antd";
import { SortOrder } from "antd/lib/table/interface";
import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  title: z
    .string()
    .min(5, "Title must be more than 5 characters")
    .max(30, "Must be less than 30 characters"),
  images: z.array(z.string()).optional(),
  price: z.number().min(10, { message: "Price must be more than $10" }),
  category: z.string(),
  brand: z.string(),
});

export type IProduct = z.infer<typeof ProductSchema>;

export interface IAPIResponseProducts {
  limit: number;
  products: IProduct[];
  skip: number;
  total: number;
}

export interface IAntDProTableRequest {
  params: ParamsType & {
    pageSize?: number | undefined;
    current?: number | undefined;
    keyword?: string | undefined;
  };
  sort: Record<string, SortOrder>;
  filter: Record<string, (string | number)[] | null>;
}
