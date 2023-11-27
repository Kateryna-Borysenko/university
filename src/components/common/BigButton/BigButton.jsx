import PropTypes from "prop-types";
import s from "./BigButton.module.css";

const BigButton = ({ text, icon, onClick }) => {
  return (
    <button className={s.btn}>
      {icon && <img src={icon} className={s.img} alt={text} />}
      <span className={s.text}>{text}</span>
    </button>
  );
};

BigButton.defaultProps = {
  icon: null,
  onClick: () => {},
};

BigButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.string,
};

export default BigButton;
