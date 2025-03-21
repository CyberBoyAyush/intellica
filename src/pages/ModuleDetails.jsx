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
import { RiBookOpenLine, RiCheckLine, RiArrowRightLine, RiCodeLine } from 'react-icons/ri';

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

  const LoadingScreen = () => (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-slate-50 to-purple-50">
      <motion.div
        className="relative w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-purple-100" />
        <div className="absolute inset-0 rounded-full border-4 border-t-purple-600 border-r-transparent border-b-transparent border-l-transparent" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-gray-600"
      >
        Preparing your learning materials...
      </motion.p>
    </div>
  );

  if (loading) return <LoadingScreen />;
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-purple-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-center bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-red-100"
        >
          {error}
        </motion.div>
      </div>
    );
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        {/* Enhanced Header section */}
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-purple-100/30"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <RiBookOpenLine className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {content?.title}
              </h1>
              <p className="text-gray-600 mt-1">Module {parseInt(moduleIndex) + 1}</p>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Content section */}
        <motion.div className="prose prose-purple max-w-none space-y-6">
          {content?.sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-purple-100/30 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 flex items-center gap-3">
                <span>{section.title}</span>
              </h2>
              
              <div className="text-gray-600 space-y-4">
                <ReactMarkdown components={renderers}>
                  {section.content}
                </ReactMarkdown>
              </div>

              {section.codeExample && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 bg-gray-900 rounded-xl overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                    <div className="flex items-center gap-2">
                      <RiCodeLine className="text-gray-400" />
                      <span className="text-sm text-gray-400">
                        {section.codeExample.language}
                      </span>
                    </div>
                  </div>
                  <SyntaxHighlighter
                    language={section.codeExample.language}
                    style={vscDarkPlus}
                    className="!m-0"
                  >
                    {section.codeExample.code}
                  </SyntaxHighlighter>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Action buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky bottom-6 flex justify-between items-center bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-purple-100/30 shadow-xl"
        >
          {content?.hasMoreContent && !isExpanded && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => loadContent(true)}
              className="px-6 py-3 bg-purple-100 text-purple-600 rounded-xl hover:bg-purple-200 transition-colors flex items-center gap-2"
            >
              Read More
              <RiArrowRightLine />
            </motion.button>
          )}
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleComplete}
            disabled={isCompleted}
            className={`px-6 py-3 rounded-xl text-white flex items-center gap-2 ${
              isCompleted 
                ? 'bg-green-500'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg hover:shadow-purple-500/20'
            } transition-all`}
          >
            {isCompleted ? (
              <>
                <RiCheckLine />
                Completed!
              </>
            ) : (
              <>
                Mark as Complete
                <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ModuleDetails;
