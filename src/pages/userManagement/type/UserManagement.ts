import { ParamsType } from "@ant-design/pro-components";
import { SortOrder } from "antd/lib/table/interface";
import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(5, "Title must be more than 5 characters")
    .max(50, "Must be less than 30 characters"),
  email: z.string().email(),
  is_email_verified: z.boolean().optional(),
  role_id: z.number().int(),
  phone: z.string(),
  company_id: z.number().int().optional(),
  fleet_id: z.number().int().optional(),
  created_by: z.number().int().optional(),
  updated_by: z.number().int().optional(),
});

export type IUser = z.infer<typeof UserSchema>;

export interface IAPIResponseGetUsers {
  results: IUser[];
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
