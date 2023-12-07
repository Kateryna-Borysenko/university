import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import "./index.css";
import App from "./components/App/App.jsx";
import "./styles/global.module.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <Provider store={store}>
        <App />
      </Provider>
      {/* </PersistGate> */}
    </BrowserRouter>
  </React.StrictMode>,
);
