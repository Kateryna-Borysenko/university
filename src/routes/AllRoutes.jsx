import { Routes, Route, Navigate } from "react-router-dom";
import Paper from "../components/common/Paper/Paper";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import DepartmentPage from "../pages/DepartmentPage/DepartmentPage";
import { publicRoutes } from "./index";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/departments" replace />} />

      <Route path="/departments/:id" element={<DepartmentPage />}>
        <Route
          index
          element={
            <Paper>
              <p>
                Description Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Accusamus assumenda explicabo, delectus doloribus eligendi
                incidunt consequuntur eveniet id? Atque facilis unde adipisci
                quibusdam officiis vero architecto modi, consequatur aut quaerat
                blanditiis perspiciatis. Consectetur veniam molestias atque
                omnis! Cumque at a impedit rem quod. Debitis beatae sunt
                officia. Omnis, molestias dicta!
              </p>
            </Paper>
          }
        />
        <Route
          path="description"
          element={
            <Paper>
              <p>
                Description Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Accusamus assumenda explicabo, delectus doloribus eligendi
                incidunt consequuntur eveniet id? Atque facilis unde adipisci
                quibusdam officiis vero architecto modi, consequatur aut quaerat
                blanditiis perspiciatis. Consectetur veniam molestias atque
                omnis! Cumque at a impedit rem quod. Debitis beatae sunt
                officia. Omnis, molestias dicta!
              </p>
            </Paper>
          }
        />
        <Route
          path="history"
          element={
            <Paper>
              <p>
                History Lorem ipsum dolor sit amet consectetur adipisicing elit.
                A quod nisi voluptatum unde obcaecati autem voluptates natus
                quaerat quibusdam suscipit iure ipsum quam, et libero nemo
                aspernatur quas nihil fuga!
              </p>
            </Paper>
          }
        />
      </Route>

      {publicRoutes.map(({ path, component: Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AllRoutes;
