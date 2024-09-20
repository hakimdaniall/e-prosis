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
import {
  createPermission,
  editPermission,
  getPermissionDetails,
} from "../api/PermissionAPI";
import { IPermission, PermissionSchema } from "../type/PermissionType";
import { useEffect } from "react";

const { Title } = Typography;
const Permission = () => {
  const navigate = useNavigate();
  const { id: permissionId } = useParams<{ id: string }>();
  const { Option } = Select;
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<IPermission>({
    resolver: zodResolver(PermissionSchema),
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
  } = useQuery<IPermission>({
    queryKey: ["userData", permissionId],
    queryFn: () =>
      getPermissionDetails(permissionId).then((res) => {
        setValue("name", res?.name);
        setValue("id", res?.id);

        return res.json();
      }),
    enabled: permissionId !== "new",
  });

  const onSubmit = async (data: IPermission) => {
    // Perform form submission logic here

    console.log("data submit:", data);
    const postUser =
      permissionId === "new"
        ? await createPermission(data)
        : await editPermission(data);
    if (postUser.status === "success") {
      message.success("Permission Updated Successfully");
      navigate("/permissions");
    } else {
      if (postUser.data) {
        message.error(postUser.data.message);
      } else {
        message.error("API Error");
      }
    }
  };

  if (isLoading && permissionId !== "new" && userLoading) {
    return <div>Now loading</div>;
  }

  return (
    <Space
      direction="vertical"
      style={{ margin: 10, width: "-webkit-fill-available" }}
    >
      <Card>
        <Title level={3} style={{ marginBottom: "1em" }}>
          Create Permission
        </Title>
        <Title
          level={5}
          style={{ color: "#0C377C", textTransform: "uppercase" }}
        >
          Permission Information
        </Title>
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Row gutter={36}>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Form.Item
                label="Permission Title"
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
          <Row style={{ display: "flex", justifyContent: "center" }}>
            <Space>
              <Button
                style={{ minWidth: 150, margin: 5 }}
                onClick={() => navigate("/permissions")}
              >
                Cancel
              </Button>
              <Button
                style={{ minWidth: 150, margin: 5 }}
                type="primary"
                htmlType="submit"
              >
                {permissionId === "new" ? <>Create</> : <>Edit</>}
                &nbsp;Permission
              </Button>
            </Space>
          </Row>
        </Form>
      </Card>
    </Space>
  );
};

export default Permission;
