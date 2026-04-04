// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY
// });

// if (!process.env.GEMINI_API_KEY) {
//     throw new Error("GEMINI_API_KEY is missing from environment variables");
// }

import { generateResponse } from "../../utills/aiResponse.js";

export const summarize = async (text) => {
    if (!text || text.trim().length === 0) {
        throw new Error("Cannot summarize: text is empty or undefined");
    }
    const contents = `Summarize the following document in 3-4 concise lines.
Focus on key information like who, what, when, and amount if present.

Text:
${text}`

    try {
        const response = await generateResponse(contents)
        return response.text;
    } catch (error) {
        console.error("Gemini API error:", error.message);
        throw new Error("failed to summarize");
    }
};