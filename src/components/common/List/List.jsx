import PropTypes from "prop-types";
import Paper from "../../common/Paper/Paper";
import dots from "../../../images/dots.svg";
import s from "./List.module.css";
import classNames from "classnames";

const List = ({ data, className }) => {
  return (
    <ul className={s.container}>
      {data.map((item, index) => (
        <li key={index} className={s.item}>
          <Paper>
            <div className={classNames(s.info_container, s[`${className}`])}>
              <p className={s.title}>{item.name}</p>
              <button className={s.btn}>
                <img src={dots} alt="Menu" />
              </button>
            </div>
          </Paper>
        </li>
      ))}
    </ul>
  );
};

List.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ).isRequired,
};

export default List;
