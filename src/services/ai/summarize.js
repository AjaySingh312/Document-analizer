import { generateResponse } from "../../utills/aiResponse.js";

export const summarize = async (text) => {
    if (!text || text.trim().length === 0) {
        throw new Error("Cannot summarize: text is empty or undefined");
    }

    const contents = `Analyze the document and return ONLY a valid JSON object.

No explanation. No markdown. No extra text.

{
  "summary": "",
  "entities": {
    "names": [],
    "amounts": [],
    "dates": [],
    "organizations": []
  },
  "sentiment": ""
}

Rules:
- Summary: 3-4 concise lines covering who, what, when, and key details
- amounts: only important values like fees (ignore large salaries)
- dates: only key dates in format YYYY-MM-DD
- organizations: only main organization
- names: only person names if present
- sentiment: must be one of "Positive", "Negative", "Neutral"

Document:
${text}
`;

    try {
        const response = await generateResponse(contents);

        const rawText = typeof response === "string" ? response : response.text;

        const clean = rawText.replace(/```json|```/g, "").trim();

        let parsed;
        try {
            parsed = JSON.parse(clean);
        } catch {
            parsed = {
                summary: text.split("\n").slice(0, 3).join(" "),
                entities: { names: [], amounts: [], dates: [], organizations: [] },
                sentiment: "Neutral"
            };
        }

        return parsed;

    } catch (error) {
        console.error("Gemini API error:", error.message);

        return {
            summary: text.split("\n").slice(0, 3).join(" "),
            entities: { names: [], amounts: [], dates: [], organizations: [] },
            sentiment: "Neutral"
        };
    }
};
