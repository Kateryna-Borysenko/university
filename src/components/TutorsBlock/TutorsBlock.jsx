import { useTranslation } from 'react-i18next';
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BigButton from '../common/BigButton/BigButton';
import Loader from '../common/Loader/Loader';
import ErrorMsg from '../common/ErrorMsg/ErrorMsg';
import Skeleton from '../common/Skeleton/Skeleton';
import Paper from '../common/Paper/Paper';
import Tutor from './Tutor/Tutor';
import TutorForm from './TutorForm/TutorForm';
import plusImg from '../../images/add.svg';
import s from './TutorsBlock.module.css';

import { getTutors } from '../../redux/tutors/tutorsOperations';

const TutorsBlock = () => {
  const { t } = useTranslation();

  const tutors = useSelector(state => state.tutors.items);
  const loading = useSelector(state => state.tutors.loading);
  const error = useSelector(state => state.tutors.error);
  const dispatch = useDispatch();

  const [isFormOpen, setIsFormOpen] = useState(false);

  // FETCH TUTORS

  useEffect(() => {
    dispatch(getTutors());
  }, [dispatch]);

  const toggleForm = useCallback(
    () => setIsFormOpen(prevIsFormOpen => !prevIsFormOpen),
    [],
  );

  const noTutors = !loading && !tutors.length;

  return (
    <>
      {loading && <Skeleton />}

      {loading && <Loader />}

      {noTutors && <h4 className="absence-msg">{t('tutors.no-tutors')}</h4>}

      {!!tutors.length && (
        <div className={s.container}>
          <ul>
            {tutors.map(tutor => (
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
            text={isFormOpen ? t('common.cancel-add') : t('tutors.add-tutor')}
            disabled={loading}
          />
        </div>
      )}
    </>
  );
};

export default TutorsBlock;
