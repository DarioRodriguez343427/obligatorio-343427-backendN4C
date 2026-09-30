import { replaceUserBodySchema, updateUserBodySchema, updateMyUserBodySchema } from "../schemas/user-body.schema.js";
import { validateRequest } from "./validate.middleware.js";

export const middlewareUpdateUserValidateBody = validateRequest(updateUserBodySchema, "body");
export const middlewareReplaceUserValidateBody = validateRequest(replaceUserBodySchema, "body");
export const middlewareUpdateMyUserValidateBody = validateRequest(updateMyUserBodySchema, "body");