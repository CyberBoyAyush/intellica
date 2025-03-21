import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { generateModuleContent } from '../config/gemini';
import { updateLearningPathProgress } from '../config/database';
import client from '../config/appwrite';
import { Databases } from 'appwrite';

const ModuleDetails = () => {
  const { pathId, moduleIndex } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const databases = new Databases(client);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const response = await databases.getDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_COLLECTION_ID,
          pathId
        );

        const modules = JSON.parse(response.modules);
        const moduleTitle = modules[parseInt(moduleIndex)];
        const moduleContent = await generateModuleContent(moduleTitle);
        
        setContent(moduleContent);
        setIsCompleted(response.completedModules?.includes(parseInt(moduleIndex)) || false);
      } catch (error) {
        setError('Failed to load module content');
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [pathId, moduleIndex]);

  const handleComplete = async () => {
    try {
      await updateLearningPathProgress(pathId, parseInt(moduleIndex) + 1);
      setIsCompleted(true);
      setTimeout(() => {
        navigate(`/learning-path/${pathId}`);
      }, 1500);
    } catch (error) {
      setError('Failed to update progress');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="flex-1">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent">
            {content?.title}
          </h1>
          <div className="mt-2 text-gray-600">
            Module {parseInt(moduleIndex) + 1}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-purple max-w-none"
        >
          <div className="space-y-6">
            {content?.sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <h2 className="text-xl font-semibold text-purple-700 mb-3">
                  {section.title}
                </h2>
                <p className="text-gray-600">
                  {section.content}
                </p>
                {section.keyPoints && (
                  <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                    {section.keyPoints.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex justify-end"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleComplete}
            disabled={isCompleted}
            className={`px-6 py-3 rounded-lg text-white ${
              isCompleted 
                ? 'bg-green-500'
                : 'bg-purple-600 hover:bg-purple-700'
            } transition-colors`}
          >
            {isCompleted ? 'Completed!' : 'Mark as Complete'}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default ModuleDetails;
