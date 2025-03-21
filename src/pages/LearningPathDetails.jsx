import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import client from '../config/appwrite';
import { Databases } from 'appwrite';

const LearningPathDetails = () => {
  const { id } = useParams();
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

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="flex-1">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent">
            {path?.topicName}
          </h1>
          <div className="mt-2 flex items-center gap-2">
            <div className="w-full bg-purple-200 rounded-full h-2.5">
              <div 
                className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${path?.progress}%` }}
              />
            </div>
            <span className="text-sm text-gray-600">{path?.progress}%</span>
          </div>
        </div>

        <div className="space-y-4">
          {path?.modules.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-purple-50 p-6 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center text-purple-700 font-semibold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-purple-700">{module}</h3>
                  <button className="mt-3 px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Start Learning
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningPathDetails;
