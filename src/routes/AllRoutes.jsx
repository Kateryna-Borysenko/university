import { Suspense, lazy } from "react";
import {
  Routes,
  Route,
  Navigate,
  Location,
  useLocation,
} from "react-router-dom";
import Paper from "../components/common/Paper/Paper";
import { publicRoutes } from "./index";
import Spinner from "../components/common/Spinner/Spinner";

const DepartmentPage = lazy(
  () =>
    import(
      "../pages/DepartmentPage/DepartmentPage" /* webpackChunkName: "Department___page" */
    ),
);
const NotFoundPage = lazy(
  () =>
    import(
      "../pages/NotFoundPage/NotFoundPage" /* webpackChunkName: "NotFound___page" */
    ),
);

const AllRoutes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Navigate to="/departments" replace />} />

        <Route path="/departments/:id" element={<DepartmentPage />}>
          <Route
            index
            element={
              <Paper>
                <p>
                  <span style={{ color: "red" }}>
                    Разобраться !!! c адресной строкой
                  </span>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Incidunt officia reiciendis dolores. Molestiae, dolores iure
                  reiciendis accusamus doloribus illo ratione quia dicta
                  consequuntur deleniti dolor nihil obcaecati, fugiat,
                  accusantium exercitationem sint corporis minus ducimus.
                  Eligendi, aliquid in! Laudantium, excepturi facere ullam ipsum
                  rerum repudiandae cumque sequi blanditiis aperiam. Optio
                  necessitatibus, minima illum placeat cumque vel omnis
                  accusamus nobis quasi maxime et accusantium dolorum,
                  cupiditate ipsum id est architecto molestias possimus hic aut
                  commodi. Neque ipsam quos facere eligendi itaque, et nam
                </p>
              </Paper>
            }
          />
          <Route
            path="description"
            element={
              <Paper>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Incidunt officia reiciendis dolores. Molestiae, dolores iure
                  reiciendis accusamus doloribus illo ratione quia dicta
                  consequuntur deleniti dolor nihil obcaecati, fugiat,
                  accusantium exercitationem sint corporis minus ducimus.
                  Eligendi, aliquid in! Laudantium, excepturi facere ullam ipsum
                  rerum repudiandae cumque sequi blanditiis aperiam. Optio
                  necessitatibus, minima illum placeat cumque vel omnis
                  accusamus nobis quasi maxime et accusantium dolorum,
                  cupiditate ipsum id est architecto molestias possimus hic aut
                  commodi. Neque ipsam quos facere eligendi itaque, et nam
                  nobis, harum ex ad corporis repudiandae maiores temporibus
                  aperiam dolor quisquam unde optio fugiat. Minima minus,
                  numquam doloremque voluptatum ipsa asperiores placeat neque
                  veniam quia aspernatur iusto eaque illo porro. Deleniti, natus
                  ipsa voluptas animi veniam officia libero iusto assumenda
                  provident aut molestias, aliquam sed. Omnis magnam possimus,
                  nisi fugiat consectetur totam! Harum nihil dolore, doloremque
                  cum ab quaerat nulla alias sint consequatur facilis. Illum,
                  voluptatem in eum esse cupiditate assumenda, doloremque
                  tempore dolores cum consequatur quasi magnam sint? Sint qui
                  beatae necessitatibus modi, provident eum, velit labore nisi
                  impedit, magni eveniet dolor illo? Neque non dolorem modi
                  explicabo numquam itaque earum dolor minima, fugiat ratione
                  vero laudantium quidem hic, eius inventore ut adipisci rem
                  voluptatum quia dolores impedit.
                </p>
              </Paper>
            }
          />
          <Route
            path="history"
            element={
              <Paper>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Autem culpa aliquid architecto distinctio animi expedita
                  minima dicta minus magnam repellendus nihil mollitia impedit
                  sequi beatae quae, cupiditate facere at eos dolores
                  exercitationem officiis itaque. Aliquid ducimus, rem impedit
                  iste consectetur totam aspernatur, similique explicabo
                  possimus fuga facilis quam. Amet beatae fugiat optio nemo
                  omnis facere mollitia iusto tempora porro eveniet asperiores
                  minus ducimus, eum magnam vel deleniti inventore molestiae,
                  quidem quis sint commodi harum vero. Beatae in optio illum
                  dignissimos eos rem dolores et molestiae, voluptatibus ex
                  repellat quo? Iste vel provident rerum placeat quasi ex neque
                  adipisci obcaecati quibusdam veniam tempore quisquam
                  exercitationem, veritatis maiores tenetur facilis sit,
                  expedita suscipit soluta hic omnis? Esse dolore vel, neque
                  commodi blanditiis nulla. Sed officia cumque, ab cum, est
                  minima ducimus labore asperiores dolorem facere pariatur modi.
                  Debitis tempore adipisci eligendi temporibus non delectus amet
                  maiores quia voluptas eaque commodi quos ratione iusto
                  corporis magnam soluta magni deserunt obcaecati, nam odit
                  tenetur voluptatum? Corporis illum sunt incidunt ipsam
                  repellat! Ut eum blanditiis saepe animi atque corrupti rem
                  suscipit molestiae ducimus quis? Autem aliquam possimus
                  reiciendis animi asperiores itaque similique quasi aspernatur
                  voluptas blanditiis optio eligendi, harum culpa perspiciatis
                  cum assumenda tenetur, nostrum repellat. Quidem ratione optio
                  magnam officiis et! Dolor iste voluptate aliquam modi facere!
                  Error reprehenderit id ad enim deserunt vitae vero itaque
                  unde, sit blanditiis nisi mollitia saepe perspiciatis
                  architecto porro dolorem eveniet molestias voluptate omnis
                  laboriosam ex quaerat nostrum? Consequatur, quod atque esse,
                  dolor voluptates temporibus ex voluptatibus nulla deleniti
                  totam, ducimus mollitia? Numquam vitae, perferendis qui rem
                  quidem cum placeat dignissimos autem corrupti minima maxime ab
                  sapiente harum quasi sit omnis totam adipisci iusto
                  voluptates, aspernatur porro sint facere maiores? Nisi
                  molestiae quisquam veritatis eum! Non, nulla. Id non assumenda
                  molestias vero et eos amet quo, sed natus.
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
    </Suspense>
  );
};

export default AllRoutes;
