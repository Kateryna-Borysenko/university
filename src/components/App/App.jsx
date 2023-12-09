import { useState, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { ThemeContext, themes } from "../../context/themeContext";
import Sidebar from "../Sidebar/Sidebar";
import Main from "../Main/Main";
import Spinner from "../common/Spinner/Spinner";
// import Footer from "../Footer/Footer";
import s from "./App.module.css";
import "react-toastify/dist/ReactToastify.css";
import Container from "../common/Container/Container";

const App = () => {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () =>
    setTheme((prevTheme) =>
      prevTheme === themes.light ? themes.dark : themes.light,
    );

  return (
    <Suspense fallback={<Spinner />}>
      <Container>
        <div className={s.container}>
          <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <Sidebar />
            <Main />
          </ThemeContext.Provider>
          <ToastContainer theme="light" />
          {/* <Footer /> */}
        </div>
      </Container>
    </Suspense>
  );
};

export default App;
