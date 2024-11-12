import React from "react";
import { FaFlask, FaHome, FaCheck } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import Cookies from "js-cookie";

const SidebarMenu = () => {
  const isModerator = Cookies.get('isModerator') === 'true';

  return (
    <Menu mode="inline">
      {!isModerator && (
        <>
        <Menu.Item key="home" icon={<FaHome />}>
          <NavLink to="/home">Home</NavLink>
        </Menu.Item>
        <Menu.Item key="order" icon={<FaFlask />}>
            <NavLink to="/order">Order</NavLink>
        </Menu.Item>
        </>
      )}

      {/* Only show the Admin Update menu item if the user is a moderator */}
      {isModerator && (
        <Menu.Item key="adminUpdate">
          <NavLink to="/admin-update">Admin Panel</NavLink>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default SidebarMenu;