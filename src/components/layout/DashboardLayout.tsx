import React, { useState } from "react";
import {
  Layout,
  Space,
  Typography,
  Avatar,
  Dropdown,
  MenuProps,
  Button,
  Row,
  Breadcrumb,
  Menu,
  Card,
} from "antd";
import { PiBellBold } from "react-icons/pi";
import SidebarMenu from "./sidebarMenu/sidebarMenu";
import logo from "../../assets/images/uitm-logo.png";
import userIcon from "../../assets/images/user.png";
import RouteList from "../../routes/RouteList";
import { useTranslation } from "react-i18next";
import { DownOutlined } from "@ant-design/icons";
import { deleteUserSession } from "../../utils/AuthService";
import { useNavigate } from "react-router-dom";
import DynamicBreadcrumb from "../breadcrumb/Breadcrumb";

const { Header, Sider, Content } = Layout;
const { Text, Link } = Typography;

type TDashboardLayout = {
  children: React.ReactNode;
};
const DashboardLayout = ({ children }: TDashboardLayout) => {
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default language
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    i18n.changeLanguage(value);
  };

  const onClick: MenuProps["onClick"] = ({ key }) => {
    handleLanguageChange(key);
  };

  const items: MenuProps["items"] = [
    {
      label: "EN",
      key: "en",
    },
    {
      label: "MY",
      key: "my",
    },
  ];

  return (
    <Layout>
      <Sider
        theme="light"
        breakpoint="lg"
        collapsedWidth="0"
        style={{ minHeight: "100vh", backgroundColor: "#023047" }}
      >
        <Link
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          href="/"
        >
          <img
            src={logo}
            alt="logo"
            width={150}
            height={64}
            style={{
              objectFit: "contain",
            }}
          />
        </Link>
        <SidebarMenu />
      </Sider>
      <Layout>
        <Header style={{ width: "100%", borderBottom: "2px solid #DBDBDB" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 8,
            }}
          >
            {/* <Breadcrumb>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Products</Breadcrumb.Item>
            </Breadcrumb> */}
            <DynamicBreadcrumb />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <PiBellBold size={20} style={{ marginRight: 10 }} />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "2px solid #DBDBDB",
                  borderRadius: 5,
                  padding: 10,
                  maxHeight: 45,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Text strong>Muhammad Azhar</Text>
                  <Text>Super Admin</Text>
                </div>
                <Avatar
                  style={{ marginLeft: 10 }}
                  src={userIcon}
                  onClick={() => {
                    deleteUserSession();
                    navigate(0);
                  }}
                />
              </div>
            </div>
          </div>
        </Header>
        <Content>{RouteList()}</Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
