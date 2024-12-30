import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import {configureStore} from "@reduxjs/toolkit"
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import 'react-datepicker/dist/react-datepicker.css'


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <BrowserRouter>

    <Provider store={store}>
        <App />
        <Toaster/>
    </Provider>
    </BrowserRouter>


  </>
);
