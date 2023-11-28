import React from "react";
import { ToastContainer } from "react-toastify";
import Sidebar from "../Sidebar/Sidebar";
import Main from "../Main/Main";
// import Footer from '../Footer/Footer';
import s from "./App.module.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className={s.container}>
      <Sidebar />
      <Main />
      <ToastContainer theme="colored" />
      {/* <Footer /> */}
    </div>
  );
};

export default App;
