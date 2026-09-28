import Joi from "joi";

export const disciplinaBodySchema = Joi.object({
    nombre: Joi.string().min(2).max(50).required(),
    descripcion: Joi.string().max(500).allow("")
});

export const updateDisciplinaBodySchema = Joi.object({
    nombre: Joi.string().min(2).max(50),
    descripcion: Joi.string().max(500).allow("")
}).min(1);
