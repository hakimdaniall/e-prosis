import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Button, DatePicker, Typography } from "antd";
import { useEffect, useState } from "react";
import { apiRequest } from "../../utils/API";
import { IRoles } from "./type/rolesType";
import { getListRoles } from "./api/rolesAPI";
import { PiPlusBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { record } from "zod";

const RolesList = () => {
  const { Title } = Typography;
  const navigate = useNavigate();

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

  const columns: ProColumns<IRoles>[] = [
    {
      title: "Role ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      render: (text, record) => (
        <a onClick={() => navigate(`/roles/${record.id}`)}>{record.id}</a>
      ),
    },
    {
      title: "Role",
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
          Roles Management
        </Title>
        <Button
          type="primary"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onClick={() => navigate("/roles/new")}
        >
          <PiPlusBold /> &nbsp; Create Role
        </Button>
      </div>
      <ProTable
        cardBordered
        form={{ layout: "vertical" }}
        request={async (params, sort, filter) => {
          try {
            const data = await getListRoles({ filter, sort, params });
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

export default RolesList;
