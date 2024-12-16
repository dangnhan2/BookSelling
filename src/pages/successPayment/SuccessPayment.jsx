import { SmileOutlined } from "@ant-design/icons";
import { Button, Result, Row } from "antd";

const SuccessPaymentPage = () => {
  return (
    <>
      <div style={{ backgroundColor: "#EFEFEF", height: "100vh" }}>
        <Row span={24}>
          <div className="container-title">Hoàn tất thanh toán</div>
        </Row>
        <Result
          icon={<SmileOutlined />}
          title="Đơn hàng đã được đặt thành công"
          extra={<Button type="primary">Xem Lịch Sử</Button>}
        />
      </div>
    </>
  );
};
export default SuccessPaymentPage;
