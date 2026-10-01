import Joi from "joi";
import { Roles } from "../constants/role.constants.js";
import { Planes } from "../constants/plan.constants.js";
import { estados } from "../constants/estado.constants.js";

const nameSchema = Joi.string().trim().min(3).max(30).label("nombre");
const usernameSchema = Joi.string().trim().alphanum().min(3).max(30);
const emailSchema = Joi.string().trim().lowercase().email();
const roleSchema = Joi.string().valid(...Roles);
const planSchema = Joi.string().valid(...Planes);
const estadoSchema = Joi.string().valid(...estados);
const passwordSchema = Joi.string().min(3).max(30);

//aca los hice opcionales porque se modifica al menos 1 campo, pueden ser mas. pero no requeridos.
export const updateUserBodySchema = Joi.object({
    name: nameSchema,
    username: usernameSchema,
    email: emailSchema,
    role: roleSchema.forbidden(),
    plan: planSchema.forbidden(),
    estado: estadoSchema,
    password: passwordSchema,
    confirmPassword: Joi.string().valid(Joi.ref("password")).messages({"any.only": "Las contraseñas ingresadas no son iguales, verifique"})
})
.and("password", "confirmPassword")
.min(1);

export const replaceUserBodySchema = updateUserBodySchema
    .fork(["name", "username", "email", "password", "confirmPassword"],
        (schema) => schema.required()
    )
    .fork(["role", "plan", "estado"],(schema) => schema.forbidden()
    );

export const updateMyUserBodySchema = updateUserBodySchema.fork(
    ["role", "plan", "estado"], (schema) => schema.forbidden()
);
