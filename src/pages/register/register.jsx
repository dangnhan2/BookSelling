import {
  Button,
  Form,
  Input,
  Divider,
  notification,
  message,
  Anchor,
} from "antd";
import "./register.scss";
import { RegisterAPI } from "../../service/api";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginPage from "../login/login";
const Register = () => {
  const [isloading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { fullName, email, password, phone } = values;
    setLoading(true);
    let res = await RegisterAPI(fullName, email, password, phone);
    console.log(res);
    setLoading(false);
    if (res?.data?._id) {
      message.success("Đăng ký thành công!");
      navigate("/login");
    } else {
      notification.error({
        message: "Error",
        description: Array.isArray(res.message)
          ? res.message.join(", ") // Join all array items with a comma and space
          : res.message,
        duration: 5,
      });
    }
  };

  return (
    <>
      <div className="register-page" style={{ padding: "25px" }}>
        <main className="main">
          <div className="container">
            <section className="wrapper">
              <div className="heading">
                <h2 className="text text-large">Đăng Ký Tài Khoản</h2>
                <Divider />
              </div>

              <Form
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Full Name"
                  name="fullName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your full name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Phone"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      maxLength: 10,
                      message: "Please input your phone-number!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit" loading={isloading}>
                    Register
                  </Button>
                </Form.Item>
              </Form>
              <div>
                <p>
                  Already have account? <Link to="/login">Login</Link>
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default Register;
