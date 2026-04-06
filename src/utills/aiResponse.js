import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
const model = process.env.GEMINI_MODEL

export const generateResponse = async (contents) => {

    try {
        return await ai.models.generateContent({model, contents})
    } catch (error) {
        console.log("Primary model failed, switching...")

        return await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents
        })
    }

}