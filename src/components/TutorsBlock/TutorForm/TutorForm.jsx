import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import BigButton from "../../common/BigButton/BigButton";
import Paper from "../../common/Paper/Paper";
import Loader from "../../common/Loader/Loader";
import ErrorMsg from "../../common/ErrorMsg/ErrorMsg";
import { GENDER } from "./formData";
import { citiesOptions } from "./formData";
import { addTutor } from "../../../redux/tutors/tutorsActions";
import * as api from "../../../services/api";
import s from "./TutorForm.module.css";

const API_ENDPOINT = "tutors";

const INITIAL_STATE = {
  lastName: "",
  firstName: "",
  phone: "",
  email: "",
  isFullTime: false,
  city: "",
  gender: "",
};

const TutorForm = ({ closeForm }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ ...INITIAL_STATE });
  const [newTutor, setNewTutor] = useState(null);
  // api request status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const isCheckbox = type === "checkbox";
    setFormData({
      ...formData,
      [name]: isCheckbox ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewTutor({ ...formData });
    reset();
  };

  const reset = () => setFormData({ ...INITIAL_STATE });

  // ADD TUTOR

  useEffect(() => {
    if (!newTutor) return;

    let isTutorsMounted = true;
    const handleAddTutor = async () => {
      setLoading(true);
      setError(null);
      try {
        const savedTutor = await api.saveItem(API_ENDPOINT, newTutor);
        if (isTutorsMounted) {
          dispatch(addTutor(savedTutor));
        }
      } catch (error) {
        if (isTutorsMounted) {
          setError(error.message);
        }
      } finally {
        if (isTutorsMounted) {
          setLoading(false);
          setNewTutor(null);
          closeForm();
        }
      }
    };
    handleAddTutor();

    return () => {
      isTutorsMounted = false;
    };
  }, [closeForm, dispatch, newTutor]);

  const { lastName, firstName, phone, email, city, gender, isFullTime } =
    formData;

  const requiredValues = [lastName, firstName, phone, email, city, gender];
  const isSubmitBtnDisabled = requiredValues.some((value) => !value);

  return (
    <div className={s.container}>
      {loading && <Loader />}

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
                onChange={handleChange}
              />
              <input
                className={s.textField}
                name="firstName"
                value={firstName}
                type="text"
                placeholder="Имя*"
                required
                onChange={handleChange}
              />
              <input
                className={s.textField}
                name="phone"
                value={phone}
                type="tel"
                placeholder="Телефон*"
                required
                onChange={handleChange}
              />
              <input
                className={s.textField}
                name="email"
                value={email}
                type="email"
                placeholder="Email*"
                required
                onChange={handleChange}
              />

              <select
                name="city"
                value={city}
                onChange={handleChange}
                className={s.textField}
              >
                {citiesOptions.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>

              <section>
                <h5 className={s.inner}>Пол*</h5>
                <label className={s.inner}>Мужчина</label>
                <input
                  className={s.textField}
                  type="radio"
                  checked={gender === GENDER.MALE}
                  name="gender"
                  value={GENDER.MALE}
                  onChange={handleChange}
                />
                <label className={s.inner}>Женщина</label>
                <input
                  className={s.textField}
                  type="radio"
                  checked={gender === GENDER.FEMALE}
                  name="gender"
                  value={GENDER.FEMALE}
                  onChange={handleChange}
                />
              </section>
            </div>
            <label className={s.inner}>На постоянной основе</label>
            <input
              className={s.textField}
              name="isFullTime"
              type="checkbox"
              checked={isFullTime}
              onChange={handleChange}
            />

            <BigButton
              type="submit"
              text="Пригласить"
              disabled={isSubmitBtnDisabled}
            />
          </form>
        </div>
      </Paper>

      {error && <ErrorMsg message={error} />}
    </div>
  );
};

TutorForm.propTypes = {
  closeForm: PropTypes.func.isRequired,
};

export default TutorForm;
