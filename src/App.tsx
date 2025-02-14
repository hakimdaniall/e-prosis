import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/DashboardPage";
import Home from "./pages/home/Home";
import Order from "./pages/order/Order"
import AdminUpdate from "./pages/adminUpdate/AdminUpdate";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import Login from "./pages/login/Login";
import PermissionList from "./pages/permission/PermissionList";
import Permission from "./pages/permission/view/Permission";
import Users from "./pages/products/Products";
import ProductAddNew from "./pages/products/view/ProductsAddNew";
import ProductDetails from "./pages/products/view/ProductsDetails";
import RegisterPage from "./pages/register/Register";
import RolesList from "./pages/roles/RolesList";
import Roles from "./pages/roles/view/Roles";
import UserManagement from "./pages/userManagement/UserManagement";
import UserAdd from "./pages/userManagement/view/User";
import { PrivateRoute, PublicRoute, AdminRoute } from "./utils/RouteHandlers";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/">
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" Component={Login} />
            <Route path="/" Component={Login} />
            <Route path="/forgot-password" Component={ForgotPassword} />
            <Route path="/register" Component={RegisterPage} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="/order" element={<Order />} />
          </Route>
          <Route element={<AdminRoute />}>
            <Route path="/admin-update" element={<AdminUpdate />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
