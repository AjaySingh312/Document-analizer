import Tesseract from "tesseract.js";

const extractOCR = async(buffer)=>{
    try {
        const {data:{text}} = await Tesseract.recognize(buffer,"eng+hin")
        return text;
    } catch (error) {
        throw new Error("OCR extraction failed");
    }
}

export default extractOCR;