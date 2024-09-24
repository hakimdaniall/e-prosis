import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard/DashboardPage";
import Order from "../pages/order/Order";
import Home from "../pages/home/Home";
import NotFoundPage from "../pages/notFoundPage/notFoundPage";
import PermissionList from "../pages/permission/PermissionList";
import Permission from "../pages/permission/view/Permission";
import Products from "../pages/products/Products";
import ProductAddNew from "../pages/products/view/ProductsAddNew";
import ProductDetails from "../pages/products/view/ProductsDetails";
import RolesList from "../pages/roles/RolesList";
import Roles from "../pages/roles/view/Roles";
import UserManagement from "../pages/userManagement/UserManagement";
import UserAdd from "../pages/userManagement/view/User";

export default function RouteList() {
  const handleAdminRoutes = () => (
    <>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/order" element={<Order />} />
      <Route path="/home" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/new" element={<ProductAddNew />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/users" element={<UserManagement />} />
      <Route path="/users/:id" element={<UserAdd />} />
      <Route path="/permissions" element={<PermissionList />} />
      <Route path="/permissions/:id" element={<Permission />} />
      <Route path="/roles" element={<RolesList />} />
      <Route path="/roles/:id" element={<Roles />} />
    </>
  );

  // TODO modify when API implementation is done
  const handleRolesRoutes = (roles: string) => {
    switch (roles) {
      case "operator":
        return NotFoundPage();
      case "admin":
        return handleAdminRoutes();
      default:
        return NotFoundPage();
    }
  };

  return <Routes>{handleRolesRoutes("admin")}</Routes>;
}
