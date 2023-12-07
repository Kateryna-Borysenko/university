import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import BigButton from "../common/BigButton/BigButton";
import Loader from "../common/Loader/Loader";
import ErrorMsg from "../common/ErrorMsg/ErrorMsg";
import Skeleton from "../common/Skeleton/Skeleton";
import Paper from "../common/Paper/Paper";
import Tutor from "./Tutor/Tutor";
import TutorForm from "./TutorForm/TutorForm";
import * as api from "../../services/api";
import { setTutors } from "../../redux/tutors/tutorsActions";
import plusImg from "../../images/add.svg";
import s from "./TutorsBlock.module.css";

const API_ENDPOINT = "tutors";

const TutorsBlock = () => {
  const tutors = useSelector((state) => state.tutors);
  const dispatch = useDispatch();

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [firstLoading, setFirstLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // FETCH TUTORS

  useEffect(() => {
    const fetchTutors = async () => {
      setFirstLoading(true);
      setLoading(true);
      try {
        const tutors = await api.getData(API_ENDPOINT);
        dispatch(setTutors(tutors));
      } catch (error) {
        setError(error.message);
      } finally {
        setFirstLoading(false);
        setLoading(false);
      }
    };
    fetchTutors();
  }, [dispatch]);

  const toggleForm = useCallback(
    () => setIsFormOpen((prevIsFormOpen) => !prevIsFormOpen),
    [],
  );

  const noTutors = !firstLoading && !tutors.length;

  return (
    <>
      {firstLoading && <Skeleton />}

      {loading && <Loader />}

      {noTutors && <h4 className={s.noTutors}>No tutors yet</h4>}

      {!!tutors.length && (
        <div className={s.container}>
          <ul>
            {tutors.map((tutor) => (
              <li key={tutor.id} className={s.tutor_container}>
                <Paper>
                  <Tutor {...tutor} />
                </Paper>
              </li>
            ))}
          </ul>

          {isFormOpen && <TutorForm closeForm={toggleForm} />}

          {error && <ErrorMsg message={error} />}

          <BigButton
            onClick={toggleForm}
            icon={!isFormOpen && plusImg}
            text={isFormOpen ? "Отменить добавление" : "Добавить преподавателя"}
            disabled={loading}
          />
        </div>
      )}
    </>
  );
};

export default TutorsBlock;
