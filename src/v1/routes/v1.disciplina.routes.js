import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { createDisciplinaController, deleteDisciplinaController, getAllDisciplinasController, getDisciplinaByIdController, replaceDisciplinaController, updateDisciplinaController} from "../controller/disciplina.controller.js";
import { middlewareDisciplinaValidateBody, middlewareUpdateDisciplinaValidateBody } from "../../middleware/disciplina.middleware.js";
import { validateRolAdminMiddleware } from "../../middleware/rol.middleware.js";

const disciplinasRoutes = Router();

disciplinasRoutes.use(authMiddleware);

//clientes y admin
disciplinasRoutes.get("/", getAllDisciplinasController);
disciplinasRoutes.get("/:idDisciplina", getDisciplinaByIdController);

// solo admin
disciplinasRoutes.delete("/:idDisciplina", validateRolAdminMiddleware, deleteDisciplinaController);
disciplinasRoutes.post("/",validateRolAdminMiddleware, middlewareDisciplinaValidateBody, createDisciplinaController);
disciplinasRoutes.patch("/:idDisciplina",validateRolAdminMiddleware, middlewareUpdateDisciplinaValidateBody, updateDisciplinaController);
disciplinasRoutes.put("/:idDisciplina",validateRolAdminMiddleware, middlewareDisciplinaValidateBody ,replaceDisciplinaController);

export default disciplinasRoutes;
