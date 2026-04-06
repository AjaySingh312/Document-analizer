
export const checkApiKey = (req,res,next)=>{
    const key = req.headers['x-api-key'];
    if(key !== process.env.X_API_KEY){
        return res.status(401).json({message:"invalid or wrong auth key"})
    }
    next()
}