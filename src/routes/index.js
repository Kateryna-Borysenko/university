import { lazy } from "react";

const DepartmentPage = lazy(() =>
  import(
    "../pages/DepartmentPage/DepartmentPage"
    /* webpackChunkName: "Department___page" */
  ),
);
const DepartmentsListPage = lazy(() =>
  import(
    "../pages/DepartmentsListPage/DepartmentsListPage"
    /* webpackChunkName: "Departments__List___page" */
  ),
);
const UniversityPage = lazy(() =>
  import(
    "../pages/UniversityPage/UniversityPage"
    /* webpackChunkName: "University___page" */
  ),
);

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
