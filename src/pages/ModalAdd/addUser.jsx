import { Form, Input, Divider, notification, message, Modal } from "antd";
import { useState } from "react";
import { addUser } from "../../service/api";
const AddUser = (props) => {
  const { isModalOpen, setIsModalOpen, getUser } = props;
  const [isloading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const { fullName, password, email, phone } = values;
    setLoading(true);
    let res = await addUser(fullName, password, email, phone);
    //console.log(res);
    setLoading(false);
    if (res && res.statusCode === 201 && res.data) {
      form.resetFields();
      setIsModalOpen(false);
      message.success("Thêm mới thành công!");
      // console.log(isloading);
      await getUser();
    } else {
      notification.error({
        message: "Error",
        description: res.message,
        duration: 5,
      });
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Add User"
      open={isModalOpen}
      okText="Create"
      onOk={() => {
        form.submit();
      }}
      onCancel={handleCancel}
      confirmLoading={isloading}
    >
      <Divider />
      <Form
        form={form}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          labelCol={{ span: 24 }}
          label="Full Name"
          name="fullName"
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
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/* <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "5px",
                  }}
                >
                  <Button
                    htmlType="button"
                    onClick={() => {
                      setIsModalOpen(false);
                    }}
                  >
                    Cancel
                  </Button>

                  <Button type="primary" htmlType="submit" loading={isloading}>
                    Add
                  </Button>
                </div> */}
      </Form>
    </Modal>
  );
};
export default AddUser;
