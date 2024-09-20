import React from "react";
import { Card, Avatar, Typography } from "antd";
import { CardProps } from "antd/es/card";
import { CardInterface } from "antd/es/card";

interface QuotationStatusProps extends CardProps {
  status: string;
  total: number;
  active?: boolean;
}

export const QuotationStatusCard: React.FC<QuotationStatusProps> = ({
  status,
  total,
  active,
  onClick,
  ...props
}) => {
  const { Title, Text } = Typography;
  return (
    <Card
      size="small"
      style={{
        border: `${active ? "2px solid #0C377C" : "1px solid #E0E0E0"}`,
        cursor: "pointer",
      }}
      hoverable
      onClick={onClick}
    >
      <Avatar
        shape="square"
        size="small"
        style={{ backgroundColor: "#F1F1F1" }}
      />

      <Text strong style={{ margin: 10 }}>
        {status}
      </Text>
      <Title
        level={3}
        style={{
          display: "flex",
          justifyContent: "start",
          marginTop: 10,
          marginBottom: 0,
          color: `${
            status === "Completed"
              ? "#01AD50"
              : status === "Rejected"
              ? "#FF0000"
              : status === "In Progress"
              ? "#F47A2F"
              : "#205EC1"
          }`,
        }}
      >
        {total}
      </Title>
    </Card>
  );
};
