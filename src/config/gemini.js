import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY, {
  apiUrl:
    "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent",
});

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const validateModuleContent = (content) => {
  if (!content?.title || !Array.isArray(content?.sections)) return false;
  if (content.sections.length === 0) return false;
  
  // Validate each section has required fields
  return content.sections.every(section => 
    section.title && 
    typeof section.content === 'string' && 
    section.content.length > 50
  );
};

const cleanCodeExample = (codeExample) => {
  if (!codeExample) return null;
  try {
    // Clean any markdown code blocks from the code
    const cleanCode = codeExample.code
      ?.replace(/```[\w]*\n?/g, '')  // Remove code block markers
      ?.replace(/```$/gm, '')        // Remove ending markers
      ?.replace(/^\/\/ /gm, '')      // Clean comments
      ?.trim();

    return {
      language: codeExample.language || 'javascript',
      code: cleanCode || '',
      explanation: codeExample.explanation || ''
    };
  } catch (error) {
    console.error('Code cleaning error:', error);
    return null;
  }
};

const sanitizeContent = (text) => {
  try {
    // Remove markdown code blocks and other problematic characters
    return text
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .replace(/`/g, '')
      .replace(/\\n/g, '\n')
      .replace(/\\\\/g, '\\')
      .trim();
  } catch (error) {
    console.error('Content sanitization error:', error);
    return text;
  }
};

const sanitizeJSON = (text) => {
  try {
    // Remove any special characters and escape sequences that could break JSON parsing
    return text
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Remove control characters
      .replace(/\\[^"\\\/bfnrtu]/g, '\\\\') // Fix invalid escapes
      .replace(/\\n/g, ' ') // Replace newlines with spaces
      .replace(/\r?\n|\r/g, ' ') // Remove line breaks
      .replace(/```(?:json)?|/g, '') // Remove markdown code block markers
      .trim();
  } catch (error) {
    console.error('JSON sanitization error:', error);
    return text;
  }
};

export const generateLearningPath = async (topic) => {
  if (!topic || typeof topic !== "string") {
    throw new Error("Invalid topic provided");
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate a comprehensive learning path for: "${topic}"
    Requirements:
    - Create exactly 5 progressive modules
    - Each module should build upon previous knowledge
    - Focus on practical, hands-on learning
    - Include both theoretical and practical aspects
    
    Return ONLY a JSON array with exactly 5 strings in this format:
    ["Module 1: [Clear Title]", "Module 2: [Clear Title]", "Module 3: [Clear Title]", "Module 4: [Clear Title]", "Module 5: [Clear Title]"]
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    try {
      const cleanText = sanitizeJSON(text);
      const modules = JSON.parse(cleanText);
      if (!Array.isArray(modules) || modules.length !== 5) {
        throw new Error("Invalid response format");
      }
      return modules;
    } catch (error) {
      console.error("Parsing error:", error);
      return [
        `Module 1: Introduction to ${topic}`,
        `Module 2: Core Concepts of ${topic}`,
        `Module 3: Intermediate ${topic} Techniques`,
        `Module 4: Advanced ${topic} Applications`,
        `Module 5: Real-world ${topic} Projects`,
      ];
    }
  } catch (error) {
    throw new Error(`Failed to generate learning path: ${error.message}`);
  }
};

export const generateModuleContent = async (moduleName, isExpanded = false) => {
  if (!moduleName || typeof moduleName !== "string") {
    throw new Error("Invalid module name provided");
  }

  let lastError = null;
  
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Create educational content for: "${moduleName}"
      Important: Ensure all code examples are properly formatted without markdown code blocks or comments.
      
      Return a JSON object with this EXACT structure:
      {
        "title": "Module Title",
        "sections": [
          {
            "title": "Section Title",
            "content": "Regular content here",
            "keyPoints": ["Point 1", "Point 2"],
            "codeExample": {
              "language": "javascript",
              "code": "const example = true;\\nconsole.log(example);",
              "explanation": "Code explanation"
            }
          }
        ],
        "summary": "Summary text",
        "hasMoreContent": true,
        "difficulty": "beginner",
        "estimatedTimeMinutes": 30
      }`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      
      // Clean and parse the response
      const cleanText = sanitizeJSON(text);
      
      try {
        const content = JSON.parse(cleanText);
        
        // Clean and validate sections
        content.sections = content.sections.map(section => ({
          ...section,
          codeExample: cleanCodeExample(section.codeExample)
        }));

        return content;
      } catch (parseError) {
        console.error('JSON parsing error:', parseError);
        throw new Error('Invalid content structure');
      }
    } catch (error) {
      lastError = error;
      console.error(`Attempt ${attempt} failed:`, error);
      await sleep(RETRY_DELAY);
    }
  }

  console.error("All attempts failed:", lastError);
  return {
    title: moduleName,
    sections: [
      {
        title: "Content Generation Error",
        content: "We're experiencing technical difficulties. Please try again later.",
        keyPoints: ["System is temporarily unavailable"],
        codeExample: null
      }
    ],
    summary: "Error generating content",
    hasMoreContent: false,
    difficulty: "beginner",
    estimatedTimeMinutes: 0
  };
};

export const generateFlashcards = async (topic, numCards = 5) => {
  if (!topic || typeof topic !== "string") {
    throw new Error("Invalid topic provided");
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate ${numCards} educational flashcards on "${topic}" with increasing difficulty.
    
    **Requirements:**
    - The **front side (question)** must be **short and clear**.
    - The **back side (answer)** must be **detailed (3-4 sentences) and informative**.
    - Ensure **difficulty increases from Flashcard 1 to ${numCards}**:
      - Start with **basic concepts**.
      - Progress to **intermediate details**.
      - End with **advanced questions requiring deeper understanding**.
    - Format the response **strictly** as a JSON array:

    [
      { "id": 1, "frontHTML": "Basic question?", "backHTML": "Detailed easy explanation." },
      { "id": 2, "frontHTML": "Intermediate question?", "backHTML": "Detailed intermediate explanation." },
      { "id": ${numCards}, "frontHTML": "Advanced question?", "backHTML": "Detailed advanced explanation." }
    ]`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    try {
      const cleanText = sanitizeJSON(text);
      const flashcards = JSON.parse(cleanText);

      if (!Array.isArray(flashcards) || flashcards.length !== numCards) {
        throw new Error("Invalid flashcard format");
      }

      return flashcards;
    } catch (error) {
      console.error("Flashcard parsing error:", error);
      return Array.from({ length: numCards }, (_, i) => ({
        id: i + 1,
        frontHTML: `Basic to advanced ${topic} question ${i + 1}?`,
        backHTML: `Detailed answer explaining ${topic} at difficulty level ${
          i + 1
        }.`,
      }));
    }
  } catch (error) {
    throw new Error(`Failed to generate flashcards: ${error.message}`);
  }
};

export const generateQuizData = async (topic, numQuestions = 5) => {
  if (!topic || typeof topic !== "string") {
    throw new Error("Invalid topic provided");
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `Generate a quiz on "${topic}" with ${numQuestions} questions.
    
    **Requirements:**
    - Each question should be **clear and well-structured**.
    - Include **single-choice and multiple-choice** questions randomly.
    - Provide **4 answer options** for each question.
    - Clearly indicate the **correct answer(s)**.
    - Give a **short explanation** for the correct answer.
    - Assign **points (default: 10 per question)**.
    - Format the response as a **JSON array**:

    [
      {
        "question": "Example question?",
        "questionType": "single",
        "answers": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": "Option A",
        "explanation": "Short explanation here.",
        "point": 10
      },
      {
        "question": "Another example?",
        "questionType": "multiple",
        "answers": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": ["Option B", "Option C"],
        "explanation": "Short explanation here.",
        "point": 10
      }
    ]`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    try {
      const cleanText = sanitizeJSON(text);
      const quizData = JSON.parse(cleanText);

      if (!Array.isArray(quizData) || quizData.length !== numQuestions) {
        throw new Error("Invalid quiz format");
      }

      return { nrOfQuestions: numQuestions.toString(), questions: quizData };
    } catch (error) {
      console.error("Quiz parsing error:", error);
      return { nrOfQuestions: "0", questions: [] };
    }
  } catch (error) {
    throw new Error(`Failed to generate quiz: ${error.message}`);
  }
};
