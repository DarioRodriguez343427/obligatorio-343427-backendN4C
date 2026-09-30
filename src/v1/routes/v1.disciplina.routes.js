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


disciplinasRoutes.use(validateRolAdminMiddleware);
// solo admin
disciplinasRoutes.delete("/:idDisciplina", deleteDisciplinaController);
disciplinasRoutes.post("/", middlewareDisciplinaValidateBody, createDisciplinaController);
disciplinasRoutes.patch("/:idDisciplina", middlewareUpdateDisciplinaValidateBody, updateDisciplinaController);
disciplinasRoutes.put("/:idDisciplina", middlewareDisciplinaValidateBody ,replaceDisciplinaController);

export default disciplinasRoutes;
