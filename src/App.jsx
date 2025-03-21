import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import "./App.css"

const App = ({ children }) => {
  const location = useLocation();
  const showSidebar = !['/login', '/signup', '/', '/home'].includes(location.pathname);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Navbar 
        isDashboard={showSidebar} 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex flex-1 pt-16">
        {showSidebar && (
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        )}
        <div className={`flex-1 flex flex-col ${showSidebar && isSidebarOpen ? 'ml-64' : ''}`}>
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
