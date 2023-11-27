import PropTypes from "prop-types";
import BigButton from "../common/BigButton/BigButton";
import Paper from "../common/Paper/Paper";
import Tutor from "./Tutor/Tutor";
import plusImg from "../../images/add.svg";
import s from "./TutorsBlock.module.css";

const TutorsBlock = ({ tutors = [] }) => {
  return (
    <div className={s.container}>
      <ul onClick={(e) => console.log()}>
        {tutors.map((tutor) => (
          <li key={tutor.email} className={s.tutor_container}>
            <Paper>
              <Tutor {...tutor} />
            </Paper>
          </li>
        ))}
      </ul>
      <BigButton icon={plusImg} text="Добавить преподавателя" />
    </div>
  );
};

TutorsBlock.propTypes = {
  tutors: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string,
    }),
  ).isRequired,
};

export default TutorsBlock;
