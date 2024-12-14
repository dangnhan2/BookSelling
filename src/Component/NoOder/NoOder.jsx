import { Empty } from "antd";

const NoOder = () => {
  const myStyle = {
    margin: "15px",
    border: "1px solid transparent",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "white",
    textAlign: "center",
    height: "500px",
  };
  return (
    <div style={myStyle}>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="Giỏ hàng của bạn đang trống"
      />
    </div>
  );
};

export default NoOder;
