import { replaceUserBodySchema, updateUserBodySchema, validatePlanPlusBodySchema } from "../schemas/user-body.schema.js";
import { validateRequest } from "./validate.middleware.js";

export const middlewareUpdateUserValidateBody = validateRequest(updateUserBodySchema, "body");
export const middlewareReplaceUserValidateBody = validateRequest(replaceUserBodySchema, "body");
export const validatePlanClienteMiddleware = validateRequest(validatePlanPlusBodySchema, "body");