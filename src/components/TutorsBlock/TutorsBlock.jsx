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
import { tutorsSelectors, tutorsOperations } from '../../redux/tutors';
import plusImg from '../../images/add.svg';
import s from './TutorsBlock.module.css';

const TutorsBlock = () => {
  const { t } = useTranslation();

  const tutors = useSelector(tutorsSelectors.getTutors);
  const firstLoading = useSelector(tutorsSelectors.getFirstLoading);
  const error = useSelector(tutorsSelectors.getError);
  const dispatch = useDispatch();

  const [isFormOpen, setIsFormOpen] = useState(false);

  // FETCH TUTORS

  useEffect(() => {
    dispatch(tutorsOperations.getTutors());
  }, [dispatch]);

  const toggleForm = useCallback(
    () => setIsFormOpen(prevIsFormOpen => !prevIsFormOpen),
    [],
  );

  const noTutors = !firstLoading && !tutors.length;

  const showTutors = !firstLoading && !!tutors.length;

  return (
    <>
      {firstLoading && <Skeleton />}

      {firstLoading && <Loader />}

      {noTutors && <h4 className="absence-msg">{t('tutors.no-tutors')}</h4>}

      {showTutors && (
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
            disabled={firstLoading}
          />
        </div>
      )}
    </>
  );
};

export default TutorsBlock;
