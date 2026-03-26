import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
// @ts-ignore
import App from "./App";
import Workpage from "./Workpage";
import ADCognitive from "./ADCognitive";
import AboutPage from "./AboutPage";
import ExperimentsPage from "./ExperimentsPage";
import EdenMonaro from "./EdenMonaro";
import { AdminProvider } from "./AdminContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/work" element={<Workpage />} />
          <Route path="/ad-cognitive" element={<ADCognitive />} />
          <Route path="/eden-monaro" element={<EdenMonaro />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/experiments" element={<ExperimentsPage />} />
        </Routes>
      </AdminProvider>
    </BrowserRouter>
  </React.StrictMode>
);
