import React from "react";

const Dashboard = () => {
  return (
    <div className="flex-1">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent mb-4">
          Welcome Back!
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="bg-purple-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">Learning Progress</h2>
            <p className="text-gray-600">Continue where you left off</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">Recent Flashcards</h2>
            <p className="text-gray-600">Review your latest deck</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">Quiz Scores</h2>
            <p className="text-gray-600">Track your performance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
