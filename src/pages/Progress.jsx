import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getLearningPaths } from "../config/database";
import { useAuth } from "../context/AuthContext";

const Progress = () => {
  const { user, loading } = useAuth();
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    if (user) fetchPaths();
  }, [user]);

  const fetchPaths = async () => {
    try {
      const response = await getLearningPaths(user.$id);
      setPaths(response.documents);
    } catch (error) {
      console.error("Error fetching paths:", error);
    }
  };

  if (loading) return <p className="text-center text-purple-600">Loading...</p>;
  if (!user)
    return <p className="text-center text-gray-500">No user data available.</p>;

  // Transforming data for recharts
  const chartData = paths.map((path) => ({
    topic: path.topicName,
    progress: path.progress,
  }));

  return (
    <motion.div
      className="flex flex-col items-center p-6 bg-white min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent">
        Learning Progress
      </h1>

      {chartData.length > 0 ? (
        <motion.div
          className="w-full max-w-4xl bg-gray-100 p-4 rounded-xl shadow-md"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="topic" tick={{ fill: "#6B46C1" }} />
              <YAxis tick={{ fill: "#6B46C1" }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="progress"
                stroke="#6B46C1"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      ) : (
        <p className="text-gray-500">No progress data available.</p>
      )}
    </motion.div>
  );
};

export default Progress;
