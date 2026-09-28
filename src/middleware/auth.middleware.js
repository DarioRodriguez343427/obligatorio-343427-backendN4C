import { loginBodySchema } from "../schemas/login-body.schema.js";
import { registerBodySchema } from "../schemas/register-body.schema.js";
import { validateRequest } from "./validate.middleware.js";
import { verifyAccessToken } from "../utils/token.util.js";
import { Role } from "../constants/role.constants.js";



export const middlewareValidateLoginBody = validateRequest(loginBodySchema, "body");
export const middlewareValidateRegisterBody = validateRequest(registerBodySchema, "body");



export const authMiddleware = (req, res, next) => {
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
        const decoded = verifyAccessToken(token);
        // 4. Guardar datos en request
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: "token invalido" });
    }
}

export const adminMiddleware = (req, res, next) => {
  if (req.user.role !== Role.admin) {
    return res.status(403).json({
      message: "No tenés permisos para realizar esta acción"
    });
  }

  next();
};
