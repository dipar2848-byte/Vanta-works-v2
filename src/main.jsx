import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import { router } from "./routes";

import ScrollProvider from "./components/motion/ScrollProvider";
import SmoothScroll from "./components/motion/SmoothScroll";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <ScrollProvider>
        <SmoothScroll>
          <RouterProvider router={router} />
        </SmoothScroll>
      </ScrollProvider>
    </HelmetProvider>
  </React.StrictMode>
);