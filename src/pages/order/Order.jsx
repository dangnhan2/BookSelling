import { Col, Divider, InputNumber, Row } from "antd";
import "./Order.scss";
import { FaRegTrashCan } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { doUpdateAction, doDeleteAction } from "../../redux/order/order.slice";
import { useNavigate } from "react-router-dom";
import NoOder from "../../Component/NoOder/NoOder";
const Order = () => {
  const navigate = useNavigate();
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

  const handleRedirect = () => {
    if (carts.length > 0) {
      navigate("/payment");
    }
  };
  return (
    <>
      <div
        className="container-order"
        style={{ backgroundColor: "#EFEFEF", height: "100vh" }}
      >
        {carts.length === 0 ? (
          <>
            <Row span={24}>
              <div className="container-title">Giỏ hàng</div>
            </Row>
            <Row gutter={[20, 20]}>
              <Col span={18}>
                <NoOder></NoOder>
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
                      <button onClick={() => navigate("/payment")}>
                        Mua hàng ({carts.length})
                      </button>
                    </div>
                  </Row>
                </div>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Row span={24}>
              <div className="container-title">Giỏ hàng</div>
            </Row>
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
                      <button
                        disabled={carts.length === 0}
                        onClick={() => {
                          handleRedirect();
                        }}
                      >
                        Mua hàng ({carts.length})
                      </button>
                    </div>
                  </Row>
                </div>
              </Col>
            </Row>
          </>
        )}
      </div>
    </>
  );
};
export default Order;
