import PropTypes from "prop-types";
import Paper from "../common/Paper/Paper";
import Card from "./Card/Card";

const UniversityBlock = ({ name, description }) => {
  return (
    <div>
      <Paper>
        <Card name={name} />
      </Paper>

      <Paper>
        <p>{description}</p>
      </Paper>
    </div>
  );
};

UniversityBlock.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default UniversityBlock;
