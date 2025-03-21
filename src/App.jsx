import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./App.css"

const App = ({ children }) => {
  const location = useLocation();
  const showSidebar = location.pathname !== '/' && location.pathname !== '/home';

  return (
    <div className="bg-background min-h-screen flex">
      {showSidebar && <Sidebar />}
      <div className={`${showSidebar ? 'flex-1' : 'w-full'}`}>
        <Navbar isDashboard={showSidebar} />
        <div className="p-6 mt-20">{children}</div>
      </div>
    </div>
  );
};

export default App;
