import { useState } from "react";
import PropTypes from "prop-types";
import BigButton from "../../common/BigButton/BigButton";
import Paper from "../../common/Paper/Paper";
import s from "./TutorForm.module.css";
import { GENDER } from "./formData";
import { citiesOptions } from "./formData";

const TutorForm = ({ onSubmit }) => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isFullTime, setIsFullTime] = useState(false);
  const [city, setCity] = useState("");
  const [gender, setGender] = useState(GENDER.FEMALE);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      lastName,
      firstName,
      phone,
      email,
      isFullTime,
      city,
      gender,
    };
    onSubmit(formData);
    reset();
  };

  const reset = () => {
    setLastName("");
    setFirstName("");
    setPhone("");
    setEmail("");
    setIsFullTime(false);
    setCity("");
    setGender(GENDER.FEMALE);
  };

  const requiredValues = [lastName, firstName, phone, email, city, gender];
  const isSubmitBtnDisabled = requiredValues.some((value) => !value);

  // Todo: добавить валидацию формы

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
            <select
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={s.textField}
            >
              {citiesOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            <div className={s.gender}>
              <h5 className={s.genderTitle}>Пол*</h5>
              <label className={s.inner}>
                <input
                  type="radio"
                  checked={gender === GENDER.FEMALE}
                  name="gender"
                  value={GENDER.FEMALE}
                  onChange={(e) => setGender(e.target.value)}
                />
                <span className={s.span}>Женщина</span>
              </label>
              <label className={s.inner}>
                <input
                  type="radio"
                  checked={gender === GENDER.MALE}
                  name="gender"
                  value={GENDER.MALE}
                  onChange={(e) => setGender(e.target.value)}
                />
                <span className={s.span}> Мужчина</span>
              </label>
            </div>

            <label className={s.isFullTime}>
              <input
                name="isFullTime"
                type="checkbox"
                checked={isFullTime}
                onChange={(e) => setIsFullTime(e.target.checked)}
              />
              <span className={s.span}>На постоянной основе</span>
            </label>
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
