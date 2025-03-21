import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RiBookLine, RiCheckboxCircleFill, RiTimeLine, RiArrowRightLine } from 'react-icons/ri';
import client from '../config/appwrite';
import { Databases } from 'appwrite';

const LearningPathDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [path, setPath] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const databases = new Databases(client);

  useEffect(() => {
    fetchPathDetails();
  }, [id]);

  const fetchPathDetails = async () => {
    try {
      const response = await databases.getDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_COLLECTION_ID,
        id
      );

      setPath({
        ...response,
        modules: JSON.parse(response.modules)
      });
    } catch (error) {
      console.error('Error fetching path details:', error);
      setError('Failed to load learning path');
    } finally {
      setLoading(false);
    }
  };

  const handleModuleClick = (index) => {
    navigate(`/learning-path/${id}/module/${index}`);
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

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        {/* Header Card */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-purple-100/30"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <RiBookLine className="w-6 h-6 text-purple-600" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {path?.topicName}
              </h1>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Overall Progress</span>
                <span className="font-medium">{path?.progress}%</span>
              </div>
              <div className="w-full bg-purple-100 rounded-full h-3">
                <motion.div 
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${path?.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Modules Section */}
        <div className="space-y-6">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-semibold text-gray-900"
          >
            Learning Modules
          </motion.h2>

          <div className="space-y-4">
            {path?.modules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-purple-100/30 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-semibold ${
                    module.completed 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-purple-100 text-purple-600'
                  }`}>
                    {module.completed ? (
                      <RiCheckboxCircleFill className="w-6 h-6" />
                    ) : (
                      <RiTimeLine className="w-6 h-6" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">Module {index + 1}</h3>
                    <p className="text-gray-600 mt-1">{module}</p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleModuleClick(index)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-purple-500/20 transition-all flex items-center gap-2 group"
                  >
                    {module.completed ? 'Review' : 'Start'} 
                    <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>

                {module.completed && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 px-4 py-2 bg-green-50 border border-green-100 rounded-lg flex items-center gap-2"
                  >
                    <RiCheckboxCircleFill className="text-green-500" />
                    <span className="text-green-700 text-sm">
                      Completed on {new Date(module.completedAt).toLocaleDateString()}
                    </span>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LearningPathDetails;
