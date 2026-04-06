import extractDOCX from "../services/extractors/docxExtractor.js";
import extractOCR from "../services/extractors/ocrExtractor.js";
import extractPDF from "../services/extractors/pdfExtractor.js";
import { documentAnalyzer } from "../services/pipeline.service.js";

export const fileAnalyzer = async (req, res) => {
    try {
        const { fileName, fileType, fileBase64 } = req.body;
        if(!fileName || !fileType || !fileBase64){
            return res.status(400).json({status:"error", message:"missing required fields"})
        }

        const base64Data = fileBase64.replace(/^data:.*;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");

        let text;

        if (fileType === "pdf") {
            text = await extractPDF(buffer)
        } else if (fileType === "docx") {
            text = await extractDOCX(buffer)
        } else if (fileType === "image") {
            text = await extractOCR(buffer)
        } else {
            return res.status(400).json({ status: "error", message: "invalid file type" })
        }
        if(!text || text.trim().length === 0){
            return res.status(400).json({status:"error", message:"No text extracted from document"})
        }

        const result = await documentAnalyzer(text)

        return res.json(
            {
                status: "success",
                fileName,
                summary:result.summary,
                entities: result.entities,
                sentiment: result.sentiment
            }
        )
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}

export default fileAnalyzer;