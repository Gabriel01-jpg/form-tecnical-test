import React from "react";
import "./styles.css";
import spinner from "../../assets/90-ring.svg";

interface SpinnerProps {
  size?: number;
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 40, color = "#000" }) => {
  const style = {
    width: size,
    height: size,
    borderColor: color,
  };

  return (
    <img src={spinner} className="spinner" style={style} />
  );
};

export default Spinner;
