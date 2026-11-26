import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { DataProvider } from "./data/store.jsx";
import "./styles.css";
const tree = (
  <BrowserRouter>
    <DataProvider>
      <App />
    </DataProvider>
  </BrowserRouter>
);
const root = document.getElementById("root");
if (root.querySelector("main")) hydrateRoot(root, tree);
else createRoot(root).render(tree);
