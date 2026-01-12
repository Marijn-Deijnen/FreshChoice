import "./Button.css";

const Button = ({ label, size = "medium", onClick, variant = "default" }) => {
  return (
    <button className={`button ${size} ${variant}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
