import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  RiRocketLine, 
  RiBrainLine, 
  RiBarChartBoxLine,
  RiArrowRightLine,
  RiPlayCircleLine,
  RiCheckboxCircleLine,
  RiQuestionLine
} from "react-icons/ri";

const Home = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -100]);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const badgeAnimation = {
    animate: {
      background: ["hsla(265,89%,78%,0.1)", "hsla(265,89%,78%,0.2)", "hsla(265,89%,78%,0.1)"],
      scale: [1, 1.02, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const features = [
    {
      icon: <RiRocketLine className="text-5xl text-purple-600" />,
      title: "AI-Powered Learning",
      description: "Experience personalized learning paths crafted by advanced AI algorithms",
      gradient: "from-purple-500/20 to-indigo-500/20"
    },
    {
      icon: <RiBrainLine className="text-5xl text-purple-600" />,
      title: "Smart Integration",
      description: "Seamlessly connect with modern learning tools and platforms",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      icon: <RiBarChartBoxLine className="text-5xl text-purple-600" />,
      title: "Progress Tracking",
      description: "Monitor your growth with detailed analytics and insights",
      gradient: "from-indigo-500/20 to-purple-500/20"
    }
  ];

  const testimonials = [
    {
      text: "Transformed how I approach learning completely!",
      author: "Sarah J.",
      role: "Student"
    },
    // ...add more testimonials
  ];

  const faqItems = [
    {
      question: "How does AI enhance my learning?",
      answer: "Our AI analyzes your learning style, pace, and performance to create personalized study paths and recommendations, ensuring optimal learning outcomes."
    },
    {
      question: "Is this platform suitable for beginners?",
      answer: "Absolutely! Our AI adapts to all skill levels, providing appropriate content and pacing whether you're a beginner or advanced learner."
    },
    {
      question: "What types of content are available?",
      answer: "We offer interactive quizzes, video lessons, practice exercises, flashcards, and real-world projects across various topics and disciplines."
    },
    {
      question: "How do you track progress?",
      answer: "Our platform provides detailed analytics, progress tracking, performance metrics, and personalized feedback to help you monitor your learning journey."
    },
    {
      question: "Can I learn at my own pace?",
      answer: "Yes! The platform is designed for self-paced learning, allowing you to study when and where it's convenient for you."
    },
    {
      question: "What makes your AI different?",
      answer: "Our AI uses advanced algorithms to understand your learning patterns, struggles, and strengths, creating truly personalized learning experiences."
    }
  ];

  const BadgeComponent = () => (
    <motion.div variants={item} className="inline-block relative">
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/30 to-indigo-400/30 blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />
      <motion.span
        variants={badgeAnimation}
        animate="animate"
        className="relative inline-flex items-center px-6 py-2.5 bg-white/90 backdrop-blur border border-purple-100 rounded-full text-sm font-medium text-purple-600 shadow-lg hover:shadow-purple-500/20 transition-all group"
      >
        <motion.span
          animate={{ 
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mr-2 group-hover:scale-110 transition-transform"
        >
          ✨
        </motion.span>
        <span className="relative bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          AI-Powered Learning Platform
        </span>
      </motion.span>
    </motion.div>
  );

  const FaqSection = () => (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="mt-32"
    >
      <motion.h2 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
      >
        Frequently Asked Questions
      </motion.h2>
      <div className="max-w-3xl mx-auto space-y-4">
        <AnimatePresence>
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <motion.div
                className={`p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-100/30 shadow-sm hover:shadow-md transition-all cursor-pointer
                  ${expandedFaq === index ? 'bg-purple-50/50' : ''}`}
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <motion.span
                      animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                      className="text-purple-600 text-xl"
                    >
                      {expandedFaq === index ? '−' : '+'}
                    </motion.span>
                    <h3 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                      {item.question}
                    </h3>
                  </div>
                </div>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-gray-600 pl-7">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );

  const stats = [
    { 
      number: "10K+", 
      label: "Active Users",
      icon: "👥",
      gradient: "from-purple-500/20 to-indigo-500/20"
    },
    { 
      number: "50+", 
      label: "Learning Topics",
      icon: "📚",
      gradient: "from-indigo-500/20 to-purple-500/20"
    },
    { 
      number: "95%", 
      label: "Success Rate",
      icon: "🎯",
      gradient: "from-purple-500/20 to-pink-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-purple-50/30 overflow-hidden">
      {/* Enhanced animated background */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-300/30 to-indigo-300/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"
        />
      </div>

      <motion.div 
        style={{ y }}
        className="max-w-7xl mx-auto px-4 py-24 relative"
      >
        {/* Enhanced Hero Section */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center space-y-12 relative"
        >
          <BadgeComponent />

          <motion.h1 
            variants={item}
            className="text-6xl md:text-8xl font-bold tracking-tight leading-tight"
          >
            <span className="relative">
              <span className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 blur-2xl" />
              <span className="relative bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Transform Your Learning
              </span>
            </span>
            <span className="block mt-4 text-4xl md:text-5xl text-gray-800">
              With AI-Powered Education
            </span>
          </motion.h1>

          <motion.p variants={item} className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience personalized learning paths and interactive content tailored to your style.
          </motion.p>

          {/* Enhanced CTA Section */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(124, 58, 237, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/dashboard")}
              className="group px-10 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-medium shadow-xl flex items-center gap-3 text-lg transition-all duration-300"
            >
              Start Learning
              <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(124, 58, 237, 0.1)" }}
              className="px-10 py-5 bg-white/80 backdrop-blur border border-purple-100 text-purple-600 rounded-2xl font-medium flex items-center gap-3 text-lg shadow-lg"
            >
              <RiPlayCircleLine className="text-2xl" />
              Watch Demo
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center gap-8 grayscale opacity-50"
        >
          {/* Add tech partner logos here */}
        </motion.div>

        {/* Enhanced Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={floatingAnimation}
              initial="initial"
              animate="animate"
              whileHover={{ 
                y: -15,
                transition: { duration: 0.3 }
              }}
              className={`group p-8 bg-white/70 backdrop-blur-sm rounded-3xl border border-purple-100/30 
                shadow-lg hover:shadow-2xl transition-all duration-300 
                bg-gradient-to-br ${feature.gradient}`}
            >
              <div className="bg-white/80 rounded-2xl p-4 w-fit group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold mt-6 text-gray-900">{feature.title}</h3>
              <p className="mt-4 text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <FaqSection />

        {/* Enhanced Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(124, 58, 237, 0.15)",
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: index * 0.1 
                }}
                className={`p-8 bg-white/70 backdrop-blur-sm rounded-3xl border border-purple-100/30
                  bg-gradient-to-br ${stat.gradient} relative overflow-hidden group`}
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="text-4xl mb-4"
                >
                  {stat.icon}
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.3 }}
                  className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
                >
                  {stat.number}
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.4 }}
                  className="text-gray-600 mt-2 text-lg font-medium"
                >
                  {stat.label}
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
