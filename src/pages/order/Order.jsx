import { Col, Divider, InputNumber, Row } from "antd";
import "./Order.scss";
import { FaRegTrashCan } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { doUpdateAction, doDeleteAction } from "../../redux/order/order.slice";
const Order = () => {
  const carts = useSelector((state) => state.order.cart);
  const dispatch = useDispatch();
  const handleChangeQuantity = (value, item) => {
    if (!value && value < 1) return;
    if (!isNaN(value)) {
      dispatch(doUpdateAction({ quantity: value, _id: item._id, data: item }));
    }
  };
  const totalAmount = carts.reduce((total, item) => {
    return total + item.data.price * item.quantity;
  }, 0);
  const formattedTotal = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(totalAmount);

  const handleDelete = (id) => {
    dispatch(doDeleteAction({ id }));
  };
  return (
    <>
      <div className="container-order" style={{ backgroundColor: "#EFEFEF" }}>
        <Row gutter={[20, 20]}>
          <Col span={18}>
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
                <span className="input">
                  <InputNumber
                    onChange={(value) => handleChangeQuantity(value, item)}
                    value={item.quantity}
                  />
                </span>
                <div className="totalPrice">Tổng: {formattedTotal}</div>
                <div className="delete-btn">
                  <button onClick={() => handleDelete(item._id)}>
                    <FaRegTrashCan />
                  </button>
                </div>
              </div>
            ))}
          </Col>
          <Col span={6}>
            <div className="container-price">
              <Row span={24}>
                <Col span={24}>
                  <div className="price-product">
                    <div>Tạm tính</div>
                    <div>{formattedTotal}</div>
                  </div>
                </Col>
              </Row>
              <Divider></Divider>
              <Row span={24}>
                <Col span={24}>
                  <div className="price-product">
                    <div>Tổng tiền</div>
                    <div className="total-price">{formattedTotal}</div>
                  </div>
                </Col>
              </Row>
              <Divider></Divider>
              <Row span={24}>
                <div className="btn">
                  <button>Mua hàng ({carts.length})</button>
                </div>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Order;
