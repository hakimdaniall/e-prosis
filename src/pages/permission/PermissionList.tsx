import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Button, DatePicker, Typography } from "antd";
import { useEffect, useState } from "react";
import { apiRequest } from "../../utils/API";
import { IRoles } from "../roles/type/rolesType";
import { getListPermissions } from "./api/PermissionAPI";
import { IPermission } from "./type/PermissionType";
import { PiPlusBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRoles } from "../roles/api/rolesAPI";
import { record } from "zod";

const PermissionList = () => {
  const { Title } = Typography;
  const navigate = useNavigate();

  const { data: rolesList, isLoading } = useQuery<IRoles[]>({
    queryKey: ["roles"],
    queryFn: getRoles,
  });

  function getTitleForId(id: number): string | undefined {
    const matchingItem = rolesList?.find((item) => item.id === id);
    return matchingItem ? matchingItem.name : undefined;
  }

  const waitTimePromise = async (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  const waitTime = async (time: number = 100) => {
    await waitTimePromise(time);
  };

  const columns: ProColumns<IPermission>[] = [
    {
      title: "Permission ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      render: (text, record) => (
        <a onClick={() => navigate(`/permissions/${record.id}`)}>{record.id}</a>
      ),
    },
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
    },
  ];

  return (
    <div style={{ paddingInline: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={3} style={{ marginBottom: "1em" }}>
          Permission Management
        </Title>
        <Button
          type="primary"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onClick={() => navigate("/permissions/new")}
        >
          <PiPlusBold /> &nbsp; Create Permission
        </Button>
      </div>
      <ProTable
        cardBordered
        form={{ layout: "vertical" }}
        request={async (params, sort, filter) => {
          try {
            const data = await getListPermissions({ filter, sort, params });
            const user = data.results;

            return {
              data: user,
              success: true,
              total: data.totalPages,
            };
          } catch (error) {
            console.error("Error fetching leasing requests:", error);
            return {
              data: [],
              success: false,
              total: 10,
            };
          }
        }}
        rowKey={(data) => data.id}
        columns={columns}
        editable={{
          type: "multiple",
          onSave: async (rowKey, data, row) => {
            // updateProduct(data);
            await waitTime(2000);
          },
        }}
      />
    </div>
  );
};

export default PermissionList;
