import React from "react";
import { Row, Col, Avatar, Divider, Typography } from "antd";
import { ReactNode } from "react";
import { BiTrendingUp, BiTrendingDown } from "react-icons/bi";
import { PiAppStoreLogo } from "react-icons/pi";

const { Title, Text } = Typography;

interface RankingProps {
  icon: ReactNode;
  model: string;
  value: string;
  status?: string;
  type: "stats" | "number";
}

export const RankingRow: React.FC<RankingProps> = ({
  icon,
  model,
  value,
  status,
  type,
}) => {
  return (
    <>
      <Row>
        <Col
          span={4}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            shape="square"
            icon={icon}
            style={{ backgroundColor: "#EEF9FF" }}
          />
        </Col>
        <Col
          span={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
          }}
        >
          <Text style={{ fontSize: 15 }}>{model}</Text>
        </Col>
        <Col
          span={6}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
          }}
        >
          {type === "stats" ? (
            <>
              {status === "up" ? (
                <BiTrendingUp size={20} color="#39C38B" />
              ) : (
                <BiTrendingDown size={20} color="#FF0000" />
              )}
              <Text
                style={{
                  color: `${status === "up" ? "#39C38B" : "#FF0000"}`,
                  paddingLeft: 5,
                }}
              >
                {value}
              </Text>
            </>
          ) : (
            <>
              <Text
                style={{
                  paddingLeft: 5,
                  color: `${status === "maintanence" ? "#F47A2F" : "#0C377C"}`,
                  fontSize: 20,
                }}
                strong
              >
                {value}
              </Text>
            </>
          )}
        </Col>
        <Divider style={{ marginTop: 12 }} />
      </Row>
    </>
  );
};
