import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  useParams,
  NavLink,
  useLocation,
  Outlet,
  useNavigate,
} from "react-router-dom";
import BigButton from "../../components/common/BigButton/BigButton";
import Header from "../../components/Header/Header";
import * as api from "../../services/api";
import s from "./DepartmentPage.module.css";

const API_ENDPOINT = "departments";

const DepartmentPage = () => {
  const [department, setDepartment] = useState({});
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartment = () => {
      api
        .getData(`${API_ENDPOINT}/${params.id}`)
        .then(setDepartment)
        .catch((err) => {
          toast.error("Факультет не найден");
          navigate(location.state?.from ?? "/departments");
        });
    };
    fetchDepartment();
  }, [location.state?.from, navigate, params.id]);

  const handleGoBack = () => {
    navigate(location.state?.from ?? "/departments");
  };

  return (
    <>
      <Header title={department.name ?? "Факультет"} />
      <div className={s.wrapper}>
        <BigButton
          text={location.state?.label ?? "Назад ко всем факультетам"}
          onClick={handleGoBack}
          isGray
        />
      </div>

      <nav className={s.nav}>
        <div className={s.linkWrapper}>
          <NavLink
            to="description"
            className={({ isActive }) =>
              isActive || location.pathname === `/departments/${params.id}`
                ? s.activeLink
                : s.link
            }
            state={{
              from: location.state?.from,
              label: location.state?.label,
            }}
          >
            Описание
          </NavLink>
        </div>
        <div>
          <NavLink
            to="history"
            className={({ isActive }) => (isActive ? s.activeLink : s.link)}
            state={{
              from: location.state?.from,
              label: location.state?.label,
            }}
          >
            История
          </NavLink>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default DepartmentPage;
