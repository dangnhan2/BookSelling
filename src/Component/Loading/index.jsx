import { PacmanLoader } from "react-spinners";

const Loading = () => {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <div style={style}>
      <PacmanLoader />
    </div>
  );
};
export default Loading;
