import "./index.css";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation";
import Home from "./routes/home";
import Sort from "./routes/sort";
import Path from "./routes/path";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <HashRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="sort" element={<Sort />} />
        <Route path="path" element={<Path />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
