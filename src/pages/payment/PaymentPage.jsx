import { Col, Divider, InputNumber, Row, Form, Input, Radio } from "antd";
import { FaRegTrashCan } from "react-icons/fa6";
import { useSelector } from "react-redux";
import "./Payment.scss";
import { useEffect } from "react";
const PaymentPage = () => {
  const carts = useSelector((state) => state.order.cart);
  const user = useSelector((state) => state.account.user);
  const [form] = Form.useForm();
  const totalAmount = carts.reduce((total, item) => {
    return total + item.data.price * item.quantity;
  }, 0);
  const formattedTotal = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(totalAmount);

  const onFinish = (values) => {
    console.log(values);
  };

  useEffect(() => {
    form.setFieldsValue(user);
  }, [user]);

  return (
    <>
      <div style={{ backgroundColor: "#EFEFEF", height: "100vh" }}>
        <Row span={24}>
          <div className="container-title">Thanh toán</div>
        </Row>
        <Row gutter={[20, 20]}>
          <Col span={16}>
            {carts.map((item, index) => (
              <div className="container-inf" key={index}>
                <img
                  src={`http://localhost:8080/images/book/${item.data.thumbnail}`}
                  alt=""
                />
                <span className="title">{item.data.mainText}</span>
                <span className="price">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.data.price)}
                </span>
                <span
                  className="input"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span>Số lượng:</span>&nbsp;
                  <InputNumber
                    readOnly
                    onChange={(value) => handleChangeQuantity(value, item)}
                    value={item.quantity}
                    title="Số lượng"
                  />
                </span>
                <div className="totalPrice">
                  Tổng:{" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.quantity * item.data.price)}
                </div>
                <div className="delete-btn">
                  <button onClick={() => handleDelete(item._id)}>
                    <FaRegTrashCan />
                  </button>
                </div>
              </div>
            ))}
          </Col>
          <Col span={8}>
            <div className="container-price">
              <Form
                form={form}
                onFinish={onFinish}
                style={{
                  maxWidth: 600,
                }}
              >
                <Row span={24}>
                  <Col span={24}>
                    <div>
                      <Form.Item
                        labelCol={{ span: 24 }}
                        name="fullName"
                        label="Tên người nhận"
                        rules={[
                          {
                            required: true,
                            message: "Nhập tên người nhận",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        labelCol={{ span: 24 }}
                        name="phone"
                        label="Số điện thoại"
                        rules={[
                          {
                            required: true,
                            message: "Nhập số điện thoại",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        labelCol={{ span: 24 }}
                        name="address"
                        label="Địa chỉ"
                        rules={[
                          {
                            required: true,
                            message: "Nhập số điện địa chỉ",
                          },
                        ]}
                      >
                        <Input.TextArea />
                      </Form.Item>

                      <Form.Item
                        name="radio-group"
                        label="Hình thức thanh toán"
                        labelCol={{ span: 24 }}
                      >
                        <Radio value="a" checked>
                          Thanh toán khi nhận hàng
                        </Radio>
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row span={24}>
                  <Col span={24}>
                    <div className="price-product">
                      <div>Tổng tiền</div>
                      <div className="total-price" name="totalPrice">
                        {formattedTotal}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Form>
              <Divider></Divider>
              <Row span={24}>
                <div className="btn">
                  <button onClick={() => form.submit()}>
                    Mua hàng ({carts.length})
                  </button>
                </div>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default PaymentPage;
