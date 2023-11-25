import { useState } from "react";
import PropTypes from "prop-types";
import BigButton from "../common/BigButton/BigButton";
import Paper from "../common/Paper/Paper";
import s from "./TutorForm.module.css";

const TutorForm = ({ onSubmit }) => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ lastName, firstName, phone, email });
    reset();
  };

  const reset = () => {
    setLastName("");
    setFirstName("");
    setPhone("");
    setEmail("");
  };

  const requiredValues = [lastName, firstName, phone, email];
  const isSubmitBtnDisabled = requiredValues.some((value) => !value);

  return (
    <div className={s.container}>
      <Paper>
        <div className={s.inner}>
          <h4 className={s.formName}>Добавление преподавателя</h4>
          <form onSubmit={handleSubmit}>
            <div className={s.textFieldContainer}>
              <input
                className={s.textField}
                name="lastName"
                value={lastName}
                type="text"
                placeholder="Фамилия*"
                required
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                className={s.textField}
                name="firstName"
                value={firstName}
                type="text"
                placeholder="Имя*"
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className={s.textField}
                name="phone"
                value={phone}
                type="tel"
                placeholder="Телефон*"
                required
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                className={s.textField}
                name="email"
                value={email}
                type="email"
                placeholder="Email*"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <BigButton
              type="submit"
              text="Пригласить"
              disabled={isSubmitBtnDisabled}
            />
          </form>
        </div>
      </Paper>
    </div>
  );
};

TutorForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default TutorForm;
