import "./Button.css";

const Button = ({ label, size = "medium", onClick }) => {
  return (
    <button className={`button ${size}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
