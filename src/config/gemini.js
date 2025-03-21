import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY, {
  apiUrl:
    "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent",
});

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
      const cleanText = text.replace(/```json\n|\n```|`/g, "").trim();
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

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Create highly detailed ${
      isExpanded ? "comprehensive" : "concise"
    } educational content for: "${moduleName}"
    
    Requirements:
    - Content must be practical and actionable
    - Include real-world examples and use cases
    - Provide clear explanations with progressive complexity
    - If applicable, include working code examples
    - Use proper markdown formatting for better readability
    
    Return as JSON with this EXACT structure:
    {
      "title": "${moduleName}",
      "sections": [
        {
          "title": "Clear section title",
          "content": "Detailed markdown-formatted content with practical examples",
          "keyPoints": ["Specific, actionable point 1", "Specific, actionable point 2"],
          "codeExample": {
            "language": "specific programming language",
            "code": "working, practical code example",
            "explanation": "Line-by-line explanation"
          }
        }
      ],
      "summary": "Actionable key takeaways",
      "hasMoreContent": boolean,
      "difficulty": "beginner|intermediate|advanced",
      "estimatedTimeMinutes": number
    }`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    try {
      const cleanText = text.replace(/```json\n|\n```|`/g, "").trim();
      const content = JSON.parse(cleanText);
      if (!content.title || !Array.isArray(content.sections)) {
        throw new Error("Invalid content structure");
      }
      return content;
    } catch (error) {
      console.error("Content parsing error:", error);
      return {
        title: moduleName,
        sections: [
          {
            title: "Module Overview",
            content: "Content is being generated. Please try again.",
            keyPoints: ["Key concepts will be listed here"],
            codeExample: null,
          },
        ],
        summary: "Module content overview",
        hasMoreContent: false,
        difficulty: "beginner",
        estimatedTimeMinutes: 30,
      };
    }
  } catch (error) {
    throw new Error(`Failed to generate module content: ${error.message}`);
  }
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
      const cleanText = text.replace(/```json\n|\n```|`/g, "").trim();
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
      const cleanText = text.replace(/```json\n|\n```|`/g, "").trim();
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
