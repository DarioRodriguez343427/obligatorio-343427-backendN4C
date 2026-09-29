import { disciplinaBodySchema, updateDisciplinaBodySchema } from "../schemas/disciplina-body.schema.js";
import { validateRequest } from "./validate.middleware.js";

export const middlewareDisciplinaValidateBody = validateRequest(disciplinaBodySchema, "body");
export const middlewareUpdateDisciplinaValidateBody = validateRequest(updateDisciplinaBodySchema, "body");

