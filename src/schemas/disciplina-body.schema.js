import Joi from "joi";

export const disciplinaBodySchema = Joi.object({
    nombre: Joi.string().trim().min(2).max(50).required(),
    descripcion: Joi.string().trim().max(500).required()
});

export const updateDisciplinaBodySchema = Joi.object({
    nombre: Joi.string().trim().min(2).max(50),
    descripcion: Joi.string().max(500).allow("")
}).min(1);
