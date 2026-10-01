import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { validateRolClienteMiddleware } from "../../middleware/rol.middleware.js";
import { middlewareGenerarDescripcionValidateBody } from "../../middleware/ia.middleware.js";
import { generarDescripcionController } from "../controller/ia.controller.js";

const iaRoutes = Router();

iaRoutes.use(authMiddleware, validateRolClienteMiddleware);

iaRoutes.post("/descripcion", middlewareGenerarDescripcionValidateBody, generarDescripcionController);

export default iaRoutes;