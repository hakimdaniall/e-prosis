import React, { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  Avatar,
  MenuProps,
  Button,
} from "antd";
import { LogoutOutlined } from '@ant-design/icons';
import { PiBellBold } from "react-icons/pi";
import SidebarMenu from "./sidebarMenu/sidebarMenu";
import logo from "../../assets/images/uitm-logo.png";
import userIcon from "../../assets/images/user.png";
import RouteList from "../../routes/RouteList";
import { useTranslation } from "react-i18next";
import { deleteUserSession } from "../../utils/AuthService";
import { useNavigate } from "react-router-dom";
import DynamicBreadcrumb from "../breadcrumb/Breadcrumb";
import axios from 'axios'; // You can use axios or fetch for API calls
import Cookies from 'js-cookie'; // Make sure to install js-cookie

const { Header, Sider, Content } = Layout;
const { Text, Link } = Typography;

type TDashboardLayout = {
  children: React.ReactNode;
};
const DashboardLayout = ({ children }: TDashboardLayout) => {
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default language
  const [user, setUser] = useState<any>(null); // User data
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  // Fetch user data from Strapi
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get the JWT token from cookies
        const token = Cookies.get('jwt'); // assuming your cookie is named 'jwt'

        if (!token) {
          console.log("No token found, redirecting to login.");
          navigate('/login'); // Redirect to login if no token
          return;
        }

        // Replace with your Strapi API endpoint for getting user data
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token from cookies
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Optionally handle error (e.g., redirect to login)
      }
    };

    fetchUserData();
  }, [navigate]);

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
            <DynamicBreadcrumb />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* <PiBellBold size={20} style={{ marginRight: 10 }} /> */}
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
                  <Text strong>{user ? user.username : "Loading..."}</Text>
                  <Text>{user ? user.email : "Loading..."}</Text> 
                </div>
                {/* <Avatar
                  style={{ marginLeft: 10 }}
                  src={user && user.avatar ? `${process.env.REACT_APP_API_HOST}${user.avatar.url}` : null}
                  onClick={() => {
                    deleteUserSession();
                    navigate(0);
                  }}
                /> */}
                <Button
                  type="link"
                  icon={<LogoutOutlined />}
                  style={{ marginLeft: 10 }}
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