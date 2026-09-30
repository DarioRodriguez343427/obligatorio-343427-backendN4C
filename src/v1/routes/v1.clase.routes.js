import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import {createClaseController, deleteClaseController, getAllClasesByUserController, getClaseByIdController, replaceClaseController, updateClaseController} from "../controller/clase.controller.js";
import { middlewareClaseValidateBody, middlewareListarClasesValidateQuery, middlewareUpdateClaseValidateBody } from "../../middleware/clase.middleware.js";
import { validateRolClienteMiddleware } from "../../middleware/rol.middleware.js";

const clasesRoutes = Router();

//solo clientes
clasesRoutes.use(authMiddleware, validateRolClienteMiddleware);

clasesRoutes.get("/", middlewareListarClasesValidateQuery, getAllClasesByUserController);
clasesRoutes.post("/", middlewareClaseValidateBody, createClaseController);
clasesRoutes.get("/:idClase", getClaseByIdController);
clasesRoutes.delete("/:idClase", deleteClaseController);
clasesRoutes.patch("/:idClase",middlewareUpdateClaseValidateBody ,updateClaseController);
clasesRoutes.put("/:idClase",middlewareClaseValidateBody ,replaceClaseController);

export default clasesRoutes;
