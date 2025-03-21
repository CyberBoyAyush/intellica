import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { generateModuleContent } from '../config/gemini';
import { updateLearningPathProgress } from '../config/database';
import client from '../config/appwrite';
import { Databases } from 'appwrite';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ModuleDetails = () => {
  const { pathId, moduleIndex } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const databases = new Databases(client);

  const loadContent = async (expanded = false) => {
    try {
      setLoading(true);
      const response = await databases.getDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_COLLECTION_ID,
        pathId
      );

      const modules = JSON.parse(response.modules);
      const moduleTitle = modules[parseInt(moduleIndex)];
      const moduleContent = await generateModuleContent(moduleTitle, expanded);
      
      setContent(moduleContent);
      setIsExpanded(expanded);
    } catch (error) {
      setError('Failed to load module content');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent(false);
  }, [pathId, moduleIndex]);

  const handleComplete = async () => {
    try {
      const response = await databases.getDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_COLLECTION_ID,
        pathId
      );
      
      // Calculate new progress by adding 20% (100/5 modules)
      const newProgress = Math.min((response.progress || 0) + 20, 100);
      
      await updateLearningPathProgress(pathId, newProgress);
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

  // Custom renderer for code blocks
  const renderers = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <div className="my-4">
          <SyntaxHighlighter
            style={vscDarkPlus}
            language={match[1]}
            PreTag="div"
            className="rounded-lg"
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className="bg-purple-50 px-2 py-1 rounded" {...props}>
          {children}
        </code>
      );
    }
  };

  return (
    <div className="flex-1">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        {/* Header section */}
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

        {/* Content section */}
        <motion.div className="prose prose-purple max-w-none">
          <div className="space-y-8">
            {content?.sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="bg-purple-50/50 p-6 rounded-lg"
              >
                <h2 className="text-xl font-semibold text-purple-700 mb-4">
                  {section.title}
                </h2>
                
                <div className="text-gray-600">
                  <ReactMarkdown components={renderers}>
                    {section.content}
                  </ReactMarkdown>
                </div>

                {section.codeExample && (
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-purple-600 mb-2">
                      Code Example:
                    </h3>
                    <SyntaxHighlighter
                      language={section.codeExample.language}
                      style={vscDarkPlus}
                      className="rounded-lg"
                    >
                      {section.codeExample.code}
                    </SyntaxHighlighter>
                    <p className="mt-2 text-gray-600">
                      {section.codeExample.explanation}
                    </p>
                  </div>
                )}

                {section.keyPoints && (
                  <ul className="mt-4 list-disc list-inside space-y-2 text-gray-600">
                    {section.keyPoints.map((point, i) => (
                      <li key={i} className="ml-4">{point}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div className="mt-8 flex justify-between items-center">
          {content?.hasMoreContent && !isExpanded && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => loadContent(true)}
              className="px-6 py-3 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200"
            >
              Read More
            </motion.button>
          )}
          
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
