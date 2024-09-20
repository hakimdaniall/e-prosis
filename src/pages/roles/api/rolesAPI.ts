import { apiRequest } from "../../../utils/API";
import { getToken } from "../../../utils/AuthService";
import {
  IAntDProTableRequest,
  IAPIResponseGetRoles,
  IRoles,
} from "../type/rolesType";

export const getListRoles = async ({
  sort,
  filter,
  params,
}: IAntDProTableRequest) => {
  const response = await apiRequest<IAPIResponseGetRoles>("GET", "/roles");

  return response.data;
};

export const getRoles = async () => {
  const response = await apiRequest<IAPIResponseGetRoles>("GET", "/roles");

  return response.data.results;
};

export const getRolesDetails = async (id: string | undefined) => {
  const response = await apiRequest<IAPIResponseGetRoles>(
    "GET",
    `/roles/${id}`
  );
  return response.data;
};

export const editRoles = async (data: IRoles) => {
  return await apiRequest<IRoles>("PATCH", `/roles/${data.id}`, {
    name: data.name,
  });
};
