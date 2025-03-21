import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./App.css"

const App = ({ children }) => {
  const location = useLocation();
  const showSidebar = location.pathname !== '/' && location.pathname !== '/home';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar isDashboard={showSidebar} />
      <div className="flex pt-16">
        {showSidebar && <Sidebar />}
        <div className={`flex-1 p-6 ${showSidebar ? 'ml-64' : ''}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default App;
