import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import s from "./App.module.css";

const App = () => {
  return (
    <div className={s.container}>
      <Sidebar />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
