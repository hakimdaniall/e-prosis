import React, { useState } from "react";
import { Card, Form, Input, Button, Divider, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, IRegister } from "./type/registerType";
import { createAccount } from "./api/RegisterAPI";
import bgImage from "../../assets/images/uitm-bg.jpg";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IRegister>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: IRegister) => {
    setIsLoading(true); // Start loading
    const createAcc = await createAccount(data);

    if (createAcc.status === "success") {
      message.success("Account Created Successfully");
      navigate("/");
    } else {
      message.error(createAcc.data.error.message);
    }
    setIsLoading(false); // End loading
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        // backgroundColor: "#f0eada",
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <Card title="Create Your Account" style={{ width: 350 }}>
        {isLoading ? ( // Show loading spinner if loading
          <div style={{ textAlign: "center", padding: "20px" }}>
            <Spin size="large" />
          </div>
        ) : (
          <Form
            name="RegisterForm"
            initialValues={{ remember: true }}
            onFinish={handleSubmit(onSubmit)}
            labelAlign="left"
            colon={false}
          >
            <Form.Item
              name="name"
              hasFeedback
              validateStatus={errors.name ? "error" : ""}
              help={errors.name?.message}
            >
              <Controller
                name="name"
                control={control}
                render={({ field }) => <Input placeholder="Name" {...field} />}
              />
            </Form.Item>
            <Form.Item
              name="email"
              hasFeedback
              validateStatus={errors.email ? "error" : ""}
              help={errors.email?.message}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => <Input placeholder="Email" {...field} />}
              />
            </Form.Item>
            <Form.Item
              name="password"
              hasFeedback
              validateStatus={errors.password ? "error" : ""}
              help={errors.password?.message}
            >
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input.Password placeholder="Password" {...field} />
                )}
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              hasFeedback
              validateStatus={errors.confirmPassword ? "error" : ""}
              help={errors.confirmPassword?.message}
            >
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input.Password placeholder="Confirm Password" {...field} />
                )}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%", marginBottom: 5 }}
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        )}
        <Divider />
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          Copyright of KopiWrite
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
