import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY, {
  apiUrl: 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent'
});

export const generateLearningPath = async (topic) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Create a learning path for ${topic}. 
    Provide exactly 5 modules that would help someone learn this topic from basics to advanced level. 
    Format your response as a clean array of strings, like this:
    ["Module 1: Introduction", "Module 2: Basics", "Module 3: Intermediate", "Module 4: Advanced", "Module 5: Projects"]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      // Clean the text before parsing
      const cleanText = text.replace(/```json\n|\n```/g, '').trim();
      return JSON.parse(cleanText);
    } catch (parseError) {
      console.error('Parse Error:', parseError);
      // Fallback: Convert text to array format
      return text.split('\n')
        .filter(line => line.trim() && !line.includes('```'))
        .map(line => line.replace(/^[-*\d.]\s*/, '').trim())
        .filter(line => line.length > 0)
        .slice(0, 5); // Ensure we only get 5 modules
    }
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to generate learning path. Please try again.');
  }
};
