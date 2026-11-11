import { Router } from "express";
import {
    uploadImageBase64,
} from "../controller/image.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const imageRoutes = Router();

imageRoutes.post("/", authMiddleware, uploadImageBase64);

export default imageRoutes;
