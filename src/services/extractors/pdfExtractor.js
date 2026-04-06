import { createRequire } from "module";
const require = createRequire(import.meta.url);

const pdf = require("pdf-parse");

const extractPDF = async (buffer) => {
    try {
        const uint8Array = new Uint8Array(buffer);

        const data = await pdf(uint8Array)
        return data.text;
    } catch (error) {
        console.log("err", error)
        throw new Error("pdf extractor failed.")
    }
}

export default extractPDF;