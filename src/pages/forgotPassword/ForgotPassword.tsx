import React from "react";
import { Card, Form, Input, Button, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import {
  IForgotPassword,
  ForgotPasswordSchema,
} from "./type/forgotPasswordType";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPassword } from "./api/ForgotPasswordAPI";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    // Perform reset password here
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<IForgotPassword>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = async (data: IForgotPassword) => {
    const createAcc = await resetPassword(data);

    // Perform form submission logic here

    if (createAcc.status === "success") {
      message.success("An email has been sent to your email");
      navigate("/");
    } else {
      message.error(createAcc.data.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0eada",
      }}
    >
      <Card title="Forgot Password" style={{ minWidth: 350 }}>
        <Form
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={handleSubmit(onSubmit)}
          labelAlign="left"
          colon={false}
        >
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

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        Copyright of KopiWrite
      </div>
    </div>
  );
};

export default ForgotPassword;
