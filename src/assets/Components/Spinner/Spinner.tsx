import react from "react";
import { CircleLoader } from "react-spinners";
import "./spinner.scss";
const Spinner = ({ text }: { text: string }) => {
  return (
    <div className="spinner__container">
      <CircleLoader color="#36d7b7" />
      <p>{text}</p>
    </div>
  );
};

export default Spinner;
