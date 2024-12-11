import { Button, Form, Input, Divider, notification, message } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import { LoginAPI } from "../../service/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doLoginAction } from "../../redux/account/account.slice";
const LoginPage = () => {
  const navigate = useNavigate();
  const [isloading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const onFinish = async (values) => {
    const { username, password } = values;
    setLoading(true);
    let res = await LoginAPI(username, password);
    setLoading(false);
    if (res && res.statusCode === 201 && res.data.user.id) {
      localStorage.setItem("access_token", res.data.access_token);
      dispatch(doLoginAction(res.data.user));
      message.success("Đăng nhập thành công!");
      navigate("/");
    } else {
      notification.error({
        message: "Error",
        description: res.message,
        duration: 5,
      });
    }
    console.log(res);
  };
  return (
    <div className="register-page" style={{ padding: "25px" }}>
      <main className="main">
        <div className="container">
          <section className="wrapper">
            <div className="heading">
              <h2 className="text text-large">Đăng Nhập</h2>
              <Divider />
            </div>

            <Form
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              //onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                labelCol={{ span: 24 }}
                label="Email"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
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
              <Button type="primary" htmlType="submit" loading={isloading}>
                Login
              </Button>
            </Form>
            <div>
              <p>
                Haven't has an account yet ?{" "}
                <Link to="/register">Register</Link>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
export default LoginPage;
