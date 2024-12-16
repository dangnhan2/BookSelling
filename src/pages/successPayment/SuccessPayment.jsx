import { SmileOutlined } from "@ant-design/icons";
import { Button, Result, Row } from "antd";
import { useNavigate } from "react-router-dom";

const SuccessPaymentPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div style={{ backgroundColor: "#EFEFEF", height: "100vh" }}>
        <Row span={24}>
          <div className="container-title">Hoàn tất thanh toán</div>
        </Row>
        <Result
          icon={<SmileOutlined />}
          title="Đơn hàng đã được đặt thành công"
          extra={
            <Button type="primary" onClick={() => navigate("/history")}>
              Xem Lịch Sử
            </Button>
          }
        />
      </div>
    </>
  );
};
export default SuccessPaymentPage;
