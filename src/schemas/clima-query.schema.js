import Joi from "joi";
import { departamentos } from "../utils/departamentos.js";

export const climaQuerySchema = Joi.object({
    departamento: Joi.string().trim().lowercase().valid(...Object.keys(departamentos)).required(),
    fecha: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required().messages({"string.pattern.base": "La fecha debe tener formato YYYY-MM-DD"})
});