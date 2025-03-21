import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { account } from '../config/appwrite';
import { generateLearningPath } from '../config/gemini';
import { createLearningPath, getLearningPaths } from '../config/database';
import { useNavigate } from 'react-router-dom';

const LearningPath = () => {
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [topicName, setTopicName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPaths();
  }, []);

  const fetchPaths = async () => {
    try {
      const user = await account.get();
      const response = await getLearningPaths(user.$id);
      setPaths(response.documents);
    } catch (error) {
      console.error('Error fetching paths:', error);
    }
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      const user = await account.get();
      const modules = await generateLearningPath(topicName);
      
      if (!Array.isArray(modules) || modules.length === 0) {
        throw new Error('Invalid response from AI');
      }

      await createLearningPath(user.$id, topicName, modules);
      setShowModal(false);
      fetchPaths();
      // Show success message
    } catch (error) {
      console.error('Error creating path:', error);
      setError(error.message || 'Failed to create learning path');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent">
            Learning Paths
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg"
          >
            Create New Path
          </motion.button>
        </div>

        <div className="space-y-4">
          {paths.map((path, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.01 }}
              onClick={() => navigate(`/learning-path/${path.$id}`)}
              className="bg-purple-50 p-6 rounded-lg cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-purple-700 mb-2">{path.topicName}</h2>
              <div className="w-full bg-purple-200 rounded-full h-2.5">
                <div 
                  className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${path.progress}%` }}
                />
              </div>
              <p className="text-gray-600 mt-2">{path.progress}% Complete</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 rounded-lg w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4">Create Learning Path</h2>
            <input
              type="text"
              placeholder="Enter topic name"
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCreate}
                disabled={loading}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg"
              >
                {loading ? 'Creating...' : 'Create'}
              </motion.button>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LearningPath;
