import {
  Col,
  Row,
  Checkbox,
  Divider,
  Form,
  InputNumber,
  Space,
  Button,
  Rate,
  Tabs,
  Pagination,
  Spin,
} from "antd";
import { FilterTwoTone, ReloadOutlined } from "@ant-design/icons";
import "./home.scss";
import { useEffect, useState } from "react";
import { callFetchCategory, bookPagination } from "../../service/api";
import { Navigate, useNavigate } from "react-router-dom";
const Home = () => {
  const [category, setCategory] = useState([]);
  const [books, setBooks] = useState([]);
  const [current, setCurrent] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(false);
  const [sorterField, setSorter] = useState("");
  const [filterField, setFilterField] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=-sold");
  const navigate = useNavigate();
  const items = [
    {
      key: `-sold`,
      label: "Phổ biến",
      children: "",
    },
    {
      key: "-updatedAt",
      label: "Hàng mới",
      children: "",
    },
    {
      key: "price",
      label: "Giá thấp đến cao",
      children: "",
    },
    {
      key: "-price",
      label: "Giá cao đến thấp",
      children: "",
    },
  ];
  const [form] = Form.useForm();
  useEffect(() => {
    getBookPagination();
  }, [current, size, filterField, sorterField]);

  const getBookPagination = async () => {
    let query = `current=${current}&pageSize=${size}`;
    if (filterField) {
      query += `&${filterField}`;
    }

    if (sorterField) {
      query += `&sort=${sorterField}`;
    } else {
      query += `&${sortQuery}`;
    }

    setLoading(true);
    let res = await bookPagination(query);
    setLoading(false);
    if (res && res.data) {
      setBooks(res.data.result);
      setTotal(res.data.meta.total);
    }
  };

  useEffect(() => {
    const getCategory = async () => {
      let res = await callFetchCategory();
      if (res && res.data) {
        const d = res.data.map((item) => {
          return { label: item, value: item };
        });
        setCategory(d);
      }
    };

    getCategory();
  }, []);

  const onChange = (checkedValues) => {
    if (checkedValues === "-sold") {
      setSorter(sortQuery);
    }
    if (checkedValues === "-updatedAt") {
      setSorter("-updatedAt");
    }
    if (checkedValues === "-price") {
      setSorter("-price");
    }
    if (checkedValues === "price") {
      setSorter("price");
    }
  };

  const onChangePagination = (pagination) => {
    console.log(pagination);
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }

    if (pagination && pagination.pageSize !== size) {
      setSize(pagination.pageSize);
    }
  };

  const handleChangeFilter = (changedValues, values) => {
    console.log(changedValues, values);

    if (changedValues.category) {
      if (changedValues.category) {
        const category = values.category.join(",");
        console.log(category);
        setFilterField(`category=${category}`);
      } else {
        setFilterField("");
      }
    }
  };
  const onFinish = (values) => {
    console.log(values.range.from);
    if (values?.range?.from >= 0 && values?.range?.to >= 0) {
      let value = `price>=${values?.range?.from}&price<=${values?.range?.to}`;
      if (values?.category.length) {
        value += `&category=${values?.category.join(",")}`;
      }
      setFilterField(value);
    } else {
      setBooksFilter("");
    }
  };

  function toNonAccentVietnamese(str) {
    str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
  }

  const convertSlug = (str) => {
    str = toNonAccentVietnamese(str);
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from =
      "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
    var to =
      "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes

    return str;
  };

  const handleRedirect = (item) => {
    const slug = convertSlug(item.mainText);
    navigate(`/book/${slug}?id=${item._id}`);
  };

  return (
    <>
      <div
        className="homepage-container"
        style={{ maxWidth: 1440, margin: "0 auto" }}
      >
        <Row gutter={[20, 20]}>
          <Col
            md={4}
            sm={0}
            xs={0}
            style={{
              border: "1px solid #rgb(0, 0, 0.5)",
              borderRadius: "5px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>
                {" "}
                <FilterTwoTone /> Bộ lọc tìm kiếm
              </span>
              <ReloadOutlined
                title="Reset"
                onClick={() => form.resetFields()}
              />
            </div>

            <Divider></Divider>
            <Form
              onFinish={onFinish}
              form={form}
              onValuesChange={(changedValues, values) =>
                handleChangeFilter(changedValues, values)
              }
            >
              <Form.Item
                name="category"
                label="Danh mục sản phẩm"
                labelCol={{ span: 24 }}
              >
                <Checkbox.Group>
                  <Row>
                    {category.map((item, index) => (
                      <Col span={24} style={{ padding: "10px" }} key={index}>
                        <Checkbox value={item.value}>{item.label}</Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </Form.Item>
              <Divider />
              <Form.Item label="Khoảng giá" labelCol={{ span: 24 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <Form.Item name={["range", "from"]}>
                    <InputNumber
                      name="from"
                      min={0}
                      placeholder="đ TỪ"
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                  <span>-</span>
                  <Form.Item name={["range", "to"]}>
                    <InputNumber
                      name="to"
                      min={0}
                      placeholder="đ ĐẾN"
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                </div>
                <div>
                  <Button
                    onClick={() => form.submit()}
                    style={{ width: "100%" }}
                    type="primary"
                  >
                    Áp dụng
                  </Button>
                </div>
              </Form.Item>
              <Divider />
              <Form.Item label="Đánh giá" labelCol={{ span: 24 }}>
                <div>
                  <Rate
                    value={5}
                    disabled
                    style={{ color: "#ffce3d", fontSize: 15 }}
                  />
                  <span className="ant-rate-text"></span>
                </div>
                <div>
                  <Rate
                    value={4}
                    disabled
                    style={{ color: "#ffce3d", fontSize: 15 }}
                  />
                  <span className="ant-rate-text">trở lên</span>
                </div>
                <div>
                  <Rate
                    value={3}
                    disabled
                    style={{ color: "#ffce3d", fontSize: 15 }}
                  />
                  <span className="ant-rate-text">trở lên</span>
                </div>
                <div>
                  <Rate
                    value={2}
                    disabled
                    style={{ color: "#ffce3d", fontSize: 15 }}
                  />
                  <span className="ant-rate-text">trở lên</span>
                </div>
                <div>
                  <Rate
                    value={1}
                    disabled
                    style={{ color: "#ffce3d", fontSize: 15 }}
                  />
                  <span className="ant-rate-text">trở lên</span>
                </div>
              </Form.Item>
            </Form>
          </Col>
          <Col md={1}></Col>
          <Col
            md={19}
            xs={24}
            style={{
              border: "1px ridge rgb(0, 0, 0, 0,5)",
              borderRadius: "5px",
            }}
          >
            <Row>
              <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </Row>
            <Row className="customize-row">
              {books.map((item, index) => (
                <div
                  className="column"
                  key={index}
                  onClick={() => handleRedirect(item)}
                >
                  <div className="wrapper">
                    <div className="thumbnail">
                      <img
                        src={`http://localhost:8080/images/book/${item.thumbnail}`}
                        alt="thumbnail book"
                        // style={{ maxWidth: 200, height: 250 }}
                      />
                    </div>
                    <div className="text">{item.mainText}</div>
                    <div className="price">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.price)}
                    </div>
                    <div className="rating">
                      <Rate
                        value={5}
                        disabled
                        style={{ color: "#ffce3d", fontSize: 10 }}
                      />
                      <span>Đã bán: {item.sold}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Row>
            <Divider />
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                current={current}
                pageSize={size}
                total={total}
                onChange={(p, s) =>
                  onChangePagination({ current: p, pageSize: s })
                }
                responsive
              />
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Home;
