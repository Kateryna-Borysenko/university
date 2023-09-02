import PropTypes from "prop-types";
import Paper from "../common/Paper/Paper";
import Card from "./Card/Card";
import s from "./UniversityBlock.module.css";

const UniversityBlock = ({ name, description }) => {
  return (
    <section className={s.section}>
      <Paper>
        <Card name={name} />
      </Paper>

      <Paper>
        <p className={s.text}>{description}</p>
      </Paper>
    </section>
  );
};

UniversityBlock.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default UniversityBlock;
