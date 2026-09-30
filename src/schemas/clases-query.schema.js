import Joi from "joi";

export const listarClasesQuerySchema = Joi.object({
    pagina: Joi.number().integer().min(1).required(),
    limite: Joi.number().integer().min(1).max(100).required(),
    nombre: Joi.string().trim().min(1).max(80),
    disciplina: Joi.string().hex().length(24)
});
