import PropTypes from "prop-types";
import ItemsList from "../ItemsList/ItemsList";
import BigButton from "../common/BigButton/BigButton";
import addIcon from "../../images/add.svg";
import s from "./CitiesBlock.module.css";

const CitiesBlock = ({ cities }) => {
  const handleStartEdit = () => {};
  const handleStartDelete = () => {};
  return (
    <div className={s.container}>
      <ItemsList
        items={cities}
        onEditItem={handleStartEdit}
        onDeleteItem={handleStartDelete}
      />
      <BigButton text="Добавить город" icon={addIcon} />
    </div>
  );
};

CitiesBlock.propTypes = {
  cities: PropTypes.array.isRequired,
};

export default CitiesBlock;
