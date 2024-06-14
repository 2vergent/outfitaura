import "../assets/styles/signup.css";
import React from "react";
import { Button, Form, Input, Divider } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
// import BogormLogo from "../assets/icons/bogorm_logo_transparent.png";
import { userSignupApi } from "../api/userApi";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log(values);
    userSignupApi(values.name, values.username, values.password).then((res) => {
      if (res.message === "Username is already taken") {
        alert("Username already taken");
      } else if (res.message === "User signed up successfully") {
        console.log("User added");
        navigate("/login");
      }
    });
  };

  return (
    <div className="signup-screen">
      <div className="logo-signup">
        <div className="signup-main">
          <Form
            name="normal_login"
            className="signup-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your Full name!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Name"
              />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="signup-form-button"
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
