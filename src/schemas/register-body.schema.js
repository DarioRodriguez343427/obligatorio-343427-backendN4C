import Joi from 'joi';

//esquema de validacion para body registro
export const registerBodySchema = Joi.object({
    name: Joi.string().trim().min(3).max(30).label("nombre").required(),
    username: Joi.string().trim().alphanum().min(3).max(30).required(),
    email: Joi.string().trim().lowercase().email().required(),
    password: Joi.string().min(3).max(30).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().message({"any.only": "Las contraseñas ingresadas no son iguales, verifique"})
});
