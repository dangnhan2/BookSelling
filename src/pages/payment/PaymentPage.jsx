import {
  Col,
  Divider,
  InputNumber,
  Row,
  Form,
  Input,
  Radio,
  message,
  notification,
} from "antd";
import { FaRegTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import "./Payment.scss";
import { useEffect } from "react";
import { callCreateOrder } from "../../service/api";
import { doPlaceOrder } from "../../redux/order/order.slice";
import { useNavigate } from "react-router-dom";
const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const onFinish = async (values) => {
    const { fullName, address, phone } = values;
    const detail = carts.map((item) => {
      return {
        bookName: item.data.mainText,
        quantity: item.quantity,
        _id: item._id,
      };
    });

    const data = {
      name: fullName,
      address: address,
      phone: phone,
      totalPrice: totalAmount,
      detail: detail,
    };

    let res = await callCreateOrder(data);
    console.log(res);
    if (res && res.data) {
      dispatch(doPlaceOrder());
      navigate("/orderSuccess");
      message.success("Đặt hàng thành công!");
      form.resetFields();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
        duration: 5,
      });
    }
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
                        <Radio checked>Thanh toán khi nhận hàng</Radio>
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row span={24}>
                  <Col span={24}>
                    <Form.Item label="Tổng tiền">
                      {/* <div className="price-product"> */}
                      {/* <div>Tổng tiền</div> */}
                      <div
                        className="total-price"
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          color: "red",
                          fontSize: "18px",
                        }}
                      >
                        {formattedTotal}
                      </div>
                      {/* </div> */}
                    </Form.Item>
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
