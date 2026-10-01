import Joi from "joi";

export const generarDescripcionBodySchema = Joi.object({
    nombre: Joi.string().trim().min(3).max(80).required(),
    detalles: Joi.string().trim().min(3).max(500).required()
});