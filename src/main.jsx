import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import LearningPath from "./pages/LearningPath";
import Quiz from "./pages/Quiz";
import Flashcards from "./pages/Flashcards";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import LearningPathDetails from "./pages/LearningPathDetails";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/learning-path" element={
            <ProtectedRoute>
              <LearningPath />
            </ProtectedRoute>
          } />
          <Route path="/learning-path/:id" element={
            <ProtectedRoute>
              <LearningPathDetails />
            </ProtectedRoute>
          } />
          <Route path="/quiz" element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          } />
          <Route path="/flashcards" element={
            <ProtectedRoute>
              <Flashcards />
            </ProtectedRoute>
          } />
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);
