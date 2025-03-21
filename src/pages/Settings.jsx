import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Settings = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user data available.</p>;

  const userName = user?.name || "User";
  const userEmail = user?.email || "No email provided";
  const createdAt = user?.$createdAt
    ? new Date(user.$createdAt).toLocaleDateString()
    : "Unknown";

  return (
    <div className="max-w-lg mx-auto my-10 flex justify-center items-center bg-white p-6 rounded-2xl shadow-lg">
      <motion.div
        className="flex flex-col items-center space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Profile Icon */}
        <div className="w-24 h-24 bg-purple-500 text-white flex items-center justify-center text-3xl font-bold rounded-full">
          {userName[0]}
        </div>

        {/* User Info */}
        <h1 className="text-2xl font-semibold">{userName}</h1>
        <p className="text-gray-500">Member since: {createdAt}</p>
        <p className="text-gray-600">{userEmail}</p>
      </motion.div>
    </div>
  );
};

export default Settings;
