import "./config/env.js"
import express from "express";
import analyzeRouter from "./routes/analyzer.routes.js";


const app = express()

const PORT = process.env.PORT||3000

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/",(req,res)=>{
    res.send("api is running")
})

app.use("/api",analyzeRouter)

app.use((req,res)=>{
    res.status(404).json({
        status: "error",
        message:"route not found"
    })
})

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({
        status:"error",
        message:"internal server error"
    })
})

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})

