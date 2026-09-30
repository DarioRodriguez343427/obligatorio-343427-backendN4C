import { claseBodySchema, updateClaseBodySchema } from "../schemas/clase-body.schema.js";
import { listarClasesQuerySchema } from "../schemas/clases-query.schema.js";
import { validateRequest } from "./validate.middleware.js";

export const middlewareListarClasesValidateQuery = validateRequest(listarClasesQuerySchema, "query");
export const middlewareClaseValidateBody = validateRequest(claseBodySchema, "body");
export const middlewareUpdateClaseValidateBody = validateRequest(updateClaseBodySchema, "body");