import { PlusOutlined } from "@ant-design/icons";
import { Divider, Image, Modal, Upload } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const UploadPicture = (props) => {
  const { book } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([
    // {
    //   uid: uuidv4(),
    //   name: book.thumbnail,
    //   status: "done",
    //   url: `http://localhost:8080/images/book/${book?.thumbnail}`,
    // },
    // {
    //   uid: uuidv4(),
    //   name: book?.slider[0],
    //   status: "done",
    //   url: `http://localhost:8080/images/book/${book?.slider[0]}`,
    // },
    // {
    //   uid: "-3",
    //   name: "image.png",
    //   status: "done",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
    // {
    //   uid: "-4",
    //   name: "image.png",
    //   status: "done",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    //   percent: 50,
    // },
  ]);

  useEffect(() => {
    if (book) {
      let imgThumbnail = {},
        imgSlider = [];
      if (book.thumbnail) {
        imgThumbnail = {
          uid: uuidv4(),
          name: book.thumbnail,
          status: "done",
          url: `http://localhost:8080/images/book/${book?.thumbnail}`,
        };
      }

      if (book.slider && book.slider.length > 0) {
        book.slider.map((img) => {
          imgSlider.push({
            uid: uuidv4(),
            name: img,
            status: "done",
            url: `http://localhost:8080/images/book/${img}`,
          });
        });
      }

      //   imgSlider.push(imgThumbnail);
      setFileList([imgThumbnail, ...imgSlider]);
    }
  }, [book]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleCancel = () => {
    setPreviewOpen(false);
  };

  return (
    <>
      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        showUploadList={{ showRemoveIcon: false }}
      >
        {/* {fileList.length >= 8 ? null : uploadButton} */}
      </Upload>
      <Modal
        open={previewOpen}
        title="Picture"
        onCancel={handleCancel}
        footer={null}
      >
        <Divider></Divider>
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default UploadPicture;
