import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { RiUserLine, RiMailLine, RiSaveLine, RiEditLine } from "react-icons/ri";
import { account } from "../config/appwrite";
import QuizStreak from "./Streak";
import { getUserProgress } from "../config/database";

const Settings = () => {
  const { user, loading, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [quizScores, setQuizScores] = useState([]);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [updateStatus, setUpdateStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    if (user) {
      fetchUserProgress();
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateStatus({ type: "loading", message: "Updating profile..." });

    try {
      if (formData.name !== user.name) {
        await account.updateName(formData.name);
        // Get updated user data
        const updatedUser = await account.get();
        updateUser(updatedUser);
        setIsEditing(false);

        setUpdateStatus({
          type: "success",
          message: "Profile updated successfully!",
        });
      }

      setTimeout(() => setUpdateStatus({ type: "", message: "" }), 3000);
    } catch (error) {
      console.error("Update error:", error);
      setUpdateStatus({
        type: "error",
        message: error.message || "Failed to update profile",
      });
    }
  };

  const fetchUserProgress = async () => {
    try {
      const progress = await getUserProgress(user.$id);

      // Ensure quizScores is safely parsed
      let parsedQuizScores = [];
      if (progress.quizScores) {
        try {
          parsedQuizScores = Array.isArray(progress.quizScores)
            ? progress.quizScores // If already an array, use it
            : JSON.parse(progress.quizScores); // Otherwise, parse it
        } catch (error) {
          console.error("Error parsing quizScores JSON:", error);
        }
      }

      setQuizScores(parsedQuizScores);
    } catch (error) {
      console.error("Error fetching user progress:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        {/* Profile Card */}
        <motion.div className="bg-white/70 backdrop-blur-sm rounded-2xl p-2 md:p-8 shadow-xl border border-purple-100/30">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Profile Settings
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 flex items-center gap-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <RiEditLine />
              {isEditing ? "Cancel" : "Edit Profile"}
            </motion.button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center text-3xl font-bold rounded-2xl">
                {formData.name[0]}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Member since</p>
                <p className="text-gray-700">
                  {new Date(user?.$createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <RiUserLine />
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 rounded-xl border ${
                    isEditing
                      ? "border-purple-200"
                      : "border-transparent bg-gray-50"
                  } focus:border-purple-300 focus:ring-2 focus:ring-purple-200 outline-none transition-all`}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <RiMailLine />
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-transparent text-gray-500"
                />
              </div>
            </div>

            {/* Status Message */}
            <AnimatePresence>
              {updateStatus.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-4 rounded-xl ${
                    updateStatus.type === "error"
                      ? "bg-red-50 text-red-600"
                      : updateStatus.type === "success"
                      ? "bg-green-50 text-green-600"
                      : "bg-purple-50 text-purple-600"
                  }`}
                >
                  {updateStatus.message}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Save Button */}
            <AnimatePresence>
              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-purple-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <RiSaveLine />
                    Save Changes
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </motion.div>
      <QuizStreak quizScores={quizScores} />
    </div>
  );
};

export default Settings;
