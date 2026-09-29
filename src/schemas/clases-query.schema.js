import Joi from "joi";

export const listarClasesQuerySchema = Joi.object({
    pagina: Joi.number().integer().min(1),
    limite: Joi.number().integer().min(1).max(100)
});
