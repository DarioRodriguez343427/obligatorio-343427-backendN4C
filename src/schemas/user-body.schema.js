import Joi from "joi";
import { Roles } from "../constants/role.constants.js";
import { Planes } from "../constants/plan.constants.js";

const nameSchema = Joi.string().trim().min(3).max(30).label("nombre");
const usernameSchema = Joi.string().trim().alphanum().min(3).max(30);
const emailSchema = Joi.string().trim().lowercase().email();
const roleSchema = Joi.string().valid(...Roles);
const planSchema = Joi.string().valid(...Planes);
const passwordSchema = Joi.string().min(3).max(30);

//aca los hice opcionales porque se modifica al menos 1 campo, pueden ser mas. pero no requeridos.
export const updateUserBodySchema = Joi.object({
    name: nameSchema,
    username: usernameSchema,
    email: emailSchema,
    role: roleSchema,
    plan: planSchema,
    password: passwordSchema,
    confirmPassword: Joi.string().valid(Joi.ref("password"))
})
.and("password", "confirmPassword")
.min(1);

//aca si requiero cabiar todos porque se remplaza el objeto
export const replaceUserBodySchema = Joi.object({
    name: nameSchema.required(),
    username: usernameSchema.required(),
    email: emailSchema.required(),
    role: roleSchema.required(),
    plan: planSchema,
    password: passwordSchema.required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required()
});
