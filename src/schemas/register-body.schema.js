import Joi from 'joi';

//esquema de validacion para body registro
export const registerBodySchema = Joi.object({
    name: Joi.string().trim().min(3).max(30).label("nombre").required(),
    username: Joi.string().trim().alphanum().min(3).max(30).required(),
    email: Joi.string().trim().lowercase().email().required(),
    password: Joi.string().min(3).max(30).required(),
    image: Joi.string().max(2800000).pattern(/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/).optional(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({"any.only": "Las contraseñas ingresadas no son iguales, verifique"})
});
