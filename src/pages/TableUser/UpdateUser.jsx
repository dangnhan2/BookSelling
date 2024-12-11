import { Form, Input, Divider, notification, message, Modal } from "antd";
import { useEffect } from "react";
import { updateUser } from "../../service/api";
const UpdateUser = (props) => {
  const {
    isModalUpdateOpen,
    setIsModalUpdateOpen,
    getUser,
    dataUpdate,
    setDataUpdate,
  } = props;
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { _id, fullName, phone } = values;
    let res = await updateUser(_id, fullName, phone);
    console.log(res);
    if (res && res.statusCode === 200) {
      message.success("Update Successed!");
      setIsModalUpdateOpen(false);
      getUser();
    } else {
      notification.error({
        message: "Error",
        description: res.message,
        duration: 5,
      });
    }
  };

  const handleCancel = () => {
    setIsModalUpdateOpen(false);
    setDataUpdate(null);
  };

  useEffect(() => {
    form.setFieldsValue(dataUpdate);
  }, [dataUpdate]);

  return (
    <>
      <Modal
        title="Update User"
        open={isModalUpdateOpen}
        onOk={() => form.submit()}
        onCancel={handleCancel}
      >
        <Divider />
        <Form
          form={form}
          //   initialValues={{
          //     remember: true,
          //   }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            hidden={true}
            labelCol={{ span: 24 }}
            label="Id"
            name="_id"
            rules={[
              {
                required: false,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

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
            disabled
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
            <Input disabled={true} />
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
        </Form>
      </Modal>
    </>
  );
};
export default UpdateUser;
