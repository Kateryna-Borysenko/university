import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

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
          toast.error(t("department.not-found"));
          navigate(location.state?.from ?? "/departments");
        });
    };
    fetchDepartment();
  }, [location.state?.from, navigate, params.id, t]);

  const handleGoBack = () => {
    navigate(location.state?.from ?? "/departments");
  };

  return (
    <>
      <Header title={department.name ?? t("departments.department")} />
      <div className={s.wrapper}>
        <BigButton
          text={location.state?.label ?? t("department.go-back-btn")}
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
            {t("department.description")}
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
            {t("department.history")}
          </NavLink>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default DepartmentPage;
