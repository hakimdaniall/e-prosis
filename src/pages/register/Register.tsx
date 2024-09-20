import React from "react";
import { Card, Form, Input, Button, Divider, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, IRegister } from "./type/registerType";
import { createAccount } from "./api/RegisterAPI";
import { create } from "domain";

const RegisterPage = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IRegister>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: IRegister) => {
    const createAcc = await createAccount(data);

    // Perform form submission logic here

    if (createAcc.status === "success") {
      message.success("Account Created Successful");
      navigate("/");
    } else {
      message.error(createAcc.data.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0eada",
      }}
    >
      <Card title="Create Your Account" style={{ width: 350 }}>
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
        <Divider />
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          Copyright of KopiWrite
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
