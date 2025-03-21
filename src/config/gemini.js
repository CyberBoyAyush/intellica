import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY, {
  apiUrl: 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent'
});

export const generateLearningPath = async (topic) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Create a structured learning path for: "${topic}"
    Format your response as an array of 5 modules, each with a clear title following this format:
    ["Module 1: Introduction to ${topic}", "Module 2: Fundamentals of ${topic}", "Module 3: Intermediate ${topic}", "Module 4: Advanced ${topic}", "Module 5: Practical Projects in ${topic}"]`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    try {
      const cleanText = text.replace(/```json\n|\n```|"/g, '').trim();
      const modules = JSON.parse(cleanText);
      return Array.isArray(modules) ? modules.slice(0, 5) : [];
    } catch (error) {
      return [
        `Module 1: Introduction to ${topic}`,
        `Module 2: Fundamentals of ${topic}`,
        `Module 3: Intermediate ${topic}`,
        `Module 4: Advanced ${topic}`,
        `Module 5: Practical Projects in ${topic}`
      ];
    }
  } catch (error) {
    throw new Error('Failed to generate learning path');
  }
};

export const generateModuleContent = async (moduleName) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Create detailed content for module: "${moduleName}".
    Structure as:
    {
      "title": "${moduleName}",
      "sections": [
        {
          "title": "section title",
          "content": "detailed explanation",
          "keyPoints": ["key point 1", "key point 2"]
        }
      ],
      "summary": "brief module summary"
    }`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    try {
      const cleanText = text.replace(/```json\n|\n```/g, '').trim();
      return JSON.parse(cleanText);
    } catch (error) {
      return {
        title: moduleName,
        sections: [{
          title: "Overview",
          content: text,
          keyPoints: ["Content generation failed", "Please try again"]
        }],
        summary: "Failed to format content properly"
      };
    }
  } catch (error) {
    throw new Error('Failed to generate module content');
  }
};
