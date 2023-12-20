import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Paper from '../../components/common/Paper/Paper';
import Header from '../../components/Header/Header';
import AbsenceMsg from '../../components/common/AbsenceMsg/AbsenceMsg';
import {
  departmentsOperations,
  departmentsSelectors,
} from '../../redux/departments';
import s from './DepartmentsListPage.module.css';

const DepartmentsListPage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(departmentsOperations.getDepartments());
  }, [dispatch]);

  const loading = useSelector(departmentsSelectors.getLoading);
  const departments = useSelector(departmentsSelectors.getDepartments);

  const noDepartments = !loading && !departments.length;
  return (
    <>
      <Header title={t('sidebar.departments')} />

      {noDepartments && (
        <AbsenceMsg message={t('departments.no-departments')} />
      )}

      {!!departments.length && (
        <ul>
          {departments.map(({ id, name }) => (
            <li key={id} className={s.listElem}>
              <Link
                to={id}
                state={{
                  from: location,
                  label: 'department.go-back-btn',
                }}
              >
                <Paper>
                  <p className={s.text}>{name}</p>
                </Paper>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default DepartmentsListPage;
