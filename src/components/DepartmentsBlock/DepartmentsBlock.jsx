import PropTypes from "prop-types";
import BigButton from "../common/BigButton/BigButton";
import ItemsList from "../ItemsList/ItemsList";
import addIcon from "../../images/add.svg";

const DepartmentsBlock = ({ departments }) => {
  const handleStartEdit = () => {};
  const handleStartDelete = () => {};
  return (
    <div>
      <ItemsList
        items={departments}
        onEditItem={handleStartEdit}
        onDeleteItem={handleStartDelete}
      />
      <BigButton text="Добавить факультет" icon={addIcon} />
    </div>
  );
};

DepartmentsBlock.propTypes = {
  departments: PropTypes.array.isRequired,
};

export default DepartmentsBlock;
