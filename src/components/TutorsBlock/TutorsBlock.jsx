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

      {showTutors && (
        <ul style={{ marginBottom: 24 }}>
          {tutors.map(tutor => (
            <li key={tutor.id} css={{ marginBottom: 24 }}>
              <Paper>
                <Tutor {...tutor} />
              </Paper>
            </li>
          ))}
        </ul>
      )}

      {noTutors && <h4 className="absence-msg">{t('tutors.no-tutors')}</h4>}

      {error && <ErrorMsg message={error} />}

      {isFormOpen && <TutorForm closeForm={toggleForm} />}

      <BigButton
        onClick={toggleForm}
        icon={!isFormOpen && plusImg}
        text={isFormOpen ? t('common.cancel-add') : t('tutors.add-tutor')}
        disabled={firstLoading}
      />
    </>
  );
};

export default TutorsBlock;
