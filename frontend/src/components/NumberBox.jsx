import "./NumberBox.css";

const NumberBox = ({ size = "medium", placeholder = "", value, onChange }) => {
  const className = `numberbox ${size}`;

  return (
    <input
      type="Number"
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default NumberBox;
