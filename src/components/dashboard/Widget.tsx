import { MdOutlineSpeed } from "react-icons/md";
import { Space, Card, Row, Col } from "antd";
import React from "react";

type TWidgetItem = {
  icon: React.ReactNode;
  value: string;
  title: string;
};

export const Widget = () => {
  const widgetItems: TWidgetItem[] = [
    {
      icon: <MdOutlineSpeed color="red" size={30} />,
      value: "100",
      title: "API request",
    },
    {
      icon: <MdOutlineSpeed color="blue" size={30} />,
      value: "30%",
      title: "API request",
    },
    {
      icon: <MdOutlineSpeed color="green" size={30} />,
      value: "55",
      title: "API request",
    },
    {
      icon: <MdOutlineSpeed color="orange" size={30} />,
      value: "100",
      title: "API request",
    },
    {
      icon: <MdOutlineSpeed color="orange" size={30} />,
      value: "100",
      title: "API request",
    },
    {
      icon: <MdOutlineSpeed color="blue" size={30} />,
      value: "30%",
      title: "API request",
    },
    {
      icon: <MdOutlineSpeed color="red" size={30} />,
      value: "100",
      title: "API request",
    },
    {
      icon: <MdOutlineSpeed color="green" size={30} />,
      value: "55",
      title: "API request",
    },
  ];

  return (
    <Row gutter={5}>
      {widgetItems.map((item: TWidgetItem, index: number) => (
        <Col xs={24} sm={12} xl={3}>
          <Card size="small" style={{ margin: 5 }}>
            <Space
              direction="horizontal"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {item.icon}
              <div style={{ fontWeight: "bold", fontSize: 18 }}>
                {item.value}
              </div>
              <div style={{ textAlign: "center" }}>{item.title}</div>
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
