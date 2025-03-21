import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import LearningPath from "./pages/LearningPath";
import Quiz from "./pages/Quiz";
import Flashcards from "./pages/Flashcards";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learning-path" element={<LearningPath />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/flashcards" element={<Flashcards />} />
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);
