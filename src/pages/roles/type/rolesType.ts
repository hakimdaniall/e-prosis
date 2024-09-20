import { ParamsType } from "@ant-design/pro-components";
import { SortOrder } from "antd/lib/table/interface";
import { z } from "zod";

export const RolesSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(5, "Title must be more than 5 characters")
    .max(50, "Must be less than 30 characters"),
});

export type IRoles = z.infer<typeof RolesSchema>;

export interface IAPIResponseGetRoles {
  results: IRoles[];
  page: string;
  limit: number;
  totalPages: number;
  totalResults: number;
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
