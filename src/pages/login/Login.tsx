import React from "react";
import { Card, Form, Input, Button, Divider, message, Checkbox } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { setUserSession } from "../../utils/AuthService";
import { ILogin, LoginSchema } from "./type/loginType";
import { login } from "./api/LoginAPI";
import bgImage from "../../assets/images/hero-banner-ygt-1.jpg";
import logo from "../../assets/images/ygt-logo.png";
const LoginPage = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      rememberme: false,
    },
  });

  const onSubmit = async (data: ILogin) => {
    // Perform login request
    const loginAcc = await login(data);

    if (loginAcc.status === "success") {
      const userDetail = loginAcc.data;
  
      // Set session with the new user structure and JWT
      const setUser = setUserSession({
        rememberme: data.rememberme,
        jwt: userDetail.jwt, // Passing JWT token directly
        user: userDetail.user, // Passing user details
      });
  
      if (setUser === true) {
        navigate(0); // Reload the page to reflect logged-in state
      } else {
        alert("Error setting session");
      }
    } else {
      message.error(loginAcc.data.error.message); // Display error message if login fails
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        // backgroundImage: `url(${bgImage})`,
        backgroundColor: "#000",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div style={{ justifyContent: "center" }}>
        {/* <div
          style={{ display: "flex", justifyContent: "center", margin: "20px" }}
        >
          <img alt="example" src={logo} />
        </div> */}
        <Card title="Login" style={{ width: 350 }}>
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
                defaultValue="student2@test.com"
                render={({ field }) => <Input placeholder="Email" {...field} />}
              />
            </Form.Item>
            <Form.Item
              name="password"
              hasFeedback
              validateStatus={errors.password ? "error" : ""}
              help={errors.password?.message}
              style={{ marginBottom: 10 }}
            >
              <Controller
                name="password"
                control={control}
                defaultValue="Test1234"
                render={({ field }) => (
                  <Input.Password placeholder="Password" {...field} />
                )}
              />
            </Form.Item>
            <Form.Item
              name="rememberme"
              hasFeedback
              validateStatus={errors.rememberme ? "error" : ""}
              help={errors.rememberme?.message}
            >
              <Controller
                name="rememberme"
                control={control}
                render={({ field }) => (
                  <Checkbox checked={field.value} {...field}>
                    Remember Me?
                  </Checkbox>
                )}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%", marginBottom: 5 }}
              >
                Log in
              </Button>
              <a href="/forgot-password">Forgot Password</a>
              <br />
              <div style={{ marginTop: 25 }}>
                Don't have an account? <a href="/register">Click here</a> to
                register as a new user.
              </div>
            </Form.Item>
          </Form>
          <Divider />
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            Copyright of KopiWrite
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
