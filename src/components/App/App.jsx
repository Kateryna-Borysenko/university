import { useState, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { ThemeContext, themes } from "../../context/themeContext";
import Sidebar from "../Sidebar/Sidebar";
import Main from "../Main/Main";
import Loader from "../common/Loader/Loader";
// import Footer from '../Footer/Footer';
import s from "./App.module.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () =>
    setTheme((prevTheme) =>
      prevTheme === themes.light ? themes.dark : themes.light,
    );

  return (
    <Suspense fallback={<Loader />}>
      <div className={s.container}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <Sidebar />
          <Main />
        </ThemeContext.Provider>
        <ToastContainer theme="light" />
        {/* <Footer /> */}
      </div>
    </Suspense>
  );
};

export default App;
