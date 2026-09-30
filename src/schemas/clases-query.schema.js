import Joi from "joi";

export const listarClasesQuerySchema = Joi.object({
    pagina: Joi.number().integer().min(1),
    limite: Joi.number().integer().min(1).max(100),
    nombre: Joi.string().trim().min(1).max(80),
    disciplina: Joi.string().hex().length(24)
});
