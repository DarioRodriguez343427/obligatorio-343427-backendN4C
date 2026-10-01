import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { validateRolClienteMiddleware } from "../../middleware/rol.middleware.js";
import { middlewareClimaValidateQuery } from "../../middleware/clima.middleware.js";
import { obtenerClimaController } from "../controller/clima.controller.js";

const climaRoutes = Router();

climaRoutes.use(authMiddleware, validateRolClienteMiddleware);

climaRoutes.get("/",middlewareClimaValidateQuery,obtenerClimaController);

export default climaRoutes;