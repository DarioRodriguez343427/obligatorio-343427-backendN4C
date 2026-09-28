import Joi from "joi";

const nombreSchema = Joi.string().trim().min(3).max(80);
const descripcionSchema = Joi.string().trim().min(3).max(500);
const disciplinaSchema = Joi.string().hex().length(24).label("disciplina");
const imagenSchema = Joi.string().trim().uri().allow("");

export const claseBodySchema = Joi.object({
    nombre: nombreSchema.required(),
    descripcion: descripcionSchema.required(),
    disciplina: disciplinaSchema.required(),
    imagen: imagenSchema
});

export const updateClaseBodySchema = Joi.object({
    nombre: nombreSchema,
    descripcion: descripcionSchema,
    disciplina: disciplinaSchema,
    imagen: imagenSchema
}).min(1);
