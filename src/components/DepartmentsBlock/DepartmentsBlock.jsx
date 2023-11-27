import PropTypes from "prop-types";
import BigButton from "../common/BigButton/BigButton";
import List from "../common/List/List";
import addIcon from "../../images/add.svg";

const DepartmentsBlock = ({ departments }) => {
  return (
    <div>
      <List data={departments} className="departments_container" />
      <BigButton text="Добавить факультет" icon={addIcon} />
    </div>
  );
};

DepartmentsBlock.propTypes = {
  departments: PropTypes.array.isRequired,
};

export default DepartmentsBlock;
