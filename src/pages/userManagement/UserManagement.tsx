import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Button, DatePicker, Typography } from "antd";
import { useEffect, useState } from "react";
import { apiRequest } from "../../utils/API";
import { IRoles } from "../roles/type/rolesType";
import { getUsers } from "./api/UserManagementAPI";
import { IUser } from "./type/UserManagement";
import { PiPlusBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRoles } from "../roles/api/rolesAPI";
import { record } from "zod";

const UserManagement = () => {
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

  const columns: ProColumns<IUser>[] = [
    {
      title: "User ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      render: (text, record) => (
        <a onClick={() => navigate(`/users/${record.id}`)}>{record.id}</a>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact No",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Company Name",
      dataIndex: "field5",
      key: "field5",
    },
    {
      title: "Role",
      dataIndex: "role_id",
      key: "role_id",
      render: (text, record, index) => (
        <p>{getTitleForId(record.role_id)?.toUpperCase()}</p>
      ),
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
          User Management
        </Title>
        <Button
          type="primary"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onClick={() => navigate("/users/new")}
        >
          <PiPlusBold /> &nbsp; Create User Account
        </Button>
      </div>
      <ProTable
        cardBordered
        form={{ layout: "vertical" }}
        request={async (params, sort, filter) => {
          try {
            const data = await getUsers({ filter, sort, params });
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

export default UserManagement;
