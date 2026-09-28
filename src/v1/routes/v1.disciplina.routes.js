import { Router } from "express";
import { adminMiddleware, authMiddleware } from "../../middleware/auth.middleware.js";
import { validateRequest } from "../../middleware/validate.middleware.js";
import { createDisciplinaController, deleteDisciplinaController, getAllDisciplinasController, getDisciplinaByIdController, replaceDisciplinaController, updateDisciplinaController} from "../controller/disciplina.controller.js";
import { disciplinaBodySchema, updateDisciplinaBodySchema } from "../../schemas/disciplina-body.schema.js";

const disciplinasRoutes = Router();

disciplinasRoutes.use(authMiddleware, adminMiddleware);

disciplinasRoutes.get("/", getAllDisciplinasController);
disciplinasRoutes.get("/:idDisciplina", getDisciplinaByIdController);
disciplinasRoutes.delete("/:idDisciplina", adminMiddleware, deleteDisciplinaController);

disciplinasRoutes.post("/",adminMiddleware,validateRequest(disciplinaBodySchema, "body"),createDisciplinaController);
disciplinasRoutes.patch("/:idDisciplina",adminMiddleware,validateRequest(updateDisciplinaBodySchema, "body"),updateDisciplinaController);
disciplinasRoutes.put("/:idDisciplina",adminMiddleware,validateRequest(disciplinaBodySchema, "body"),replaceDisciplinaController);

export default disciplinasRoutes;
