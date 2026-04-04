// import { GoogleGenAI } from "@google/genai";
// const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY
// })
import { generateResponse } from "../../utills/aiResponse.js";

export const sentiment = async (text) => {
    const contents = `Analyze the sentiment of this text. 
Reply in this exact format with no markdown:
  "Positive" | "Negative" | "Neutral"

Text:
${text}`
    try {
        const response = await generateResponse(contents)
        
        const sentiment = response.text.trim();
        return sentiment

    } catch (error) {
        console.log(error)
        throw new Error("failed to find sentiment")
    }
}

