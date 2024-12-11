import {
  Modal,
  message,
  Upload,
  Form,
  Table,
  Divider,
  notification,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import { useState } from "react";
import { importUser } from "../../service/api";
const { Dragger } = Upload;
const ImportUser = (props) => {
  const { isModalImportOpen, setIsModalImportOpen, getUser } = props;
  const [dataExcel, setDataExcel] = useState([]);
  const [form] = Form.useForm();

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 5000);
  };

  const handleChange = (files) => {
    const file = files[0];
    let reader = new FileReader();

    reader.onload = (e) => {
      let data = new Uint8Array(e.target.result);
      let workbook = XLSX.read(data, { type: "array" });
      // find the name of your sheet in the workbook first
      let worksheet = workbook.Sheets["Sheet1"];

      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const propUpload = {
    name: "file",
    multiple: false,
    maxCount: 1,
    // action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    customRequest: dummyRequest,
    accept: ".xlsx, .xls, .csv",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (status === "done") {
        if (info.fileList && info.fileList.length > 0) {
          const file = info.fileList[0].originFileObj;
          let reader = new FileReader();

          reader.onload = (e) => {
            let data = new Uint8Array(e.target.result);
            let workbook = XLSX.read(data, { type: "array" });
            // find the name of your sheet in the workbook first
            let worksheet = workbook.Sheets[workbook.SheetNames[0]];

            const jsonData = XLSX.utils.sheet_to_json(worksheet, {
              header: ["fullName", "email", "phone"],
              range: 1,
            });
            if (jsonData.length > 0) {
              setDataExcel(jsonData);
            }
          };
          reader.readAsArrayBuffer(file);
        }
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(files) {
      handleChange(files);
    },
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  const handleCancel = () => {
    setDataExcel([]);
    setIsModalImportOpen(false);
  };

  const renderHeader = () => {
    return (
      <div className="container">
        <spam className="title">Uploaded Data:</spam>
      </div>
    );
  };

  const handleSubmit = async () => {
    const data = dataExcel.map((index) => {
      index.password = "123456";
      return index;
    });
    let res = await importUser(data);
    if (res && res.statusCode === 201 && res.data) {
      notification.success({
        description: `Success: ${res.data.countSuccess}, Error: ${res.data.countError}`,
        message: "Upload Successed",
      });
      getUser();
      setIsModalImportOpen(false);
      setDataExcel([]);
    } else {
      notification.error({
        description: res.message[0],
        message: "Upload Failed",
      });
    }
  };

  return (
    <Modal
      title="Add User"
      open={isModalImportOpen}
      okText="Import"
      onOk={handleSubmit}
      onCancel={handleCancel}
      okButtonProps={{
        disabled: dataExcel.length < 1,
      }}
      width={1000}
    >
      <Divider />
      <Dragger {...propUpload}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files or. &nbsp;{" "}
          {/* <a onClick={(e) => e.stopPropagation(e)} href={template} download>
            DownLoad File here
          </a> */}
        </p>
      </Dragger>

      <Table
        columns={columns}
        title={renderHeader}
        dataSource={dataExcel}
        form={form}
      ></Table>
    </Modal>
  );
};
export default ImportUser;
