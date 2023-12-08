import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import BigButton from "../../common/BigButton/BigButton";
import Paper from "../../common/Paper/Paper";
import Loader from "../../common/Loader/Loader";
import ErrorMsg from "../../common/ErrorMsg/ErrorMsg";
import { GENDER } from "./formData";
import { citiesOptions } from "./formData";
import { addTutor } from "../../../redux/tutors/tutorsActions";
import { validationSchema } from "./validationSchema";
import * as api from "../../../services/api";
import s from "./TutorForm.module.css";

const API_ENDPOINT = "tutors";

const TutorForm = ({ closeForm }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [newTutor, setNewTutor] = useState(null);
  // api request status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { errors } = formState;

  const onSubmit = (data) => {
    setNewTutor(data);
    reset();
  };

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
          toast.success(t("tutorForm.success-add"));
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
  }, [closeForm, dispatch, newTutor, t]);

  return (
    <div className={s.container}>
      {loading && <Loader />}

      <Paper>
        <div className={s.inner}>
          <h4 className={s.formName}>{t("tutorForm.title")}</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={s.textFieldContainer}>
              <input
                className={s.textField}
                type="text"
                placeholder={t("tutorForm.lastName")}
                {...register("lastName")}
              />
              {errors.lastName && (
                <ErrorMsg message={errors.lastName.message} />
              )}

              <input
                className={s.textField}
                type="text"
                placeholder={t("tutorForm.firstName")}
                {...register("firstName")}
              />
              {errors.firstName && (
                <ErrorMsg message={errors.firstName.message} />
              )}

              <input
                className={s.textField}
                type="tel"
                placeholder={t("tutorForm.phone")}
                {...register("phone")}
              />
              {errors.phone && <ErrorMsg message={errors.phone.message} />}
              <input
                className={s.textField}
                type="email"
                placeholder={t("tutorForm.firstName")}
                {...register("email")}
              />
              {errors.email && <ErrorMsg message={errors.email.message} />}

              <select className={s.textField} {...register("city")}>
                {citiesOptions.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {t(label)}
                  </option>
                ))}
              </select>
              {errors.city && <ErrorMsg message={errors.city.message} />}

              <section>
                <h5 className={s.inner}>{t("tutorForm.gender")}</h5>
                <label className={s.inner}>{t("tutorForm.gender-male")}</label>
                <input
                  className={s.textField}
                  type="radio"
                  value={GENDER.MALE}
                  {...register("gender")}
                />
                <label className={s.inner}>
                  {t("tutorForm.gender-female")}
                </label>
                <input
                  className={s.textField}
                  type="radio"
                  value={GENDER.FEMALE}
                  {...register("gender")}
                />
              </section>
              {errors.gender && <ErrorMsg message={errors.gender.message} />}
            </div>

            <label className={s.inner}>{t("tutorForm.isFullTime")}</label>
            <input
              className={s.textField}
              type="checkbox"
              {...register("isFullTime")}
            />

            <BigButton type="submit" text={t("tutors.add-tutor")} />
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
