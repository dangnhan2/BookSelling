import { Card, Col, Row, Statistic } from "antd";
import { callDashboard } from "../../service/api";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
const Dashboard = () => {
  const [data, setData] = useState({});
  const formatter = (value) => <CountUp end={value} separator="," />;
  useEffect(() => {
    const getUser_Order = async () => {
      let res = await callDashboard();
      if (res && res.data) {
        setData(res.data);
      }
    };
    getUser_Order();
  }, []);
  return (
    <Row gutter={[40, 40]}>
      <div style={{ display: "flex", margin: "10px 10px" }}>
        <Col span={12}>
          <Card
            // title="User"
            bordered={false}
            style={{
              width: "500px",
            }}
          >
            <Statistic
              title=" Users"
              value={data.countUser}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            // title="Order"
            bordered={false}
            style={{
              width: 500,
            }}
          >
            <Statistic
              title="Orders"
              value={data.countOrder}
              formatter={formatter}
            />
          </Card>
        </Col>
      </div>
    </Row>
  );
};
export default Dashboard;
