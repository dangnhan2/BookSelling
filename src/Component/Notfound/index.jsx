import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import notFound from "../../img/notFound.webp";
const NotFound = () => {
  const navigate = useNavigate();
  const goHomePage = () => {
    navigate("/");
  };
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={goHomePage}>
          Back Home
        </Button>
      }
    />
  );
};
export default NotFound;
