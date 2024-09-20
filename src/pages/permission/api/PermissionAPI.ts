import { string } from "zod";
import { apiRequest } from "../../../utils/API";
import {
  IAntDProTableRequest,
  IAPIResponseGetPermission,
  IPermission,
} from "../type/PermissionType";

export const getListPermissions = async ({
  sort,
  filter,
  params,
}: IAntDProTableRequest) => {
  const response = await apiRequest<IAPIResponseGetPermission>(
    "GET",
    "/permissions",
    {
      params: { sort, filter, params },
    }
  );

  return response.data;
};

export const createPermission = async (data: IPermission) => {
  return await apiRequest<IPermission>("POST", "/permissions", {
    name: data.name,
  });
};

export const getPermissionDetails = async (id: string | undefined) => {
  const response = await apiRequest<IAPIResponseGetPermission>(
    "GET",
    `/permissions/${id}`
  );
  return response.data;
};

export const editPermission = async (data: IPermission) => {
  return await apiRequest<IPermission>("PATCH", `/permissions/${data.id}`, {
    name: data.name,
  });
};
