import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Space,
  Typography,
  message,
} from "antd";
import { Controller, useForm } from "react-hook-form";
// import { IQuotation, QuotationSchema } from "../type/QuotationType";
import { useNavigate, useParams } from "react-router-dom";
import { UserSchema } from "../../userManagement/type/UserManagement";
import { IRoles } from "../type/rolesType";
import { useQuery } from "@tanstack/react-query";
import { getRoles } from "@testing-library/react";
import { getRolesDetails } from "../api/rolesAPI";
import { useEffect } from "react";

const { Title } = Typography;

const Roles = () => {
  const navigate = useNavigate();
  const { id: roleId } = useParams<{ id: string }>();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<IRoles>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      id: 1,
    },
  });

  const {
    data: user,
    isLoading: userLoading,
    isError,
  } = useQuery<IRoles>({
    queryKey: ["userData", roleId],
    queryFn: () => getRolesDetails(roleId),
    enabled: roleId !== "new",
  });

  useEffect(() => {
    if (user) {
      setValue("name", user?.name);
      setValue("id", user?.id);
    }
  }, [user]);

  const onSubmit = (data: IRoles) => {
    // Perform form submission logic here
    console.log(data);
    message.success("New Quotation Added");
    navigate("/leasing-request");
  };

  return (
    <Space
      direction="vertical"
      style={{ margin: 10, width: "-webkit-fill-available" }}
    >
      <Card>
        <Title level={3} style={{ marginBottom: "1em" }}>
          Create User Account
        </Title>
        <Title
          level={5}
          style={{ color: "#0C377C", textTransform: "uppercase" }}
        >
          User Information
        </Title>
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Row gutter={36}>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Form.Item
                label="Role Title"
                hasFeedback
                validateStatus={errors.name ? "error" : ""}
                help={errors.name?.message}
              >
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Title
          level={5}
          style={{ color: "#0C377C", textTransform: "uppercase" }}
        >
          Access Permission
        </Title>
        <Form.Item name="permission" valuePropName="checked">
          <Checkbox>User Management</Checkbox>
          <Checkbox>Leasing Management</Checkbox>
          <Checkbox>Order Management</Checkbox>
          <Checkbox>Invoice Management</Checkbox>
        </Form.Item>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Space>
            <Button
              style={{ minWidth: 150, margin: 5 }}
              onClick={() => navigate("/roles")}
            >
              Cancel
            </Button>
            <Button
              style={{ minWidth: 150, margin: 5 }}
              type="primary"
              htmlType="submit"
            >
              {roleId === "new" ? <>Create</> : <>Edit</>}
              &nbsp;Permission
            </Button>
          </Space>
        </Row>
      </Card>
    </Space>
  );
};

export default Roles;
