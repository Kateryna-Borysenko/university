import { useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { ThemeContext, themes } from "../../../context/themeContext";
import { changeFilter } from "../../../redux/cities/citiesActions";
import s from "./Filter.module.css";

//TODO: реализовать подсветку и фокус на инпуте
const Filter = ({ label = "" }) => {
  const filter = useSelector((state) => state.cities.filter);
  const dispatch = useDispatch();

  const { theme } = useContext(ThemeContext);

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className={s.container}>
      <label className={theme === themes.light ? s.lightTheme : s.darkTheme}>
        {label}
        <input
          ref={inputRef}
          className={s.textField}
          type="text"
          value={filter}
          onChange={(e) => dispatch(changeFilter(e.target.value))}
        ></input>
      </label>
    </div>
  );
};

Filter.propTypes = {
  label: PropTypes.string,
};

export default Filter;
