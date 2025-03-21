import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const Dashboard = () => {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      {/* Sticked Navbar */}
      <Navbar isDashboard={true} />

      {/* Main Content */}
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold text-text">Dashboard</h1>
          <p className="text-gray-600">Track your progress and continue learning.</p>
        </div>
      </div>

      {/* Fixed Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
