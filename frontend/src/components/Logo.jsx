import "./Logo.css";



const Logo = ({ size = "large", onClick }) => {
  return (
    <img className={`logo ${size}`} src="../../assets/freshchoice.png" onClick={onClick}>
    </img>
  );
};

export default Logo;