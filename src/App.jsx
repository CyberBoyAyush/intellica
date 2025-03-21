import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import "./App.css"

const App = ({ children }) => {
  const location = useLocation();
  const showSidebar = location.pathname !== '/' && location.pathname !== '/home';

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Navbar isDashboard={showSidebar} />
      <div className="flex flex-1 pt-16">
        {showSidebar && <Sidebar />}
        <div className={`flex-1 flex flex-col ${showSidebar ? 'ml-64' : ''}`}>
          <div className="flex-1 p-6">
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
