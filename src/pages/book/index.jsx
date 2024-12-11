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
  Divider,
  Popconfirm,
} from "antd";
// import InputSearch from "./Input";
import { useEffect, useState } from "react";
import { bookPagination, callDeleteBook } from "../../service/api";
import { IoReload } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import { FaFileExport } from "react-icons/fa6";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { HiOutlinePencil } from "react-icons/hi";
import InputSearch from "./InputSearch";
import UploadPicture from "./UploadPicture";
import AddBook from "../ModalAdd/addBook";
import BookModalUpdate from "./UpdateModal";
import * as XLSX from "xlsx";
const BookPage = (props) => {
  const [current, setCurrent] = useState(1);
  const [size, setSize] = useState(4);
  const [total, setTotal] = useState();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [sorterField, setSorter] = useState("");
  const [filterField, setFilterField] = useState("");
  const [modal, setModal] = useState(false);
  const [book, setBook] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenDeleteModal, setOpenDeleteModal] = useState(false);
  // const [isModalImportOpen, setIsModalImportOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [sortQuery, setSortQuery] = useState("sort=-updatedAt");
  const [dataUpdate, setDataUpdate] = useState();
  // console.log(Book);
  const [form] = Form.useForm();
  const onClose = () => {
    setModal(false);
    setBook({});
  };

  useEffect(() => {
    getBook();
  }, [current, size, filterField, sorterField]);

  const getBook = async () => {
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
    console.log(res);
    setLoading(false);

    if (res && res.data) {
      setBooks(res.data.result);
      setTotal(res.data.meta.total);
    }
  };

  const confirm = async (_id) => {
    setLoadingDelete(true);
    let res = await callDeleteBook(_id);
    setLoadingDelete(false);
    if (res && res.data) {
      message.success("Delete Successed!");
      getBook();
    } else {
      notification.error({
        message: "Error",
        description: res.message,
        duration: 5,
      });
    }
  };

  const cancel = () => {
    // console.log(e);
    // message.error("Click on No");
    setOpenDeleteModal(false);
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
              setBook(record);
            }}
          >
            {record._id}
          </a>
        );
      },
    },
    {
      title: "Book Title",
      dataIndex: "mainText",
      sorter: true,
    },
    {
      title: "Type",
      dataIndex: "category",
      sorter: true,
    },
    {
      title: "Author",
      dataIndex: "author",
      sorter: true,
    },
    {
      title: "Price",
      dataIndex: "price",
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
        // console.log("check: ", record);
        return (
          <div style={{ width: 120 }}>
            <Popconfirm
              title="Delete the book"
              description="Are you sure to delete this book?"
              onConfirm={() => confirm(record._id)}
              onCancel={cancel}
              open={isOpenDeleteModal}
              okButtonProps={{
                loading: loadingDelete,
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button onClick={() => setOpenDeleteModal(true)}>
                <MdOutlineDeleteOutline />
              </Button>
            </Popconfirm>

            <Button
              style={{ marginLeft: 5 }}
              onClick={() => {
                setIsModalUpdateOpen(true);
                setDataUpdate(record);
              }}
            >
              <HiOutlinePencil />
            </Button>
          </div>
        );
      },
    },
  ];

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
      const q =
        sorter.order === "ascend" ? `${sorter.field}` : `-${sorter.field}`;
      // console.log(q);
      setSorter(q);
    } else {
      setSorter("");
    }
  };

  const refreshBookTable = () => {
    setSorter("");
    setFilterField("");
    getBook();
  };

  const handleSearch = (query) => {
    setFilterField(query);
  };

  const renderHeader = () => {
    return (
      <div className="container">
        <spam className="title">Table List Book</spam>

        <div className="btn">
          <Button
            type="primary"
            icon={<IoAdd />}
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            &nbsp; Add Book
          </Button>

          <Button
            type="primary"
            icon={<FaFileExport />}
            onClick={() => handleExport(books)}
          >
            &nbsp; Export
          </Button>

          <Button onClick={refreshBookTable}>
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
          <InputSearch handleSearch={handleSearch}></InputSearch>
        </Col>
        <Col span={24} style={{ marginLeft: 5 }}>
          <Table
            title={renderHeader}
            loading={loading}
            className="def"
            columns={columns}
            dataSource={books}
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

      <Drawer
        title="Book Infomation"
        onClose={onClose}
        open={modal}
        width={"50vw"}
      >
        <Descriptions
          // title="Book Info"
          bordered
          column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }}
        >
          <Descriptions.Item label="ID">{book._id}</Descriptions.Item>
          <Descriptions.Item label="Title">{book.mainText}</Descriptions.Item>
          <Descriptions.Item label="Author">{book.author}</Descriptions.Item>
          <Descriptions.Item label="Price">{book.price}</Descriptions.Item>
          <Descriptions.Item label="Quantity">
            {book.quantity}
          </Descriptions.Item>
          <Descriptions.Item label="Sold">{book.sold}</Descriptions.Item>
          <Descriptions.Item label="Type" span={3}>
            <Badge status="processing" text={book.category} />
          </Descriptions.Item>
          <Descriptions.Item label="CreatedAt">
            {book.createdAt}
          </Descriptions.Item>
          <Descriptions.Item label="UpdatedAt">
            {book.updatedAt}
          </Descriptions.Item>
        </Descriptions>

        <Divider orientation="left">Picture</Divider>

        <UploadPicture book={book} setBook={setBook}></UploadPicture>
      </Drawer>

      <AddBook
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        getBook={getBook}
      ></AddBook>

      <BookModalUpdate
        openModalUpdate={isModalUpdateOpen}
        setOpenModalUpdate={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        getBook={getBook}
      ></BookModalUpdate>
    </>
  );
};
export default BookPage;
