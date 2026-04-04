import { summarize } from "./ai/summarize.js";
import { sentiment } from "./ai/sentiment.js";
import extractRegex from "../utills/regexExtractor.js";


export const documentAnalyzer = async (text) => {
    try {
        const summary = await summarize(text)

        const  entities = await extractRegex(text)

        const senti = await sentiment(text)

        return {
            summary,
            entities,
            senti
        }
    } catch (error) {
        console.log(error)
        throw new Error("analyzer failed")
    }
}