import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { validateRequest } from "../../middleware/validate.middleware.js";
import { claseBodySchema, updateClaseBodySchema } from "../../schemas/clase-body.schema.js";
import {
    createClaseController,
    deleteClaseController,
    getAllClasesByUserController,
    getClaseByIdController,
    replaceClaseController,
    updateClaseController
} from "../controller/clase.controller.js";

const clasesRoutes = Router();

clasesRoutes.use(authMiddleware);

clasesRoutes.get("/", getAllClasesByUserController);
clasesRoutes.get("/:idClase", getClaseByIdController);
clasesRoutes.post("/", validateRequest(claseBodySchema, "body"), createClaseController);
clasesRoutes.delete("/:idClase", deleteClaseController);
clasesRoutes.patch(
    "/:idClase",
    validateRequest(updateClaseBodySchema, "body"),
    updateClaseController
);
clasesRoutes.put(
    "/:idClase",
    validateRequest(claseBodySchema, "body"),
    replaceClaseController
);

export default clasesRoutes;
