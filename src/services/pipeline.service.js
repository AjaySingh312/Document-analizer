import { summarize } from "./ai/summarize.js";
import sentiment from "./ai/sentiment.js"
import extractRegex from "../utills/regexExtractor.js";


export const documentAnalyzer = async (text) => {
    try {
        const summary = await summarize(text)

        return {
            summary
        }
    } catch (error) {
        return {
            summary: text.split("\n").slice(0, 3).join(" "),
            entities: await extractRegex(text),
            sentiment: sentiment()
        };
    }
}
