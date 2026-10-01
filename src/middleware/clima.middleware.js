import { climaQuerySchema } from "../schemas/clima-query.schema.js";
import { validateRequest } from "./validate.middleware.js";

export const middlewareClimaValidateQuery =validateRequest(climaQuerySchema, "query");