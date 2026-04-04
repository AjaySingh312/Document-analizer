// import { GoogleGenAI } from "@google/genai";
// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY
// });

import { generateResponse } from "./aiResponse.js";

const extractEntitiesAI = async (text) => {

  const contents = `
Extract entities from the document below.

Return ONLY a valid JSON object. No explanation, no markdown.

{
  "names": [],
  "amounts": [],
  "dates": [],
  "organizations": []
}

Rules:
- amounts: only important values like fees (ignore large salaries)
- dates: only important and key dates, format YYYY-MM-DD
- organizations: only main organization
- names: only person names if present

Text:
${text}
`
  try {
    const response = await generateResponse(contents)

    let data = response.text.trim();

    data = data.replace(/```json|```/g, "").trim();


    const jsonStart = data.indexOf("{");
    const jsonEnd = data.lastIndexOf("}") + 1;
    data = data.slice(jsonStart, jsonEnd);

    return JSON.parse(data);

  } catch (error) {
    console.log("ENTITY AI ERROR:", error);

    return {
      names: [],
      amounts: [],
      dates: [],
      organizations: []
    };
  }
};

export default extractEntitiesAI;
