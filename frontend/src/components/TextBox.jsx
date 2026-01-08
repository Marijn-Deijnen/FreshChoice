import "./TextBox.css";

const TextBox = ({
  size = "medium",
  placeholder = "Enter text...",
  value,
  onChange,
}) => {
  const className = `textbox ${size}`;

  if (size === "multiline") {
    return (
      <textarea
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    );
  }

  return (
    <input
      type="text"
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextBox;
