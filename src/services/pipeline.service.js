import { summarize } from "./ai/summarize.js";
import sentiment from "./ai/sentiment.js"
import extractRegex from "../utills/regexExtractor.js";


export const documentAnalyzer = async (text) => {
    try {
        const result = await summarize(text)

        return {
           summary: result.summary,
           entities: result.entities,
           sentiment: result.sentiment
        }
    } catch (error) {
        return {
            summary: text.split("\n").slice(0, 3).join(" "),
            entities: await extractRegex(text),
            sentiment: sentiment()
        };
    }
}
