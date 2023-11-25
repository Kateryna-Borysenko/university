import { useState } from "react";
import PropTypes from "prop-types";
import BigButton from "../common/BigButton/BigButton";
import Paper from "../common/Paper/Paper";
import Tutor from "./Tutor/Tutor";
import plusImg from "../../images/add.svg";
import s from "./TutorsBlock.module.css";
import TutorForm from "../TutorForm/TutorForm";

const TutorsBlock = () => {
  const [tutors, setTutors] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newTutor, setNewTutor] = useState(null);

  const [loading, setLoading] = useState(false);

  const toggleForm = () => setIsFormOpen((prevIsFormOpen) => !prevIsFormOpen);
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
      {isFormOpen && <TutorForm onSubmit={setNewTutor} />}
      <BigButton
        onClick={toggleForm}
        icon={!isFormOpen && plusImg}
        text={isFormOpen ? "Отменить добавление" : "Добавить преподавателя"}
        // disabled={loading} //Todo: понадобится при запросе
      />
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
