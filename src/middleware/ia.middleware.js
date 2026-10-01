import { generarDescripcionBodySchema } from "../schemas/ia-body.schema.js";
import { validateRequest } from "./validate.middleware.js";

export const middlewareGenerarDescripcionValidateBody = validateRequest(generarDescripcionBodySchema, "body");