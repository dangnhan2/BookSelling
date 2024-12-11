import {
  Table,
  Row,
  Col,
  Button,
  Drawer,
  Badge,
  Descriptions,
  notification,
  message,
  Form,
} from "antd";
import InputSearch from "./Input";
import { useEffect, useState } from "react";
import { userPagination, deleteUser } from "../../service/api";
import { IoReload } from "react-icons/io5";
import "./TableUser.scss";
import { IoAdd } from "react-icons/io5";
import { FaFileImport } from "react-icons/fa6";
import { FaFileExport } from "react-icons/fa6";
import AddUser from "../ModalAdd/addUser";
import ImportUser from "./ImportUser";
import UpdateUser from "./UpdateUser";
import * as XLSX from "xlsx";
const UserTable = () => {
  const [current, setCurrent] = useState(1);
  const [size, setSize] = useState(4);
  const [total, setTotal] = useState();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sorterField, setSorter] = useState("");
  const [filterField, setFilterField] = useState("");
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalImportOpen, setIsModalImportOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState();
  // console.log(user);
  const [form] = Form.useForm();
  const onClose = () => {
    setModal(false);
  };

  const handleDelete = async (id) => {
    console.log(id);
    let res = await deleteUser(id);
    if (res && res.statusCode === 200 && res.data) {
      message.success("Delete Successed");
      getUser();
    } else {
      notification.error({
        message: "Delete Failed",
        description: res.message,
        duration: 5,
      });
    }
  };

  const handleUpdate = (id) => {
    setDataUpdate(id);
    setIsModalUpdateOpen(true);
    console.log(dataUpdate);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      render: (text, record, index) => {
        // console.log(record);
        return (
          <a
            onClick={() => {
              setModal(true);
              setUser(record);
            }}
          >
            {record._id}
          </a>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "fullName",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
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
    {
      title: "Action",
      render: (text, record, index) => {
        // console.log("check: ", text, record, index);
        return (
          <div>
            <Button onClick={() => handleDelete(record._id)}>Delete</Button>
            <Button
              onClick={() => handleUpdate(record)}
              style={{ marginLeft: "5px" }}
            >
              Update
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getUser();
  }, [current, size, filterField, sorterField]);

  const getUser = async () => {
    let query = `current=${current}&pageSize=${size}`;
    if (filterField) {
      query += `&${filterField}`;
    }

    if (sorterField) {
      query += `&sort=${sorterField}`;
    }

    setLoading(true);
    let res = await userPagination(query);
    // console.log(query);
    setLoading(false);

    if (res && res.data) {
      setUsers(res.data.result);
      setTotal(res.data.meta.total);
    }
  };

  const onChange = (pagination, filters, sorter, extra) => {
    // console.log(pagination);
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }

    if (pagination && pagination.pageSize !== size) {
      setSize(pagination.pageSize);
    }

    console.log(sorter);
    if (sorter && sorter.field) {
      const q =
        sorter.order === "ascend" ? `${sorter.field}` : `-${sorter.field}`;
      // console.log(q);
      setSorter(q);
    } else {
      setSorter("");
    }
  };

  const refreshUserTable = () => {
    setSorter("");
    setFilterField("");
    getUser();
  };

  const handleSearch = (query) => {
    setFilterField(query);
  };

  const handleExport = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, "ExportUser.xlsx");
  };

  const renderHeader = () => {
    return (
      <div className="container">
        <spam className="title">Table List User</spam>

        <div className="btn">
          <Button
            type="primary"
            icon={<IoAdd />}
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            &nbsp; Add User
          </Button>
          <Button
            type="primary"
            icon={<FaFileImport />}
            onClick={() => setIsModalImportOpen(true)}
          >
            &nbsp; Import
          </Button>
          <Button
            type="primary"
            icon={<FaFileExport />}
            onClick={() => handleExport(users)}
          >
            &nbsp; Export
          </Button>

          <Button onClick={refreshUserTable}>
            <IoReload />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24} style={{ marginLeft: 5 }}>
          <InputSearch handleSearch={handleSearch} />
        </Col>
        <Col span={24} style={{ marginLeft: 5 }}>
          <Table
            title={renderHeader}
            loading={loading}
            className="def"
            columns={columns}
            dataSource={users}
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

      <AddUser
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        getUser={getUser}
      ></AddUser>

      <ImportUser
        isModalImportOpen={isModalImportOpen}
        setIsModalImportOpen={setIsModalImportOpen}
        getUser={getUser}
      ></ImportUser>

      <UpdateUser
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        getUser={getUser}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      ></UpdateUser>

      <Drawer
        title="Basic Drawer"
        onClose={onClose}
        open={modal}
        width={"50vw"}
      >
        <Descriptions
          title="User Info"
          bordered
          column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }}
        >
          <Descriptions.Item label="ID">{user._id}</Descriptions.Item>
          <Descriptions.Item label="Name">{user.fullName}</Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
          <Descriptions.Item label="Role" span={3}>
            <Badge status="processing" text={user.role} />
          </Descriptions.Item>
          <Descriptions.Item label="CreatedAt">
            {user.createdAt}
          </Descriptions.Item>
          <Descriptions.Item label="UpdatedAt">
            {user.updatedAt}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};

export default UserTable;
