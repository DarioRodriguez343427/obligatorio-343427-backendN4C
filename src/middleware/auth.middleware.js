import { loginBodySchema } from "../schemas/login-body.schema.js";
import { registerBodySchema } from "../schemas/register-body.schema.js";
import { validateRequest } from "./validate.middleware.js";
import { verifyAccessToken } from "../utils/token.util.js";
import { Role } from "../constants/role.constants.js";
import User from "../v1/models/user.model.js";
import { Estado } from "../constants/estado.constants.js";



export const middlewareValidateLoginBody = validateRequest(loginBodySchema, "body");
export const middlewareValidateRegisterBody = validateRequest(registerBodySchema, "body");



export const authMiddleware = async (req, res, next) => {
    let decoded;
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).
                json({ error: "No se recibio token" });
        }
        // 2. Saco el "Bearer " y me quedo solo con el token
        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({
                error: "Token no proporcionado"
            });
        }
        const token = authHeader.split(" ")[1];
        // 3. Verificar token
        decoded = verifyAccessToken(token);
    } catch (error) {
        return res.status(401).json({ error: "token invalido" });
    }

    try {
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Usuario no existe" });
        }
        if (user.role === Role.cliente && user.estado !== Estado.activo) {
            return res.status(403).json({ message: "El cliente está inactivo" });
        }
        req.user = { ...decoded, role: user.role };
        return next();
    } catch (error) {
        return next(error);
    }
}

export const clienteMiddleware = (req, res, next) => {
  if (req.user.role !== Role.cliente) {
    return res.status(403).json({
      message: "No tenés permisos para realizar esta acción"
    });
  }

  next();
};
