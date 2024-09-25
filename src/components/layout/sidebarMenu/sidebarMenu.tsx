import { FaUserFriends, FaHome, FaList } from "react-icons/fa";
import {
  // PiClipboardText,
  PiLockBold,
  PiUserFocusBold,
  // PiNewspaperClipping,
} from "react-icons/pi";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";

const SidebarMenu = () => {
  return (
    <Menu
      mode="inline"
      items={[
        {
          key: "dashboard",
          label: (
            <NavLink to="/dashboard">
              Dashboard
            </NavLink>
          ),
          title: "Dashboard",
          icon: <FaHome />,
        },
        {
          key: "home",
          label: (
            <NavLink to="/home">
              Home
            </NavLink>
          ),
          title: "Home",
          icon: <FaHome />,
        },
        {
          key: "order",
          label: (
            <NavLink to="/order">
              Order
            </NavLink>
          ),
          title: "Order",
          icon: <FaList />,
        },
        {
          key: "adminUpdate",
          label: (
            <NavLink to="/admin-update">
              Admin Update
            </NavLink>
          ),
          title: "Admin Update",
          // icon: <FaList />,
        },
        // {
        //   key: "userManagement",
        //   label: (
        //     <NavLink to="/users">
        //       User Management
        //     </NavLink>
        //   ),
        //   title: "User Management",
        //   icon: <FaUserFriends />,
        // },
        // {
        //   key: "roles",
        //   label: (
        //     <NavLink to="/roles">
        //       Roles
        //     </NavLink>
        //   ),
        //   title: "Roles",
        //   icon: <PiUserFocusBold />,
        // },
        // {
        //   key: "permissionManagement",
        //   label: (
        //     <NavLink to="/permissions">
        //       Permissions
        //     </NavLink>
        //   ),
        //   title: "Permissions Management",
        //   icon: <PiLockBold />,
        // },
        // {
        //   key: "products",
        //   label: "Products",
        //   title: "Products",
        //   icon: <FaUserFriends />,

        //   children: [
        //     {
        //       key: "addProduct",
        //       label: (
        //         <NavLink to="/products/new">
        //           Add New Products
        //         </NavLink>
        //       ),
        //       title: "Add Product",
        //     },
        //     {
        //       key: "listProducts",
        //       label: (
        //         <NavLink to="/products">
        //           Products
        //         </NavLink>
        //       ),
        //       title: "View All Products",
        //     },
        //   ],
        // },
      ]}
    />
  );
};

export default SidebarMenu;
