import Joi from "joi";

const nombreSchema = Joi.string().trim().min(3).max(80);
const descripcionSchema = Joi.string().trim().min(3).max(500);
const disciplinaSchema = Joi.string().hex().length(24).label("disciplina").trim();

export const claseBodySchema = Joi.object({
    nombre: nombreSchema.required(),
    descripcion: descripcionSchema.required(),
    disciplina: disciplinaSchema.required()
});

export const updateClaseBodySchema = Joi.object({
    nombre: nombreSchema,
    descripcion: descripcionSchema,
    disciplina: disciplinaSchema
}).min(1);
