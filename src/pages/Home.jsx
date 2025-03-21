import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const features = [
    {
      icon: "🎯",
      title: "Smart Learning Paths",
      description: "AI-curated paths that adapt to your pace"
    },
    {
      icon: "🧠",
      title: "Interactive Learning",
      description: "Engaging quizzes and flashcards"
    },
    {
      icon: "📊",
      title: "Progress Tracking",
      description: "Detailed analytics and insights"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 relative w-full overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
      <div className="fixed top-20 -right-20 md:right-0 w-96 h-96 bg-purple-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="fixed top-40 -left-20 md:left-0 w-96 h-96 bg-indigo-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="fixed bottom-40 left-1/2 w-96 h-96 bg-pink-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10"
      >
        {/* Hero Section */}
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Badge */}
            <motion.div variants={item} className="flex justify-center mb-8">
              <div className="inline-flex p-1 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
                <motion.span 
                  className="bg-gradient-to-r from-purple-600/10 to-purple-600/5 px-4 py-2 rounded-xl text-purple-600 font-medium text-sm flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.span 
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    🚀
                  </motion.span>
                  AI-Powered Learning Platform
                </motion.span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              variants={item}
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-center bg-gradient-to-r from-gray-900 via-purple-800 to-purple-600 bg-clip-text text-transparent mb-8 max-w-5xl mx-auto leading-tight"
            >
              Transform Your Learning Journey with{' '}
              <span className="inline-block bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text">
                Artificial Intelligence
              </span>
            </motion.h1>

            {/* Sub Heading */}
            <motion.p 
              variants={item}
              className="text-lg sm:text-xl md:text-2xl text-gray-600 text-center max-w-3xl mx-auto mb-12"
            >
              Experience personalized learning paths, interactive quizzes, and AI-generated content
              tailored to your unique learning style.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-20">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(147 51 234 / 0.1)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/dashboard")}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 group font-medium text-lg"
              >
                Start Learning Now
                <motion.svg 
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 border-2 border-purple-200 text-purple-700 rounded-xl hover:bg-purple-50 transition-all flex items-center justify-center gap-2 font-medium text-lg group"
              >
                Watch Demo
                <motion.svg 
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </motion.svg>
              </motion.button>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              variants={item}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-purple-100"
                >
                  <motion.div 
                    className="text-4xl mb-4"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats Section */}
            <motion.div
              variants={item}
              className="mt-20 pt-8 border-t border-purple-100/50 grid grid-cols-2 sm:grid-cols-3 gap-8 max-w-4xl mx-auto px-4"
            >
              {[
                { number: "10K+", label: "Active Users", color: "from-purple-600 to-purple-400" },
                { number: "50+", label: "Course Topics", color: "from-indigo-600 to-indigo-400" },
                { number: "95%", label: "Success Rate", color: "from-pink-600 to-pink-400" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-purple-100/50 shadow-lg"
                >
                  <motion.div 
                    className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
