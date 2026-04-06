import mammoth from "mammoth";

const extractDOCX = async(buffer)=>{
    try {
        const data = await mammoth.extractRawText({buffer})
        return data.value
    } catch (error) {
        console.log(error)
        throw new Error("DOCX extractor failed")
    }
}

export default extractDOCX;