import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
  message,
} from "antd";
import { Controller, useForm } from "react-hook-form";
// import { IQuotation, QuotationSchema } from "../type/QuotationType";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getRoles } from "../../roles/api/rolesAPI";
import { IRoles } from "../../roles/type/rolesType";
import { IUser, UserSchema } from "../type/UserManagement";
import { createUser, editUser, getUser } from "../api/UserManagementAPI";
import { useMemo } from "react";

const { Title } = Typography;
const UserAdd = () => {
  const navigate = useNavigate();
  const { id: userId } = useParams<{ id: string }>();
  const { Option } = Select;
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<IUser>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      id: 1,
    },
  });

  const { data: roles, isLoading } = useQuery<IRoles[]>({
    queryKey: ["roles"],
    queryFn: getRoles,
  });
  const {
    data: user,
    isLoading: userLoading,
    isError,
  } = useQuery<IUser>({queryKey:["userData", userId], queryFn: () => getUser(userId),
    enabled: userId !== "new",
  });

  const onSubmit = async (data: IUser) => {
    // Perform form submission logic here

    console.log("data submit:", data);
    const postUser =
      userId === "new" ? await createUser(data) : await editUser(data);
    if (postUser.status === "success") {
      message.success("User Updated Successful");
      navigate("/users");
    } else {
      message.error(postUser.data.message);
    }
  };

  if (isLoading && userId !== "new" && userLoading) {
    return <div>Now loading</div>;
  }

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
                label="Full Name"
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
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Form.Item
                label="Contact Number"
                validateStatus={errors.phone ? "error" : ""}
                help={errors.phone?.message}
                hasFeedback
              >
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Form.Item
                label="Email Address"
                validateStatus={errors.email ? "error" : ""}
                help={errors.email?.message}
                hasFeedback
              >
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Form.Item
                label="Roles"
                validateStatus={errors.role_id ? "error" : ""}
                help={errors.role_id?.message}
                hasFeedback
              >
                <Controller
                  name="role_id"
                  control={control}
                  render={({ field }) => (
                    <Select placeholder="Please Select" {...field}>
                      {roles?.map((option) => (
                        <Option key={option.id} value={option.id}>
                          {option.name.toUpperCase()}
                        </Option>
                      ))}
                    </Select>
                  )}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ display: "flex", justifyContent: "center" }}>
            <Space>
              <Button
                style={{ minWidth: 150, margin: 5 }}
                onClick={() => navigate("/users")}
              >
                Cancel
              </Button>
              <Button
                style={{ minWidth: 150, margin: 5 }}
                type="primary"
                htmlType="submit"
              >
                {userId === "new" ? <>Create</> : <>Edit</>}&nbsp;User
              </Button>
            </Space>
          </Row>
        </Form>
      </Card>
    </Space>
  );
};

export default UserAdd;
