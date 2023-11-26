import PropTypes from "prop-types";
import s from "./Filter.module.css";

//TODO: реализовать подсветку и фокус на инпуте
const Filter = ({ label = "", value, onFilterChange }) => {
  return (
    <div className={s.container}>
      <label>
        {label}
        <input
          className={s.textField}
          type="text"
          value={value}
          onChange={(e) => onFilterChange(e.target.value)}
        ></input>
      </label>
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
