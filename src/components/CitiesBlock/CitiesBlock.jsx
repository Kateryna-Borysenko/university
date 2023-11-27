import PropTypes from "prop-types";
import List from "../common/List/List";
import BigButton from "../common/BigButton/BigButton";
import addIcon from "../../images/add.svg";
import s from "./CitiesBlock.module.css";

const CitiesBlock = ({ cities }) => {
  return (
    <div className={s.container}>
      <List data={cities} className="cities_container" />
      <BigButton text="Добавить город" icon={addIcon} />
    </div>
  );
};

CitiesBlock.propTypes = {
  cities: PropTypes.array.isRequired,
};

export default CitiesBlock;
