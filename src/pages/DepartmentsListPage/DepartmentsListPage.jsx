import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Paper from '../../components/common/Paper/Paper';
import Header from '../../components/Header/Header';
import * as api from '../../services/api';
import s from './DepartmentsListPage.module.css';

const API_ENDPOINT = 'departments';
const DepartmentsListPage = () => {
  const [departments, setDepartments] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchDepartments = () => {
      api
        .getData(API_ENDPOINT)
        .then(setDepartments)
        .catch(err => console.log(err.message));
    };
    fetchDepartments();
  }, []);
  return (
    <>
      <Header title="Факультеты" />
      {!!departments.length && (
        <ul>
          {departments.map(({ id, name }) => (
            <li key={id} className={s.listElem}>
              <Link
                to={id}
                state={{
                  from: location,
                  label: 'Назад ко всем факультетам',
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
