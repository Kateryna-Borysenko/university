import { useState } from "react";
import PropTypes from "prop-types";
import BigButton from "../common/BigButton/BigButton";
import Paper from "../common/Paper/Paper";
import Tutor from "./Tutor/Tutor";
import plusImg from "../../images/add.svg";
import s from "./TutorsBlock.module.css";
import TutorForm from "../TutorForm/TutorForm";

const TutorsBlock = (props) => {
  const [tutors, setTutors] = useState(props.tutors);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const toggleForm = () => setIsFormOpen((prevIsFormOpen) => !prevIsFormOpen);

  const addTutor = (formData) => {
    // запроса
    setLoading(true);
    setTimeout(() => {
      setTutors((prevTutors) => [...prevTutors, formData]);
      setLoading(false);
      toggleForm();
    }, 1000);
  };

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
      {isFormOpen && <TutorForm onSubmit={addTutor} />}
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
      lastName: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      isFullTime: PropTypes.bool,
    }),
  ),
};

export default TutorsBlock;
