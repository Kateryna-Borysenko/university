import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import BigButton from "../common/BigButton/BigButton";
import Loader from "../common/Loader/Loader";
import ErrorMsg from "../common/ErrorMsg/ErrorMsg";
import Skeleton from "../common/Skeleton/Skeleton";
import Paper from "../common/Paper/Paper";
import Tutor from "./Tutor/Tutor";
import TutorForm from "./TutorForm/TutorForm";
import * as api from "../../services/api";
import s from "./TutorsBlock.module.css";
import plusImg from "../../images/add.svg";

const API_ENDPOINT = "tutors";

const TutorsBlock = () => {
  const [tutors, setTutors] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newTutor, setNewTutor] = useState(null);

  // api request status
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
        setTutors(tutors);
      } catch (error) {
        setError(error.message);
      } finally {
        setFirstLoading(false);
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

  // ADD TUTOR

  useEffect(() => {
    if (!newTutor) return;

    let isTutorsMounted = true;
    const addTutor = async () => {
      setLoading(true);
      setError(null);

      const isDuplicateEmail = tutors.some(
        (tutor) => tutor.email === newTutor.email,
      );

      if (isDuplicateEmail) {
        if (isTutorsMounted) {
          toast.warn(`User with this email ${newTutor.email} already exists`);
          setLoading(false);
          return;
        }
      }

      try {
        const savedTutor = await api.saveItem(API_ENDPOINT, newTutor);
        if (isTutorsMounted) {
          setTutors((prevTutors) => [...prevTutors, savedTutor]);
        }
      } catch (error) {
        if (isTutorsMounted) {
          setError(error.message);
        }
      } finally {
        if (isTutorsMounted) {
          setLoading(false);
          setNewTutor(null);
          setIsFormOpen(false);
        }
      }
    };

    addTutor();

    return () => {
      isTutorsMounted = false;
    };
  }, [newTutor, tutors]);

  const toggleForm = () => setIsFormOpen((prevIsFormOpen) => !prevIsFormOpen);

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

          {isFormOpen && <TutorForm onSubmit={setNewTutor} />}

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
