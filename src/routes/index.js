import DepartmentsListPage from "../pages/DepartmentsListPage/DepartmentsListPage";
// import DepartmentPage from '../pages/DepartmentPage/DepartmentPage'
import UniversityPage from "../pages/UniversityPage/UniversityPage";

const departmentsListRoute = {
  path: "/departments",
  component: DepartmentsListPage,
};

// const departmentRoute = {
//   path: '/departments/:id/*',
//   component: DepartmentPage,
// };

const universityRoute = {
  path: "/university",
  component: UniversityPage,
};

export const publicRoutes = [departmentsListRoute, universityRoute];
export const onlyAuthRoutes = [];
export const onlyNotAuthRoutes = [];

const allRoutes = [...publicRoutes, ...onlyAuthRoutes, ...onlyNotAuthRoutes];

export default allRoutes;
