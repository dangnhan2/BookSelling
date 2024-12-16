import { Divider, Row, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { callOrdersHistory } from "../../service/api";
import ReactJson from "react-json-view";
const HistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (id, record, index) => {
        ++index;
        return index;
      },
    },
    {
      title: "Thời gian",
      dataIndex: "createdAt",
    },
    {
      title: "Tổng số tiền",
      dataIndex: "totalPrice",
    },
    {
      title: "Trạng thái",
      dataIndex: "tags",
      key: "tags",
      render: (tags) => (
        <span>
          <Tag color="green" key={tags}>
            Thành Công
          </Tag>
        </span>
      ),
    },
    {
      title: "Chi tiết ",
      dataIndex: "detail",
      render: (_, record) => (
        <ReactJson
          src={record.detail}
          name="Chi tiết mua hàng"
          collapsed={true}
          enableClipboard={false}
          displayDataTypes={false}
          displayObjectSize={false}
        />
      ),
    },
  ];
  useEffect(() => {
    getOrdersHistory();
  }, []);

  const getOrdersHistory = async () => {
    let res = await callOrdersHistory();
    if (res && res.data) {
      console.log(res.data);
      setOrders(res.data);
    }
  };

  return (
    <>
      <div style={{ margin: "0 40px" }}>
        <Row span={24}>
          <div>Lịch sử đặt hàng</div>
        </Row>
        <Divider></Divider>
        <Row span={24}>
          <div style={{ width: "100%" }}>
            <Table
              columns={columns}
              dataSource={orders}
              size="middle"
              pagination={false}
            />
          </div>
        </Row>
      </div>
    </>
  );
};
export default HistoryPage;
