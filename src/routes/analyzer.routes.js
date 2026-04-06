import { Router } from "express";
import fileAnalyzer from "../controllers/analyzer.controllers.js";
import { checkApiKey } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/document-analyze",checkApiKey,fileAnalyzer)

export default router