import { Col, Row, Table } from "antd";
import { orderPagination } from "../../service/api";
import { useEffect, useState } from "react";

const OrderTable = () => {
  const [current, setCurrent] = useState(1);
  const [size, setSize] = useState(5);
  const [total, setTotal] = useState();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sorterField, setSorter] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=-createdAt");
  // console.log(sorterField);

  useEffect(() => {
    getOrder();
  }, [current, size, sorterField]);

  const getOrder = async () => {
    let query = `current=${current}&pageSize=${size}`;

    if (sorterField) {
      query += `&sort=${sorterField}`;
    } else {
      query += `&${sortQuery}`;
    }
    console.log(query);

    setLoading(true);
    let res = await orderPagination(query);
    // console.log(res);
    setLoading(false);

    if (res && res.data) {
      setOrders(res.data.result);
      setTotal(res.data.meta.total);
    }
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log(pagination);
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }

    if (pagination && pagination.pageSize !== size) {
      setSize(pagination.pageSize);
    }
    console.log(sorter);

    if (sorter && sorter.field) {
      let field =
        sorter.order === "ascend" ? `${sorter.field}` : `-${sorter.field}`;
      setSorter(field);
    } else {
      setSorter("");
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      render: (text, record, index) => {
        // console.log(record);
        return <a>{record._id}</a>;
      },
    },
    {
      title: "Price",
      dataIndex: "totalPrice",
      sorter: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: true,
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      sorter: true,
    },
  ];
  const renderHeader = () => {
    return (
      <div className="container">
        <spam className="title">Table List Order</spam>
      </div>
    );
  };
  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24} style={{ margin: "5px" }}>
          <Table
            title={renderHeader}
            loading={loading}
            className="def"
            columns={columns}
            dataSource={orders}
            onChange={onChange}
            pagination={{
              current: current,
              pageSize: size,
              showSizeChange: true,
              total: total,
            }}
            bordered
          />
        </Col>
      </Row>
    </>
  );
};
export default OrderTable;
